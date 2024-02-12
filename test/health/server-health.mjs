/* eslint-disable no-console */

// this basic server health check is meant to be run before integration tests
// it should be run with the same environment variables as the integration tests
// and operate in the same way as the integration tests

import {fetch} from 'cross-fetch';

// Every valid PNG starts with this header
// Note that the very first byte is 0x89, but JS transforms that to U+FFFD
const PNG_HEADER = '\uFFFDPNG\r\n\u001A\n';

const CAT_A = 'f88bf1935daea28f8ca098462a31dbb0.svg';

const DELAY_INCREMENT = 5000;
const MAX_ATTEMPTS = 10;

const rootUrl = process.env.ROOT_URL || (() => {
    const ROOT_URL_DEFAULT = 'https://scratch.mit.edu';
    console.warn(`ROOT_URL not set, defaulting to ${ROOT_URL_DEFAULT}`);
    return ROOT_URL_DEFAULT;
})();

const fallbackUrl = process.env.FALLBACK || (() => {
    const FALLBACK_DEFAULT = rootUrl;
    console.warn(`FALLBACK not set, defaulting to ${FALLBACK_DEFAULT}`);
    return FALLBACK_DEFAULT;
})();

const staticUrl = process.env.STATIC_HOST || (() => {
    const STATIC_HOST_DEFAULT = rootUrl;
    console.warn(`STATIC_HOST not set, defaulting to ${STATIC_HOST_DEFAULT}`);
    return STATIC_HOST_DEFAULT;
})();

const backpackUrl = process.env.BACKPACK_HOST || (() => {
    const BACKPACK_HOST_DEFAULT = 'https://backpack.scratch.mit.edu';
    console.warn(`BACKPACK_HOST not set, defaulting to ${BACKPACK_HOST_DEFAULT}`);
    return BACKPACK_HOST_DEFAULT;
})();

const assetUrl = process.env.ASSET_HOST || (() => {
    const ASSET_HOST_DEFAULT = 'https://assets.scratch.mit.edu';
    console.warn(`ASSET_HOST not set, defaulting to ${ASSET_HOST_DEFAULT}`);
    return ASSET_HOST_DEFAULT;
})();

// TODO: uncomment this when we figure out how to test PROJECT_HOST (see below)
// const projectUrl = process.env.PROJECT_HOST || (() => {
//     const PROJECT_HOST_DEFAULT = 'https://projects.scratch.mit.edu';
//     console.warn(`PROJECT_HOST not set, defaulting to ${PROJECT_HOST_DEFAULT}`);
//     return PROJECT_HOST_DEFAULT;
// })();

const apiUrl = process.env.API_HOST || (() => {
    const API_HOST_DEFAULT = 'https://api.scratch.mit.edu';
    console.warn(`API_HOST not set, defaulting to ${API_HOST_DEFAULT}`);
    return API_HOST_DEFAULT;
})();

// TODO: uncomment this once we can test cloud health in staging
// // Unlike the other services, CLOUDDATA_HOST is just a hostname, not a full URL...
// const cloudDataHost = process.env.CLOUDDATA_HOST || (() => {
//     const CLOUDDATA_HOST_DEFAULT = 'clouddata.scratch.mit.edu';
//     console.warn(`CLOUDDATA_HOST not set, defaulting to ${CLOUDDATA_HOST_DEFAULT}`);
//     return CLOUDDATA_HOST_DEFAULT;
// })();

// // ...so we need to construct the full URL ourselves.
// // Note that the cloud var service uses WSS, but we need HTTPS for the health check.
// const cloudDataUrl = new URL(`https://${cloudDataHost}`);

/**
 * Sleep for the given number of milliseconds.
 * @param {number} ms Number of milliseconds to sleep for.
 * @returns {Promise} A promise that resolves after the given number of milliseconds.
 */
const sleepMs = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Try a function several times, with a delay between each attempt.
 * @param {Function} fn Try this function several times. If it throws, try again until the limit is reached.
 * @returns {Promise} A promise that resolves to the return value of the function.
 * @throws {Error} If the function throws an error after the maximum number of attempts.
 */
