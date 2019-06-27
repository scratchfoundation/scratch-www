/* eslint-disable react/no-multi-comp */
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');

const JoinFlowStep = require('./join-flow-step.jsx');

/*
 * Username step
 */
/* eslint-disable react/prefer-stateless-function, no-useless-constructor */
class UsernameStep extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    passwordConfirm: ''
                }}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <JoinFlowStep
                    description={this.props.intl.formatMessage({id: 'registration.usernameStepDescription'})}
                    title={this.props.intl.formatMessage({id: 'general.joinScratch'})}
                    waiting={this.props.waiting}
                />
            </Formik>
        );
    }
}
/* eslint-enable */

UsernameStep.propTypes = {
    intl: intlShape,
    waiting: PropTypes.bool
};

UsernameStep.defaultProps = {
    waiting: false
};

module.exports.UsernameStep = injectIntl(UsernameStep);
