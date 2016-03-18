var api = require('./mixins/api.jsx').api;
var jar = require('./lib/jar');


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
