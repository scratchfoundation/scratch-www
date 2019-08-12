const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./validation-message.scss');

const ValidationMessage = props => (
    <div
        className={classNames(
            'validation-message',
            {
                'validation-error': props.isError,
                'validation-ok': props.isOk
            },
            props.className
        )}
    >
        {props.message}
    </div>
);

ValidationMessage.propTypes = {
    className: PropTypes.string,
    isError: PropTypes.bool,
    isOk: PropTypes.bool,
    message: PropTypes.string
};

module.exports = ValidationMessage;
