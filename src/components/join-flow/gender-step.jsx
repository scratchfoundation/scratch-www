const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');

const FormikRadioButton = require('../../components/formik-forms/formik-radio-button.jsx');
const JoinFlowStep = require('./join-flow-step.jsx');

require('./join-flow-steps.scss');

const GenderOption = ({
    label,
    onSetFieldValue,
    selectedValue,
    value
}) => (
    <div
        className={classNames(
            'col-sm-9',
            'row',
            'row-inline',
            'gender-radio-row',
            {'gender-radio-row-selected': (selectedValue === value)}
        )}
        /* eslint-disable react/jsx-no-bind */
        onClick={() => onSetFieldValue('gender', value, false)}
        /* eslint-enable react/jsx-no-bind */
    >
        <FormikRadioButton
            buttonValue={value}
            className={classNames(
                'join-flow-radio'
            )}
            label={label}
            name="gender"
        />
    </div>
);

GenderOption.propTypes = {
    label: PropTypes.string,
    onSetFieldValue: PropTypes.function,
    selectedValue: PropTypes.string,
    value: PropTypes.string
};

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
                            <GenderOption
                                label={this.props.intl.formatMessage({id: 'registration.genderOptionFemale'})}
                                selectedValue={values.gender}
                                value="Female"
                                onSetFieldValue={setFieldValue}
                            />
                            <GenderOption
                                label={this.props.intl.formatMessage({id: 'registration.genderOptionMale'})}
                                selectedValue={values.gender}
                                value="Male"
                                onSetFieldValue={setFieldValue}
                            />
                            <div
                                className={classNames(
                                    'col-sm-9',
                                    'row',
                                    'birthdate-select-row'
                                )}
                            >
                                {values.gender}
                                <FormikRadioButton
                                    buttonValue="Prefer not to say"
                                    className={classNames(
                                        'join-flow-radio',
                                        {fail: errors.birth_month}
                                    )}
                                    label="Prefer not to say"
                                    name="gender"
                                />
                            </div>
                            <GenderOption
                                label={this.props.intl.formatMessage({id: 'registration.genderOptionPreferNotToSay'})}
                                selectedValue={values.gender}
                                value="Prefer not to say"
                                onSetFieldValue={setFieldValue}
                            />
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
