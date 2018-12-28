const jar = require('./lib/jar');

/**
 * -----------------------------------------------------------------------------
 * L10N
 * -----------------------------------------------------------------------------
 */
(() => {
    /*
     * Bind locale code from cookie if available. Uses navigator language API as a fallback.
     *
     * @return {string}
     */
    const updateLocale = () => {
        let obj = jar.get('scratchlanguage');
        if (typeof obj === 'undefined') {
            obj = window.navigator.userLanguage || window.navigator.language;
            if (['pt', 'pt-pt', 'PT', 'PT-PT'].indexOf(obj) !== -1) {
                obj = 'pt-br'; // default Portuguese users to Brazilian Portuguese due to our user base. Added in 2.2.5.
            }
        }
        return obj;
    };

    window._locale = updateLocale();
    document.documentElement.lang = window._locale;
})();

/**
 * -----------------------------------------------------------------------------
 * Console warning
 * -----------------------------------------------------------------------------
 */
(() => {
    window.onload = function () {
        /* eslint-disable no-console */
        console.log('%cStop!', 'color: #F00; font-size: 30px; -webkit-text-stroke: 1px black; font-weight:bold');
        console.log(
            'This is part of your browser intended for developers. ' +
            'If someone told you to copy-and-paste something here, ' +
            'don\'t do it! It could allow them to take over your ' +
            'Scratch account, delete all of your projects, or do many ' +
            'other harmful things. If you don\'t understand what exactly ' +
            'you are doing here, you should close this window without doing ' +
            'anything.'
        );
        /* eslint-enable no-console */
    };
})();
