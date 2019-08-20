const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
const {injectIntl, intlShape} = require('react-intl');

const JoinFlowStep = require('./join-flow-step.jsx');

require('./join-flow-steps.scss');

class RegistrationError extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
        ]);
    }
    render () {
        return (
            <JoinFlowStep
                description={this.props.intl.formatMessage({id: 'registration.countryStepDescription'})}
                headerImgSrc="/images/join-flow/country-header.png"
                innerClassName="join-flow-inner-country-step"
                title="Registration Error: translate this"
            />
        );
    }
}

RegistrationError.propTypes = {
    intl: intlShape
};

const IntlRegistrationError = injectIntl(RegistrationError);

module.exports = IntlRegistrationError;
