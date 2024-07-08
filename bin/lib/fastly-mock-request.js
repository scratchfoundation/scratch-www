const fs = require('fs');
const path = require('path');
const util = require('util');

const mockServiceId = 'MOCK';

const HTTP_METHOD = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};

/**
 * @typedef {Object} FastlyMockRequestSpec
 * @property {string} name Name of the request, for logging purposes
 * @property {RegExp} match Regular expression to match the URL
 * @property {FastlyMockRequestHandler} handler Function to generate the simulated response
 */

/**
 * @callback FastlyMockRequestHandler
 * @param {FastlyRequestOptions} options
 * @returns {any} Response body
 * @throws {Error} Error on failure
 */

/**
 * @typedef {Object} FastlyRequestOptions
 * @property {string} method HTTP method
 * @property {string} url URL
 * @property {object} params Request parameters
 * @property {RegExpMatchArray} match Results from the URL match
 */

/**
 * Directory to persist Fastly data to
 * @type {string}
 * @private
 */
let persistDir = null;

/**
 * State of the mocked Fastly API.
 */
const fastlyMockState = {
    conditions: {},
    headers: {},
    responseObjects: {},
    vcl: {}
};

/**
 * @returns {string} A timestamp in a format suitable for logging
 */
const makeLogTimestamp = () =>
    new Date()
        .toLocaleString('sv'); // cheat: Swedish locale uses ISO 8601 format

/**
 * When util.inspect sorts object keys, it calls its comparison function with strings.
 * The strings represent object keys, like 'name: "value"'.
 * When we're trying to sort conditions or headers, it'd be nice to sort them by priority.
 * In those cases, the comparison string will be like 'someName: {priority: 10}'.
 * Note that Fastly processes these items in order of increasing priority ("Lower numbers execute first").
 * This function extracts the priority from the comparison string.
 * @param {string} compareString The comparison string to parse, e.g. 'name: "value"'
 * @returns {number} The parsed priority, or undefined if no priority could be retrieved.
 */
const getPriority = compareString => {
    if (getPriority.memos.has(compareString)) {
        return getPriority.memos.get(compareString);
    }
    try {
        const obj = new Function(`return {${compareString}}`)();
        for (const v of Object.values(obj)) {
            if (typeof v.priority !== 'undefined') {
                const priority = Number(v.priority);
                getPriority.memos.set(compareString, priority);
                return priority;
            }
        }
    } catch (e) {
        // ignore
    }
};

getPriority.memos = new Map();

/**
 * Write the current state of the mocked Fastly API to disk
 */
const writeState = () => {
    if (persistDir) {
        const {vcl, ...rest} = fastlyMockState;
        const stateString = util.inspect(rest, {
            depth: Infinity,
            colors: false,
            maxArrayLength: Infinity,
            maxStringLength: Infinity,
            breakLength: 78,
            // compact: true,
            numericSeparator: true,
            sorted: (aString, bString) => {
                let aPriority = getPriority(aString);
                let bPriority = getPriority(bString);

                if (aPriority !== bPriority) {
                    // At least one of them specifies a priority, but maybe not both.
                    if (typeof aPriority === 'undefined') {
                        aPriority = 100; // Fastly default priority
                    }
                    if (typeof bPriority === 'undefined') {
                        bPriority = 100; // Fastly default priority
                    }
                    return aPriority - bPriority;
                }

                if (aString < bString) {
                    return -1;
                }
                if (aString > bString) {
                    return 1;
                }
                return 0;
            }
        });
        fs.writeFileSync(
            path.join(persistDir, 'fastly-mock-state.js'),
            `/* eslint-disable indent */\nmodule.exports = ${stateString};\n`
        );
        for (const [name, content] of Object.entries(vcl)) {
            fs.writeFileSync(
                path.join(persistDir, `fastly-mock-vcl-${name}.vcl`),
                content
            );
        }
    }
};

/**
 * Ordered list of mocked requests and their handlers.
 * These mocks are very minimal and should be extended as needed.
 * These will be matched in order, so more specific match expressions should come first.
 * The 'name' property is used for logging and hints at where to find API documentation.
 * TODO: Consider writing VCL content to disk or the console for debugging.
 * @see https://www.fastly.com/documentation/reference/api/
 * @type {FastlyMockRequestSpec[]}
 */
