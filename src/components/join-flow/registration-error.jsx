const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const {injectIntl, intlShape} = require('react-intl');

const JoinFlowStep = require('./join-flow-step.jsx');

require('./join-flow-steps.scss');

class RegistrationError extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSubmit'
        ]);
        this.state = {
        };
    }
    handleSubmit (e) {
        e.preventDefault(); // prevent page reload
        this.props.onTryAgain();
    }
    render () {
        return (
            <JoinFlowStep
                description={this.props.errorMsg}
                innerClassName="join-flow-registration-error"
                nextButton={this.props.intl.formatMessage({id: 'general.tryAgain'})}
                title={this.props.intl.formatMessage({id: 'registration.generalError'})}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

RegistrationError.propTypes = {
    errorMsg: PropTypes.string,
    intl: intlShape,
    onTryAgain: PropTypes.func
};

const IntlRegistrationError = injectIntl(RegistrationError);

module.exports = IntlRegistrationError;
