const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const FormattedMessage = require('react-intl').FormattedMessage;
const {injectIntl, intlShape} = require('react-intl');

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
                            description={this.props.intl.formatMessage({
                                id: 'registration.welcomeStepDescriptionNonEducator'
                            })}
                            descriptionClassName="join-flow-welcome-description"
                            headerImgSrc="/images/join-flow/welcome-header.png"
                            innerClassName="join-flow-inner-welcome-step"
                            nextButton={this.props.createProjectOnComplete ? (
                                <React.Fragment>
                                    <FormattedMessage id="registration.makeProject" />
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
                            <div className="join-flow-instructions">
                                <FormattedMessage
                                    id="registration.welcomeStepInstructions"
                                    values={{
                                        email: this.props.email
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
    username: PropTypes.string
};

module.exports = injectIntl(WelcomeStep);
