const api = require('./api');
const log = require('./log');

const checkMigrationStatus = userId => new Promise(resolve => {
    api({
        host: process.env.NGP_HOST,
        uri: `/users/${userId}/migration-status`,
        method: 'get'
    }, (err, body, response) => {
        if (err || response.statusCode !== 200) {
            log.warn('NGP migration-status request failed for user:', {userId});
            return resolve(false);
        }
        const shouldRedirect = body && body.ngpEnabled && body.forceRedirect;
        return resolve(!!shouldRedirect);
    });
});

module.exports = checkMigrationStatus;
