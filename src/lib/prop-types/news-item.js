const PropTypes = require('prop-types');

const newsItem = PropTypes.shape({
    id: PropTypes.number,
    stamp: PropTypes.string, // date time string
    headline: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
    copy: PropTypes.string // text content
});

module.exports = newsItem;
