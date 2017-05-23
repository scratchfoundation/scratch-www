var path = require('path');
var fs = require('fs');
var tap = require('tap');

/**
 * To get the files (containing message IDs and localized strings for each page in www)
 * from the intl directory
 */
var intlDirPath = path.resolve(__dirname, '../../intl/');
var intlFiles = fs.readdirSync(intlDirPath);

function noMissingStrings (file, messageIdNotInLanguage, pagesWithLanguagesMissingIds) {
    if (Object.keys(messageIdNotInLanguage).length == 0) {
        tap.pass();
    }
    else {
        tap.fail(file + ' is missing string IDs');
        pagesWithLanguagesMissingIds[file] = [];
        pagesWithLanguagesMissingIds[file].push(messageIdNotInLanguage);
    }
    return pagesWithLanguagesMissingIds;
}

var pagesWithLanguagesMissingIds = {};

for (var i in intlFiles) {
    var file = intlFiles[i];
    var filePath = path.resolve(__dirname, '../../intl/' + file);
    var pageMessagesString = fs.readFileSync(filePath,'utf8');

    /**
     * To make the string of the file of the page.intl.js back into useable objects
     */
    var window = {};
    var pageMessages = eval(pageMessagesString);

    /**
     * The goal is to compare the IDs for each language to the IDs for English,
     * so we need the list of IDs for the given page in English
     */
    var englishIdList = window._messages.en;

    var messageIdNotInLanguage = {};

    for (var languageKey in pageMessages) {
        var currentLanguageObject = pageMessages[languageKey];
        for (var messageId in englishIdList) {
            if (! (messageId in currentLanguageObject)) {
                if (typeof messageIdNotInLanguage[languageKey] == 'undefined') {
                    messageIdNotInLanguage[languageKey] = [];
                }
                messageIdNotInLanguage[languageKey].push(messageId);
            }
        }
    }
    pagesWithLanguagesMissingIds = noMissingStrings(file, messageIdNotInLanguage, pagesWithLanguagesMissingIds);
}
