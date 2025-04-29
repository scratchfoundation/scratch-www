const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./button.scss');

const Button = ({
    children,
    className = '',
    isCloseType = false,
    ...restProps
}) => {
    const classes = classNames('button', className, {'forms-close-button': isCloseType});

    return (
        <button
            className={classes}
            {...restProps}
        >
            {isCloseType ? (
                <img
                    alt="close-icon"
                    className="modal-content-close-img"
                    draggable="false"
                    src="/svgs/modal/close-x.svg"
                />
            ) : (
                children
            )}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isCloseType: PropTypes.bool
};

module.exports = Button;
