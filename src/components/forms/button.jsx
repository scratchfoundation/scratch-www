const classNames = require('classnames');
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

require('./button.scss');

const Button = props => {
    const classes = classNames('button', props.className, {'forms-close-button': props.isCloseType});

    return (
        <button
            className={classes}
            {...omit(props, ['className', 'children', 'isCloseType'])}
        >
            {
                props.isCloseType ? (
                    <img
                        alt="close-icon"
                        className="modal-content-close-img"
                        draggable="false"
                        src="/svgs/modal/close-x.svg"
                    />
                ) : [
                    props.children
                ]
            }
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isCloseType: PropTypes.bool
};

Button.defaultProps = {
    className: '',
    isCloseType: false
};

module.exports = Button;
