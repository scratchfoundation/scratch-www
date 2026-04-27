const api = require('../lib/api');

const checkMigrationStatus = userId => new Promise(resolve => {
    api({
        host: process.env.NGP_HOST,
        uri: `/users/${userId}/migration-status`,
        method: 'get'
    }, (err, body) => {
        if (err) {
            console.warn('NGP migration-status request failed for user:', {userId});
            return resolve(false);
        }
        const shouldRedirect = body && body.ngpEnabled && body.forceRedirect;
        return resolve(!!shouldRedirect);
    });
});

module.exports = checkMigrationStatus;
