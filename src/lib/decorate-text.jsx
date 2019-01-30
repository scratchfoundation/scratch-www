const React = require('react'); // eslint-disable-line
const reactStringReplace = require('react-string-replace');

/**
 * Helper method that replaces @mentions and #hashtags in plain text
 *
 * @param  {string} text string to convert
 * @param  {?object} opts options object of boolean flags, defaults to all true
 * @property {boolean} opts.hashtag If #hashtags should be converted to search links
 * @property {boolean} opts.usernames If @usernames should be converted to /users/username links
 * @property {boolean} opts.scratchLinks If scratch-domain links should be converted to <a> links
 * @return {Array} Array with strings and react components for links
 */
module.exports = (text, opts) => {
    opts = opts || {
        usernames: true,
        hashtags: true,
        scratchLinks: true
    };

    let replacedText = [text];

    // Match @-mentions (username is alphanumeric, underscore and dash)
    if (opts.usernames) {
        replacedText = reactStringReplace(replacedText, /@([\w-]+)/g, (match, i) => (
            <a
                href={`/users/${match}`}
                key={match + i}
            >@{match}</a>
        ));
    }

    // Match scratch links
    /*
        Ported from the python...
        "Oh boy a giant regex!" Said nobody ever.
        (^|\s)(https?://(?:[\w-]+\.)*scratch\.mit\.edu(?:/(?:\S*[\w:/#[\]@\$&\'()*+=])?)?(?![^?!,:;\w\s]\S))
        (^|\s)
            Only begin capturing after a space, or at the beginning of a word
        https?
            URLs beginning with http or https
        ://(?:[\w-]+\.)*scratch\.mit\.edu
            allow *.scratch.mit.edu urls
        (?:/...)?
            optionally followed by a slash
        (?:\S*[\w:/#[\]@\$&\'()*+=])?
            optionally that slash is followed by anything that's not a space, until
            that string is followed by URL-valid characters that aren't punctuation
        (?![^?!,:;\w\s]\S))
            Don't capture if this string is embedded in another string (e.g., the
            beginning of a non-scratch URL), but allow punctuation
    */
    if (opts.scratchLinks) {
        // eslint-disable-next-line max-len
        const linkRegexp = /((?:^|\s)https?:\/\/(?:[\w-]+\.)*(?:scratch\.mit\.edu|scratch-wiki\.info)(?:\/(?:\S*[\w:/#[\]@$&'()*+=])?)?(?![^?!,:;\w\s]\S))/g;
        replacedText = reactStringReplace(replacedText, linkRegexp, (match, i) => (
            <a
                href={match}
                key={match + i}
            >{match}</a>
        ));
    }

    // Match hashtags
    if (opts.hashtags) {
        replacedText = reactStringReplace(replacedText, /#([\w-]+)/g, (match, i) => (
            <a
                href={`/search/projects?q=${match}`}
                key={match + i}
            >#{match}</a>
        ));
    }

    return replacedText;
};
