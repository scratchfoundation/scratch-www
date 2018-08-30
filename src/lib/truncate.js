const lodashTruncate = require('lodash.truncate');

/*
* Function that applies regex for word boundaries, replaces removed string
* with indication of ellipsis (...)
*/
module.exports.truncateAtWordBoundary = (str, length) => (
    lodashTruncate(str, {length: length, separator: /[.,:;]*\s+/})
);
