const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const {Formik} = require('formik');
const FormattedMessage = require('react-intl').FormattedMessage;
const {injectIntl} = require('react-intl');

const intlShape = require('../../lib/intl-shape');
const JoinFlowStep = require('./join-flow-step.jsx');

require('./join-flow-steps.scss');

class WelcomeStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleValidSubmit',
            'validateForm'
        ]);
    }
    componentDidMount () {
        if (this.props.sendAnalytics) {
            this.props.sendAnalytics('join-welcome');
        }
    }

    validateForm () {
        return {};
    }
    handleValidSubmit (formData, formikBag) {
        formikBag.setSubmitting(false);
        this.props.onNextStep(formData);
    }
    getStepMessageIds (underConsentAge, requiresExternalVerification) {
        if (!underConsentAge) {
            return {
                descriptionId: 'registration.welcomeStepDescriptionNonEducator',
                instructionsId: 'registration.welcomeStepInstructions'
            };
        }

        if (requiresExternalVerification) {
            return {
                descriptionId: 'registration.welcomeStepDescriptionNonEducatorAwaitingConsent',
                instructionsId: 'registration.welcomeStepInstructionsStrict'
            };
        }

        return {
            descriptionId: 'registration.welcomeStepDescriptionNonEducator',
            instructionsId: 'registration.welcomeStepInstructionsLenient'
        };
    }
    render () {
        const {
            descriptionId,
            instructionsId
        } = this.getStepMessageIds(this.props.underConsentAge, this.props.requiresExternalVerification);
        
        return (
            <Formik
                initialValues={{}}
                validate={this.validateForm}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={this.handleValidSubmit}
            >
                {props => {
                    const {
                        handleSubmit,
                        isSubmitting
                    } = props;
                    return (
                        <JoinFlowStep
                            headerImgClass="welcome-step-image"
                            headerImgSrc="/images/join-flow/welcome-header.png"
                            innerClassName="join-flow-inner-welcome-step"
                            nextButton={this.props.createProjectOnComplete ? (
                                <React.Fragment>
                                    <FormattedMessage id="registration.reviewGuidelines" />
                                    <img
                                        className="join-flow-next-button-arrow"
                                        src="/svgs/project/r-arrow.svg"
                                    />
                                </React.Fragment>
                            ) : (
                                <FormattedMessage id="general.done" />
                            )}
                            title={`${this.props.intl.formatMessage(
                                {id: 'registration.welcomeStepTitleNonEducator'},
                                {username: this.props.username}
                            )}`}
                            titleClassName="join-flow-welcome-title"
                            waiting={isSubmitting}
                            onSubmit={handleSubmit}
                        >
                            <div className="join-flow-welcome-instructions">
                                <FormattedMessage
                                    id={descriptionId}
                                />
                            </div>
                            <div className="join-flow-welcome-instructions">
                                <FormattedMessage
                                    id={instructionsId}
                                    values={{
                                        email: this.props.email,
                                        p: chunks => (
                                            <span className="join-flow-info-paragraph">{chunks}</span>
                                        )
                                    }}
                                />
                            </div>
                        </JoinFlowStep>
                    );
                }}
            </Formik>
        );
    }
}

WelcomeStep.propTypes = {
    createProjectOnComplete: PropTypes.bool,
    email: PropTypes.string,
    intl: intlShape,
    onNextStep: PropTypes.func,
    sendAnalytics: PropTypes.func,
    username: PropTypes.string,
    underConsentAge: PropTypes.bool,
    requiresExternalVerification: PropTypes.bool
};

module.exports = injectIntl(WelcomeStep);
