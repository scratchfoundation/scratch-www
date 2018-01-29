const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./charcount.scss');

const CharCount = props => (
    <p
        className={classNames('char-count', props.className, {
            overmax: (props.currentCharacters > props.maxCharacters)
        })}
    >
        {props.currentCharacters}/{props.maxCharacters}
    </p>
);

CharCount.propTypes = {
    className: PropTypes.string,
    currentCharacters: PropTypes.number,
    maxCharacters: PropTypes.number
};

CharCount.defaultProps = {
    currentCharacters: 0,
    maxCharacters: 0
};

module.exports = CharCount;
