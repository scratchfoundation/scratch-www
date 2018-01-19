const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./tooltip.scss');

const Tooltip = props => (
    <span
        className={classNames(
            'tooltip',
            props.className,
            {overmax: (props.currentCharacters > props.maxCharacters)}
        )}
    >
        <span className="tip">
            <img
                alt="info icon"
                src="/svgs/tooltip/info.svg"
            />
        </span>
        <span className="expand">
            {props.tipContent}
        </span>
    </span>
);

Tooltip.propTypes = {
    className: PropTypes.string,
    currentCharacters: PropTypes.number,
    maxCharacters: PropTypes.number,
    tipContent: PropTypes.node
};

Tooltip.defaultProps = {
    title: '',
    tipContent: ''
};

module.exports = Tooltip;
