var api = require('./mixins/api.jsx').api;
var jar = require('./lib/jar');

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
        api({
            host: '',
            uri: '/session/'
        }, function (err, body) {
            if (err) return;

            if (typeof body !== 'undefined') {
                if (body.banned) {
                    return window.location = body.redirectUrl;
                } else {
                    window.updateSession(body);
                }
            }
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
            if (['pt','pt-pt','PT','PT-PT'].indexOf(obj) !== -1) {
                obj = 'pt-br'; // default Portuguese users to Brazilian Portuguese due to our user base. Added in 2.2.5.
            }
        }
        return obj;
    }

    window._locale = updateLocale();
})();
