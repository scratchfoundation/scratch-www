const React = require('react');
const PropTypes = require('prop-types');
require('./thumbnail-remove-button.scss');

const ThumbnailRemoveButton = ({ onClick }) => (
    <button
        className="thumbnail-remove-button"
        onClick={onClick}
        title="Remove"
        aria-label="Remove"
    >
        ✕
    </button>
);


module.exports = ThumbnailRemoveButton;
