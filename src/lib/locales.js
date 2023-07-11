/**
 * Scratch has some locales that are not recognized by Intl. Use an appropriate alternative for these locales.
 * @param {string} locale Scratch's locale
 * @returns {string} the locale to use in IntlProvider
 */
const scratchLocaleToIntlLocale = locale => {
    switch (locale) {
    case 'ab':
        return 'ru';
    case 'an':
    case 'rap':
        return 'es';
    case 'ht':
    case 'oc':
        return 'fr';
    default:
        return locale;
    }
};

/**
 * Gets the locale for the current window.
 * @returns {string} locale
 */
const getLocale = () => {
    // Get locale from global namespace (see "init.js")
    let locale = window._locale || 'en';
    if (typeof window._messages !== 'undefined') {
        if (typeof window._messages[locale] === 'undefined') {
            // Fall back on the split
            locale = locale.split('-')[0];
        }
        if (typeof window._messages[locale] === 'undefined') {
            // Language appears to not be supported – fall back to 'en'
            locale = 'en';
        }
    }
    return locale;
};

module.exports = {
    getLocale,
    scratchLocaleToIntlLocale
};
