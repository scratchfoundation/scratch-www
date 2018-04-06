const React = require('react'); // eslint-disable-line
const reactStringReplace = require('react-string-replace');

/**
 * Helper method that replaces @mentions and #hashtags in plain text
 * 
 * @param  {string}   text     string to convert
 * @return {string}            string with links for @mentions and #hashtags
 */
module.exports = text => {
    let replacedText;
    
    // Match @-mentions
    replacedText = reactStringReplace(text, /@(\w+)/g, (match, i) => (
        <a
            href={`/users/${match}`}
            key={match + i}
        >@{match}</a>
    ));
    
    // Match hashtags
    replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
        <a
            href={`/search/projects?q=${match}`}
            key={match + i}
        >#{match}</a>
    ));
    
    return replacedText;
};
