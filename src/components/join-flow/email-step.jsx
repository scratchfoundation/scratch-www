const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');

const JoinFlowStep = require('./join-flow-step.jsx');

require('./join-flow-steps.scss');

class EmailStep extends React.Component {
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
                initialValues={{
                    birth_month: 'null',
                    birth_year: 'null'
                }}
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
                            description={this.props.intl.formatMessage({id: 'registration.emailStepDescription'})}
                            headerImgSrc="/images/hoc/getting-started.jpg"
                            title={this.props.intl.formatMessage({id: 'registration.emailStepTitle'})}
                            waiting={isSubmitting}
                            onSubmit={handleSubmit}
                        />
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
