const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const {injectIntl, intlShape} = require('react-intl');

const JoinFlowStep = require('./join-flow-step.jsx');

require('./join-flow-steps.scss');

class RegistrationErrorStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSubmit'
        ]);
    }
    handleSubmit (e) {
        // JoinFlowStep includes a <form> that handles a submit action.
        // But here, we're not really submitting, so we need to prevent
        // the form from navigating away from the current page.
        e.preventDefault();
        this.props.onSubmit();
    }
    render () {
        return (
            <JoinFlowStep
                description={this.props.errorMsg}
                innerClassName="join-flow-registration-error"
                nextButton={this.props.canTryAgain ?
                    this.props.intl.formatMessage({id: 'general.tryAgain'}) :
                    this.props.intl.formatMessage({id: 'general.startOver'})
                }
                title={this.props.intl.formatMessage({id: 'registration.generalError'})}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

RegistrationErrorStep.propTypes = {
    canTryAgain: PropTypes.bool,
    errorMsg: PropTypes.string,
    intl: intlShape,
    onSubmit: PropTypes.func
};

const IntlRegistrationErrorStep = injectIntl(RegistrationErrorStep);

module.exports = IntlRegistrationErrorStep;
