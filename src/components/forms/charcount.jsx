const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./charcount.scss');

const CharCount = ({
    className = '',
    currentCharacters = 0,
    maxCharacters = 0
}) => (
    <p
        className={classNames('char-count', className, {
            overmax: (currentCharacters > maxCharacters)
        })}
    >
        {currentCharacters}/{maxCharacters}
    </p>
);

CharCount.propTypes = {
    className: PropTypes.string,
    currentCharacters: PropTypes.number,
    maxCharacters: PropTypes.number
};

module.exports = CharCount;
