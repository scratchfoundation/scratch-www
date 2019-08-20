const React = require('react');
const PropTypes = require('prop-types');
const {injectIntl, intlShape} = require('react-intl');

const JoinFlowStep = require('./join-flow-step.jsx');

require('./join-flow-steps.scss');

const RegistrationError = ({
    errorMsg,
    intl,
    onTryAgain
}) => (
    <form onSubmit={onTryAgain}>
        <JoinFlowStep
            description={errorMsg}
            innerClassName="join-flow-registration-error"
            nextButton={intl.formatMessage({id: 'general.tryAgain'})}
            title={intl.formatMessage({id: 'registration.generalError'})}
        />
    />
);

RegistrationError.propTypes = {
    errorMsg: PropTypes.string,
    intl: intlShape,
    onTryAgain: PropTypes.func
};

const IntlRegistrationError = injectIntl(RegistrationError);

module.exports = IntlRegistrationError;
