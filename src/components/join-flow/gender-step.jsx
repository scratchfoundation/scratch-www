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
    onSetFieldValue: PropTypes.func,
    selectedValue: PropTypes.string,
    value: PropTypes.string
};

class GenderStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleValidSubmit'
        ]);
    }
    handleValidSubmit (formData, formikBag) {
        formikBag.setSubmitting(false);
        if (!formData.gender || formData.gender === 'null') {
            formData.gender = 'Prefer not to say';
        }
        delete formData.custom;
        this.props.onNextStep(formData);
    }
    render () {
        return (
            <Formik
                initialValues={{
                    gender: 'null',
                    custom: ''
                }}
                onSubmit={this.handleValidSubmit}
            >
                {props => {
                    const {
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                        setValues,
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
                                label={this.props.intl.formatMessage({id: 'general.female'})}
                                selectedValue={values.gender}
                                value="Female"
                                onSetFieldValue={setFieldValue}
                            />
                            <GenderOption
                                label={this.props.intl.formatMessage({id: 'general.male'})}
                                selectedValue={values.gender}
                                value="Male"
                                onSetFieldValue={setFieldValue}
                            />
                            <GenderOption
                                label={this.props.intl.formatMessage({id: 'general.nonbinary'})}
                                selectedValue={values.gender}
                                value="Non-binary"
                                onSetFieldValue={setFieldValue}
                            />
                            <div
                                className={classNames(
                                    'col-sm-9',
                                    'row',
                                    'row-inline',
                                    'gender-radio-row',
                                    {'gender-radio-row-selected': (values.gender === values.custom)}
                                )}
                                /* eslint-disable react/jsx-no-bind */
                                onClick={() => setFieldValue('gender', values.custom, false)}
                                /* eslint-enable react/jsx-no-bind */
                            >
                                <FormikRadioButton
                                    isCustomInput
                                    buttonValue={values.custom}
                                    className={classNames(
                                        'join-flow-radio'
                                    )}
                                    label={this.props.intl.formatMessage({id: 'registration.genderOptionAnother'})}
                                    name="gender"
                                    /* eslint-disable react/jsx-no-bind */
                                    onSetCustom={newCustomVal => setValues({
                                        gender: newCustomVal,
                                        custom: newCustomVal
                                    })}
                                    /* eslint-enable react/jsx-no-bind */
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
