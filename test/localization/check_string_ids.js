/*
* Tests whether any page in www has any languages which are missing string IDs
* - checks every language against the list of english IDs for that page
* - test fails if the length of the list of languages missing any IDs is not 0
* - if the test fails, you can see which pages/ languages/ IDs are causing the failure:
*   - Object.keys(pagesWithLanguagesMissingIds) gives you a list
*     of the pages which had languages with missing IDs
*   - pagesWithLanguagesMissingIds['pageName.intl.js'] gives you an object
*     with languages as keys and the missing IDs as values
*/

var path = require('path');
var fs = require('fs');
var tap = require('tap');

// to get the files (containing message IDs and localized strings for each page in www)
// from the intl directory
var intlDirPath = path.resolve(__dirname, '../../intl/');
var intlFiles = fs.readdirSync(intlDirPath);


var pagesWithLanguagesMissingIds = {};

for (var i in intlFiles) {
    var file = intlFiles[i];
    var filePath = path.resolve(__dirname, '../../intl/' + file);
    var pageMessagesString = fs.readFileSync(filePath,'utf8');

    // to make the string of the file of the page.intl.js back into useable objects
    var window = {};
    var pageMessages = eval(pageMessagesString);

    // goal is to compare the IDs for each language to the IDs for English,
    // so we need the list of IDs for the given page in English
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
    if (! (Object.keys(messageIdNotInLanguage).length == 0)) {
        pagesWithLanguagesMissingIds[file] = [];
        pagesWithLanguagesMissingIds[file].push(messageIdNotInLanguage);
    }
}

// this test fails if any page has any languages that are missing IDs
tap.test('noPageFilesShouldBeMissingStringIdsInAnyLanguage', function (t) {
    t.equal(Object.keys(pagesWithLanguagesMissingIds).length, 0);
    t.end();
});
