const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');

const FormikRadioButton = require('../../components/formik-forms/formik-radio-button.jsx');
const JoinFlowStep = require('./join-flow-step.jsx');

require('./join-flow-steps.scss');

class GenderStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleValidSubmit',
            'validateForm',
            'validateSelect'
        ]);
    }
    validateSelect (selection) {
        if (selection === 'null') {
            return this.props.intl.formatMessage({id: 'form.validationRequired'});
        }
        return null;
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
                    gender: 'null'
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
                        values
                    } = props;
                    return (
                        <JoinFlowStep
                            className="join-flow-gender-step"
                            description={this.props.intl.formatMessage({id: 'registration.genderStepDescription'})}
                            title={this.props.intl.formatMessage({id: 'registration.genderStepTitle'})}
                            waiting={isSubmitting}
                            onSubmit={handleSubmit}
                        >
                            <div
                                className={classNames(
                                    'col-sm-9',
                                    'row',
                                    'birthdate-select-row'
                                )}
                            >
                                {values.gender}
                                <FormikRadioButton
                                    buttonValue="he"
                                    className={classNames(
                                        'join-flow-radio',
                                        {fail: errors.birth_month}
                                    )}
                                    label="He/him"
                                    name="gender"
                                />
                                <FormikRadioButton
                                    buttonValue="she"
                                    className={classNames(
                                        'join-flow-radio',
                                        {fail: errors.birth_month}
                                    )}
                                    label="She/her"
                                    name="gender"
                                />
                                <FormikRadioButton
                                    buttonValue="other"
                                    className={classNames(
                                        'join-flow-radio',
                                        {fail: errors.birth_month}
                                    )}
                                    label="other"
                                    name="gender"
                                    type="other"
                                />
                                <FormikRadioButton
                                    buttonValue="Prefer not to say"
                                    className={classNames(
                                        'join-flow-radio',
                                        {fail: errors.birth_month}
                                    )}
                                    label="Prefer not to say"
                                    name="gender"
                                />
                                {/*
                                // <Field
                                //   component={RadioButton}
                                //   name="genderRadioGroup"
                                //   id="radioOption2"
                                //   label="Or choose this one"
                                // />
                                // <FormikSelect
                                //     className={classNames(
                                //         'join-flow-select',
                                //         'join-flow-select-month',
                                //         {fail: errors.birth_month}
                                //     )}
                                //     error={errors.birth_month}
                                //     id="birth_month"
                                //     name="birth_month"
                                //     options={birthMonthOptions}
                                //     validate={this.validateSelect}
                                //     validationClassName="validation-full-width-input"
                                // />
                                // <FormikSelect
                                //     className={classNames(
                                //         'join-flow-select',
                                //         {fail: errors.birth_year}
                                //     )}
                                //     error={errors.birth_year}
                                //     id="birth_year"
                                //     name="birth_year"
                                //     options={birthYearOptions}
                                //     validate={this.validateSelect}
                                //     validationClassName="validation-full-width-input"
                                // />
                                // */}
                            </div>
                        </JoinFlowStep>
                    );
                }}
            </Formik>
        );
    }
}

GenderStep.propTypes = {
    intl: intlShape,
    onNextStep: PropTypes.func
};

module.exports = injectIntl(GenderStep);
