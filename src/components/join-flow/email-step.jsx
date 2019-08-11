const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');
const emailValidator = require('email-validator');

const JoinFlowStep = require('./join-flow-step.jsx');
const FormikInput = require('../../components/formik-forms/formik-input.jsx');

require('./join-flow-steps.scss');

class EmailStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleValidSubmit',
            'validateEmailIfPresent',
            'validateForm'
        ]);
    }
    validateEmailIfPresent (email) {
        if (!email) return null; // skip validation if email is blank; null indicates valid
        const isValidLocally = emailValidator.validate(email);
        if (isValidLocally) {
            return null; // TODO: validate email address remotely
        }
        return this.props.intl.formatMessage({id: 'registration.validationEmailInvalid'});
    }
    validateForm () {
        return {};
    }
    handleValidSubmit (formData, formikBag) {
        formikBag.setSubmitting(false);
        this.props.onNextStep(formData);
    }
    render () {
        return (
            <Formik
                initialValues={{
                }}
                validate={this.validateForm}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={this.handleValidSubmit}
            >
                {props => {
                    const {
                        errors,
                        handleSubmit,
                        isSubmitting,
                        validateField
                    } = props;
                    return (
                        <JoinFlowStep
                            description={this.props.intl.formatMessage({id: 'registration.emailStepDescription'})}
                            footerMessage={this.props.intl.formatMessage({id: 'registration.acceptTermsOfService'})}
                            headerImgSrc="/images/hoc/getting-started.jpg"
                            innerContentClassName="modal-inner-content-email"
                            nextButton={this.props.intl.formatMessage({id: 'registration.createAccount'})}
                            title={this.props.intl.formatMessage({id: 'registration.emailStepTitle'})}
                            waiting={isSubmitting}
                            onSubmit={handleSubmit}
                        >
                            <FormikInput
                                className={classNames(
                                    'join-flow-input',
                                    'join-flow-input-tall',
                                    {fail: errors.email}
                                )}
                                error={errors.email}
                                id="email"
                                name="email"
                                placeholder={this.props.intl.formatMessage({id: 'general.emailAddress'})}
                                validate={this.validateEmailIfPresent}
                                validationClassName="validation-full-width-input"
                                onBlur={() => validateField('email')} // eslint-disable-line react/jsx-no-bind
                            />
                        </JoinFlowStep>
                    );
                }}
            </Formik>
        );
    }
}

EmailStep.propTypes = {
    intl: intlShape,
    onNextStep: PropTypes.func
};


module.exports = injectIntl(EmailStep);
