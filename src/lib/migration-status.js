const api = require('./api');
const log = require('./log');

const checkMigrationStatus = userId => new Promise(resolve => {
    if (!process.env.NGP_IDENTITY_API_URL) {
        log.warn('NGP_IDENTITY_API_URL is not set, skipping migration status check');
        return resolve(false);
    }

    // Strip trailing slash from NGP_IDENTITY_API_URL if present to avoid double slashes in the endpoint URL
    const base = process.env.NGP_IDENTITY_API_URL.replace(/\/+$/, '');
    const endpoint = new URL(`${base}/users/${userId}/migration-status`);
    api({
        host: endpoint.origin,
        uri: endpoint.pathname,
        method: 'get',
        // The responseType is `json` on success, but if the host is down it returns `text/html`.
        // Passing `json` causes an internal error in xhr when `text/html` is returned, that doesn't bubble up
        // which blocks users from continuing in CGP as expected.
        responseType: ''
    }, (err, body, response) => {
        if (err || response.statusCode !== 200) {
            log.error('NGP migration-status request failed:', err);
            return resolve(false);
        }
        try {
            body = JSON.parse(body);
        } catch (e) {
            log.error('Error parsing NGP migration-status response:', e);
            return resolve(false);
        }
        const shouldRedirect = body && body.ngpEnabled && body.forceRedirect;
        return resolve(!!shouldRedirect);
    });
});

module.exports = checkMigrationStatus;
