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
            if (method === HTTP_METHOD.PUT) {
                console.log(`Mocking update for condition: ${params.name}`);
                return {
                    name: params.name
                };
            }
            throw new Error('Method not mocked');
        }
    },
    {
        name: 'vcl-header',
        match: new RegExp(`^/service/${mockServiceId}/version/\\d+/header/`),
        handler: ({method, params}) => {
            if (method === HTTP_METHOD.PUT) {
                console.log(`Mocking update for header: ${params.name}`);
                return;
            }
            throw new Error('Method not mocked');
        }
    },
    {
        name: 'vcl-response-object',
        match: new RegExp(`^/service/${mockServiceId}/version/\\d+/response_object/`),
        handler: ({method, params}) => {
            if (method === HTTP_METHOD.PUT) {
                console.log(`Mocking update for response object: ${params.name}`);
                return;
            }
            throw new Error('Method not mocked');
        }
    },
    {
        name: 'vcl-vcl-custom',
        match: new RegExp(`^/service/${mockServiceId}/version/\\d+/vcl/(.*)$`),
        handler: ({match, method}) => {
            if (method === HTTP_METHOD.PUT) {
                console.log(`Mocking update for custom VCL: ${match[1]}`);
                return;
            }
            throw new Error('Method not mocked');
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
    // console.log('Simulating Fastly request:', {method, url, params});

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

    let res;
    let err;
    try {
        res = handler({method, url, params, match});
    } catch (e) {
        err = e;
    }
    callback(err, res);
};

module.exports = {
    fastlyMockRequest,
    mockServiceId
};
