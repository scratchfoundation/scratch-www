const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');
const emailValidator = require('email-validator');
const FormattedMessage = require('react-intl').FormattedMessage;

const JoinFlowStep = require('./join-flow-step.jsx');
const FormikInput = require('../../components/formik-forms/formik-input.jsx');

require('./join-flow-steps.scss');

class EmailStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleValidSubmit',
            'validateEmail',
            'validateForm'
        ]);
    }
    validateEmail (email) {
        if (!email) return this.props.intl.formatMessage({id: 'general.required'});
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
                        setFieldError,
                        validateField
                    } = props;
                    return (
                        <JoinFlowStep
                            description={this.props.intl.formatMessage({id: 'registration.emailStepDescription'})}
                            footerContent={(
                                <FormattedMessage
                                    id="registration.acceptTermsOfUse"
                                    values={{
                                        touLink: (
                                            <a
                                                className="join-flow-link"
                                                href="/terms_of_use"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="general.termsOfUse" />
                                            </a>
                                        )
                                    }}
                                />
                            )}
                            headerImgSrc="/images/hoc/getting-started.jpg"
                            innerClassName="join-flow-inner-email-step"
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
                                validate={this.validateEmail}
                                validationClassName="validation-full-width-input"
                                /* eslint-disable react/jsx-no-bind */
                                onBlur={() => validateField('email')}
                                onFocus={() => setFieldError('email', null)}
                                /* eslint-enable react/jsx-no-bind */
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
