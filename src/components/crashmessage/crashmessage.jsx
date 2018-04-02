const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const Button = require('../forms/button.jsx');

require('./crashmessage.scss');

const CrashMessage = props => (
    <div className={classNames(['crash-container', props.className])}>
        <img
            className=""
            src="/images/unhandled.png"
        />
        <div className="crash-message">
            <h2>
                <FormattedMessage id="general.error" />
            </h2>
            <p>
                <FormattedMessage id="general.unhandledError" />
            </p>
            <Button
                className=""
                onClick={props.onBack}
            >
                <FormattedMessage id="general.back" />
            </Button>
        </div>
    </div>
);

CrashMessage.propTypes = {
    className: PropTypes.string,
    onBack: PropTypes.func
};

module.exports = CrashMessage;
