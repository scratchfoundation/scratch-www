// This list has to be updated when a new Scratch Wiki is made.
// Note that wikis under testwiki are not included.
const wwwLocaleToScratchWikiLocale = {
    en: 'en',
    ja: 'ja',
    fr: 'fr',
    de: 'de',
    ru: 'ru',
    hu: 'hu',
    nl: 'nl',
    id: 'id'
};

const getScratchWikiLink = locale => {
    if (!Object.prototype.hasOwnProperty.call(wwwLocaleToScratchWikiLocale, locale)) {
        locale = locale.split('-')[0];
        if (!Object.prototype.hasOwnProperty.call(wwwLocaleToScratchWikiLocale, locale)) {
            locale = 'en';
        }
    }
    return `https://${wwwLocaleToScratchWikiLocale[locale]}.scratch-wiki.info/`;
};

module.exports = getScratchWikiLink;
