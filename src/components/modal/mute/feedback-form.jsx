const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');

import {Formik} from 'formik';
const FormikInput = require('../../../components/formik-forms/formik-input.jsx');
const bindAll = require('lodash.bindall');


require('./modal.scss');

class FeedbackForm extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSetFeedbackRef',
            'handleValidSubmit',
            'validateFeedback',
            'validateForm'
        ]);
    }

    // called after feedback validation passes with no errors
    handleValidSubmit (formData, formikBag) {
        formikBag.setSubmitting(false); // formik makes us do this ourselves
        this.props.onSubmit(formData.feedback);
    }

    handleSetFeedbackRef (feedbackInputRef) {
        this.feedbackInput = feedbackInputRef;
    }

    validateFeedback (feedback) {
        if (feedback.length <= this.props.minLength) {
            return this.props.emptyError;
        }
        return null;
    }

    validateForm (values) {
        return this.validateFeedback(values.feedback);
    }

    render () {
        return (
            <Formik
                initialValues={{
                    feedback: ''
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
                        setFieldError,
                        setFieldTouched,
                        setFieldValue
                    } = props;
                    return (
                        <form
                            id="feedback-form"
                            onSubmit={handleSubmit}
                        >
                            <FormikInput
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                className={classNames(
                                    'compose-feedback',
                                )}
                                component="textarea"
                                error={errors.feedback}
                                id="feedback"
                                maxLength={this.props.maxLength}
                                name="feedback"
                                rows={5}
                                type="text"
                                validate={this.validateFeedback}
                                validationClassName="validation-full-width-input"
                                /* eslint-disable react/jsx-no-bind */
                                // onBlur={() => validateField('feedback')}
                                onChange={e => {
                                    setFieldValue('feedback', e.target.value);
                                    setFieldTouched('feedback');
                                    setFieldError('feedback', null);
                                }}
                                /* eslint-enable react/jsx-no-bind */
                                onSetRef={this.handleSetFeedbackRef}
                            />
                        </form>
                    );
                }}
            </Formik>
        );
    }
    
}

FeedbackForm.propTypes = {
    emptyError: PropTypes.string,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    onSubmit: PropTypes.string.isRequired
};

FeedbackForm.defaultProps = {
    minLength: 0
};

module.exports = FeedbackForm;
