const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./validation-message.scss');

const ValidationMessage = props => (
    <div
        className={classNames(
            'validation-message',
            {
                'validation-error': props.mode === 'error',
                'validation-info': props.mode === 'info'
            },
            props.className
        )}
    >
        {props.message}
    </div>
);

ValidationMessage.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    mode: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

module.exports = ValidationMessage;
