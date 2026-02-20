const React = require('react');
require('./thumbnail-remove-button.scss');
const PropTypes = require('prop-types');

const ThumbnailRemoveButton = ({onClick}) => (
    <button
        className="thumbnail-remove-button"
        onClick={onClick}
        title="Remove"
        aria-label="Remove"
    >
        ✕
    </button>
);

ThumbnailRemoveButton.propTypes = {
    onClick: PropTypes.func
};

module.exports = ThumbnailRemoveButton;
