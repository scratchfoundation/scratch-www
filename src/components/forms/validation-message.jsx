const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./validation-message.scss');

const ValidationMessage = props => (
    <div className={classNames(['validation-message', props.className])}>
        {props.message}
    </div>
);

ValidationMessage.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string
};

module.exports = ValidationMessage;
