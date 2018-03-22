const React = require('react'); // eslint-disable-line
const reactStringReplace = require('react-string-replace');

/**
 * Helper method that replaces @mentions and #hashtags in plain text
 * 
 * @param  {string}   text     optional xhr args (see above)
 * @return {string} 
 */
module.exports = text => {
    let replacedText;
    
    // Match @-mentions
    replacedText = reactStringReplace(text, /@(\w+)/g, (match, i) => (
      <a key={match + i} href={`/users/${match}`}>@{match}</a>
    ));
    
    // Match hashtags
    replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
      <a key={match + i} href={`/search/projects?q=${match}`}>#{match}</a>
    ));
    
    return replacedText;
};
