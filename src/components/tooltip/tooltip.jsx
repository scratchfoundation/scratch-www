const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./tooltip.scss');

const Tooltip = ({
    className,
    currentCharacters,
    maxCharacters,
    tipContent = ''
}) => (
    <span
        className={classNames(
            'tooltip',
            className,
            {overmax: currentCharacters > maxCharacters}
        )}
    >
        <span className="tip">
            <img
                alt="info icon"
                src="/svgs/tooltip/info.svg"
            />
        </span>
        <span className="expand">
            {tipContent}
        </span>
    </span>
);

Tooltip.propTypes = {
    className: PropTypes.string,
    currentCharacters: PropTypes.number,
    maxCharacters: PropTypes.number,
    tipContent: PropTypes.node
};

module.exports = Tooltip;