const mockedRequests = [
    {
        name: 'services-version',
        match: new RegExp(`^/service/${mockServiceId}/version$`),
        handler: ({method}) => {
            if (method === HTTP_METHOD.GET) {
                console.log('Returning mocked service versions');
                return [
                    {number: 998, active: false},
                    {number: 999, active: true},
                    {number: 1000, active: false}
                ];
            }
            throw new Error('Method not mocked');
        }
    },
    {
        name: 'services-version-activate',
        match: new RegExp(`^/service/${mockServiceId}/version/(\\d+)/activate$`),
        handler: ({match, method}) => {
            if (method === HTTP_METHOD.PUT) {
                console.log(`Mocking activation of service version ${match[1]}`);
                return {
                    number: match[1],
                    active: true
                };
            }
            throw new Error('Method not mocked');
        }
    },
    {
        name: 'services-version-clone',
        match: new RegExp(`^/service/${mockServiceId}/version/(\\d+)/clone$`),
        handler: ({match, method}) => {
            if (method === HTTP_METHOD.PUT) {
                console.log(`Mocking clone of service version ${match[1]}`);
                return {
                    number: 1001,
                    active: false
                };
            }
            throw new Error('Method not mocked');
        }
    },
    {
        name: 'purge-surrogate-key',
        match: new RegExp(`^/service/${mockServiceId}/purge/(.*)$`),
        handler: ({match, method}) => {
            if (method === HTTP_METHOD.POST) {
                console.log(`Mocking purge of surrogate key: ${match[1]}`);
                return;
            }
            throw new Error('Method not mocked');
        }
    },
    {
        name: 'vcl-condition',
        match: new RegExp(`^/service/${mockServiceId}/version/\\d+/condition/`),
        handler: ({method, params}) => {
            switch (method) {
            case HTTP_METHOD.POST:
                console.log(`Mocking creation of condition: ${params.name}`);
                break;
            case HTTP_METHOD.PUT:
                console.log(`Mocking update for condition: ${params.name}`);
                break;
            case HTTP_METHOD.GET:
            default:
                throw new Error('Method not mocked');
            }

            const {name: _, ...outputParams} = params;
            fastlyMockState.conditions[params.name] = outputParams;

            return {
                name: params.name
            };
        }
    },
    {
        name: 'vcl-header',
        match: new RegExp(`^/service/${mockServiceId}/version/\\d+/header/`),
        handler: ({method, params}) => {
            switch (method) {
            case HTTP_METHOD.POST:
                console.log(`Mocking creation of header: ${params.name}`);
                break;
            case HTTP_METHOD.PUT:
                console.log(`Mocking update for header: ${params.name}`);
                break;
            case HTTP_METHOD.GET:
            default:
                throw new Error('Method not mocked');
            }

            const {name: _, ...outputParams} = params;
            fastlyMockState.headers[params.name] = outputParams;

            // return {???};
        }
    },
    {
        name: 'vcl-response-object',
        match: new RegExp(`^/service/${mockServiceId}/version/\\d+/response_object/`),
        handler: ({method, params}) => {
            switch (method) {
            case HTTP_METHOD.POST:
                console.log(`Mocking creation of response object: ${params.name}`);
                break;
            case HTTP_METHOD.PUT:
                console.log(`Mocking update for response object: ${params.name}`);
                break;
            case HTTP_METHOD.GET:
            default:
                throw new Error('Method not mocked');
            }

            const {name: _, ...outputParams} = params;
            fastlyMockState.responseObjects[params.name] = outputParams;

            // return {???};
        }
    },
    {
        name: 'vcl-vcl-custom',
        match: new RegExp(`^/service/${mockServiceId}/version/\\d+/vcl/(.*)$`),
        handler: ({match, method, params}) => {
            const name = match[1];
            switch (method) {
            case HTTP_METHOD.POST:
                console.log(`Mocking creation of VCL: ${name}`);
                break;
            case HTTP_METHOD.PUT:
                console.log(`Mocking update for VCL: ${name}`);
                break;
            case HTTP_METHOD.GET:
            default:
                throw new Error('Method not mocked');
            }

            fastlyMockState.vcl[name] = params.content;

            // return {???};
        }
    }
];

/**
 * Simulate a Fastly API request
 * @param {string} method The HTTP method to use for the request
 * @param {string} url The URL to request
 * @param {Function} callback The (err, res) callback to execute with the results
 * @returns {void}
 */
/**
 * Simulate a Fastly API request
 * @param {string} method The HTTP method to use for the request
 * @param {string} url The URL to request
 * @param {Record<string, any>?} params Optional parameters (form data) to send with the request
 * @param {Function} callback The (err, res) callback to execute with the results
 * @returns {void}
 */
const fastlyMockRequest = (method, url, params, callback) => {
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }

    if (persistDir) {
        fs.writeFileSync(
            path.join(persistDir, 'fastly-mock-requests.log'),
            `${makeLogTimestamp()} ${method} ${url}\n`,
            {flag: 'a'}
        );
    }

    let handler;
    let match;
    for (const service of mockedRequests) {
        match = url.match(service.match);
        if (match) {
            // console.log(`Found handler for request: ${service.name}`);
            handler = service.handler;
            break;
        }
    }

    if (!handler || !match) {
        return callback(new Error(`No handler match for request: ${url}`));
    }

    try {
        const res = handler({method, url, params, match});
        callback(null, res);
    } catch (e) {
        callback(e);
    }
};

/**
 * Persist data from mocked Fastly requests to disk
 * @param {string} outputDir The directory to persist Fastly data to. Will be created if it does not exist.
 */
const fastlyMockPersist = outputDir => {
    console.log('Persisting Fastly data to:', outputDir);
    fs.mkdirSync(outputDir, {recursive: true});
    persistDir = outputDir;
    process.on('beforeExit', () => {
        writeState();
    });
};

// fastlyMockPersist('./fastlyMock');

module.exports = {
    fastlyMockPersist,
    fastlyMockRequest,
    mockServiceId
};
