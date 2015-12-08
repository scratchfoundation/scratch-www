var jar = require('./lib/jar');
var log = require('./lib/log');
var translations = require('../locales/translations.json');

/**
 * -----------------------------------------------------------------------------
 * Session
 * -----------------------------------------------------------------------------
 */

(function () {
    window._session = {};

    /**
     * Binds the object to private session variable and dispatches a global
     * "session" event.
     *
     * @param  {object} Session object
     *
     * @return {void}
     */
    window.updateSession = function (session) {
        window._session = session;
        var sessionEvent = new CustomEvent('session', session);
        window.dispatchEvent(sessionEvent);
    };

    /**
     * Gets a session object from the local proxy method. Calls "updateSession"
     * once session has been returned from the proxy.
     *
     * @return {void}
     */
    window.refreshSession = function () {
        jar.get('scratchsessionsid', function (err, value) {
            if (err) return log.error('Error while fetching session cookie:', err);
            jar.unsign(value, function (err, contents) {
                if (err) return log.error('Error while unsigning session cookie:', err);
                try {
                    var sessionData = JSON.parse(contents);
                } catch (e) {
                    log.error('Could not deserialize session:', e);
                    sessionData = {};
                }
                window.updateSession(sessionData);
            });
        });
    };

    // Fetch session
    window.refreshSession();
})();

/**
 * -----------------------------------------------------------------------------
 * L10N
 * -----------------------------------------------------------------------------
 */
(function () {
    /**
     * Bind locale code from cookie if available. Uses navigator language API as a fallback.
     *
     * @return {string}
     */
    function updateLocale () {
        var obj = jar.get('scratchlanguage');
        if (typeof obj === 'undefined') {
            obj = window.navigator.userLanguage || window.navigator.language;
        }
        if (typeof translations[obj] === 'undefined') {
            // Fall back on the split
            obj = obj.split('-')[0];
        }
        if (typeof translations[obj] === 'undefined') {
            // Language appears to not be supported – return `null`
            obj = null;
        }
        return obj;
    }

    window._locale = updateLocale() || 'en';
    window._translations = translations;
})();
