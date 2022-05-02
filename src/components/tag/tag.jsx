const PropTypes = require('prop-types');
const React = require('react');

require('./tag.scss');

const Tag = props => (
    <div className={`${props.type} ${props.color} bubble`}>
        <span>{props.text}</span>
    </div>
);

Tag.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string
};

module.exports = Tag;
