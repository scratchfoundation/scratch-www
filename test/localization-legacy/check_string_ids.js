/**
 * Tests whether any page in www has any languages which are missing string IDs
 * - checks every language against the list of english IDs for that page
 * - test fails if the length of the list of languages missing any IDs is not 0
 * - if the test fails, you can see which pages/ languages/ IDs are causing the failure:
 *   - Object.keys(pagesWithLanguagesMissingIds) gives you a list
 *     of the pages which had languages with missing IDs
 *   - pagesWithLanguagesMissingIds['pageName.intl.js'] gives you an object
 *     with languages as keys and the missing IDs as values
 */

const path = require('path');
const fs = require('fs');
const tap = require('tap');

/**
 * To get the files (containing message IDs and localized strings for each page in www)
 * from the intl directory
 */
const intlDirPath = path.resolve(__dirname, '../../intl/');
const intlFiles = fs.readdirSync(intlDirPath);

/*
 * Tells tap whether the test should pass or fail for a given file.
 * @param {string} fileName
 * @param {Object} missingMessageId
 * @param {Object} pagesMissingIds
 */
const noMissingStrings = (fileName, missingMessageId, pagesMissingIds) => {
    if (Object.keys(missingMessageId).length === 0) {
        tap.pass();
    } else {
        tap.fail(`${fileName} is missing string IDs`);
        pagesMissingIds[fileName] = [];
        pagesMissingIds[fileName].push(missingMessageId);
    }
};

const pagesWithLanguagesMissingIds = {};

for (const i in intlFiles) {
    const file = intlFiles[i];
    const filePath = path.resolve(__dirname, `../../intl/${file}`);
    const pageMessagesString = fs.readFileSync(filePath, 'utf8');

    /**
     * To make the string of the file of the page.intl.js back into useable objects
     */
    const window = {};
    const pageMessages = eval(pageMessagesString); // eslint-disable-line no-eval

    /**
     * The goal is to compare the IDs for each language to the IDs for English,
     * so we need the list of IDs for the given page in English
     */
    const englishIdList = window._messages.en;

    const messageIdNotInLanguage = {};

    for (const languageKey in pageMessages) {
        const currentLanguageObject = pageMessages[languageKey];
        for (const messageId in englishIdList) {
            if (!(messageId in currentLanguageObject)) {
                if (typeof messageIdNotInLanguage[languageKey] === 'undefined') {
                    messageIdNotInLanguage[languageKey] = [];
                }
                messageIdNotInLanguage[languageKey].push(messageId);
            }
        }
    }
    noMissingStrings(file, messageIdNotInLanguage, pagesWithLanguagesMissingIds);
}