const trySeveralTimes = async fn => {
    let attempts = 0;
    let lastError;
    while (attempts < MAX_ATTEMPTS) {
        if (attempts > 0) {
            const delay = attempts * DELAY_INCREMENT;
            console.warn(`Retrying after error: ${lastError}`);
            console.warn(`Waiting ${delay}ms before retrying...`);
            await sleepMs(delay);
        }
        try {
            const result = await fn();
            // console.log('trySeveralTimes result', result);
            return result;
        } catch (e) {
            lastError = e;
            attempts++;
        }
    }
    throw lastError;
};

/**
 * Check if a resource is reachable, retrying several times if it is not.
 * If the resource is not reachable after several retries, throw an error.
 * @param {string|URL|Request} resource The resource to fetch.
 * @param {string} name A name for the resource, for logging purposes.
 */
const checkReachable = async (resource, name) => {
    await trySeveralTimes(async () => {
        const result = await fetch(resource);
        if (!result.ok) {
            throw new Error(`${name} failed with status ${result.status}`);
        }
    });
    console.log(`${name} is reachable`);
};

/**
 * @callback TextCheck
 * @param {string} body The body text of the response.
 * @returns {boolean|Promise<boolean>} Whether the body is healthy.
 */

/**
 * Attempt to fetch a resource and verify correctness of the response body.
 * If the fetch response is OK, check the response body with the given function.
 * If fetching fails or the body check fails, retry several times.
 * If enough retries fail, throw the most recent error.
 * @param {string|URL|Request} resource The resource to fetch.
 * @param {string} name A name for the resource, for logging purposes.
 * @param {TextCheck} check A function to check the body text of the response.
 */
const checkBody = async (resource, name, check) => {
    await trySeveralTimes(async () => {
        const result = await fetch(resource);
        if (!result.ok) {
            throw new Error(`${name} failed with status ${result.status}`);
        }
        const body = await result.text();
        if (!await check(body)) {
            throw new Error(`${name} failed with unexpected body`);
        }
    });
    console.log(`${name} is healthy`);
};

/**
 * Run the health check: check reachability or health for each service used by the integration tests. One or two
 * services are tested on their own initially, then the rest of the services are tested together asynchronously.
 * @returns {Promise} A promise that resolves when the health check is complete.
 */
const runHealthCheck = async () => {
    // STAGING_HOST is only set in the staging environment, so it's not worth warning about in other environments
    if (process.env.STAGING_HOST) {
        await checkReachable(process.env.STAGING_HOST, 'STAGING_HOST');
    }
    await checkReachable(rootUrl, 'ROOT_URL'); // scratch-www
    await Promise.all([
        // backpack
        checkBody(
            backpackUrl,
            'BACKPACK_HOST',
            body => JSON.parse(body).ok === String.fromCodePoint(0x1F47B)
        ),

        // assets
        // TODO: check `${assetUrl}/health` when it's available
        checkBody(
            new URL(CAT_A, assetUrl),
            'ASSET_HOST',
            body => {
                const svgOpen = body.indexOf('<svg');
                const svgClose = body.indexOf('</svg>');
                return svgOpen >= 0 &&
                    svgOpen < 128 &&
                    svgClose > svgOpen;
            }
        ),

        // projects
        // TODO: check `${projectUrl}/health` when it's available
        // check???(projectUrl, 'PROJECT_HOST'),

        // static
        checkBody(
            new URL('/get_image/user/default_32x32.png', staticUrl),
            'STATIC_HOST',
            body => body.indexOf(PNG_HEADER) === 0
        ),

        // TODO: uncomment this once we can test cloud health in staging
        // // cloud data / cloud variables
        // checkBody(
        //     (() => {
        //         const foo = new URL('/health', cloudDataUrl);
        //         console.log('foo', foo);
        //         return foo;
        //     })(),
        //     'CLOUDDATA_HOST',
        //     body => JSON.parse(body).uptime > 0
        // ),

        // API
        checkBody(
            new URL('/health', apiUrl),
            'API_HOST',
            body => JSON.parse(body).version.length > 0
        ),

        // API fallback
        checkReachable(fallbackUrl, 'FALLBACK')
    ]);
};

runHealthCheck().then(
    () => console.log('Health check complete'),
    e => {
        console.error('Health check failed', e);
        process.exit(1);
    }
);
