const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');
const FormattedMessage = require('react-intl').FormattedMessage;

const FormikRadioButton = require('../../components/formik-forms/formik-radio-button.jsx');
const JoinFlowStep = require('./join-flow-step.jsx');
const InfoButton = require('../info-button/info-button.jsx');

require('./join-flow-steps.scss');

const GenderOption = ({
    id,
    label,
    onSetFieldValue,
    selectedValue,
    value,
    ...props
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
            className={classNames(
                'join-flow-radio'
            )}
            id={id}
            label={label}
            name="gender"
            value={value}
            {...props}
        />
    </div>
);

GenderOption.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    onSetFieldValue: PropTypes.func,
    selectedValue: PropTypes.string,
    value: PropTypes.string
};

class GenderStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSetCustomRef',
            'handleValidSubmit'
        ]);
    }
    handleSetCustomRef (customInputRef) {
        this.customInput = customInputRef;
    }
    handleValidSubmit (formData, formikBag) {
        formikBag.setSubmitting(false);
        // handle defaults:
        // when gender is specifically made blank, use "(blank)"
        if (!formData.gender || formData.gender === '') {
            formData.gender = '(blank)';
        }
        // when user clicks Next without making any selection, use "(skipped)"
        if (formData.gender === 'null') {
            formData.gender = '(skipped)';
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
                            description={this.props.intl.formatMessage({id: 'registration.genderStepDescription'})}
                            descriptionClassName="join-flow-gender-description"
                            innerClassName="join-flow-inner-gender-step"
                            title={this.props.intl.formatMessage({id: 'registration.genderStepTitle'})}
                            waiting={isSubmitting}
                            onSubmit={handleSubmit}
                        >
                            <GenderOption
                                id="GenderRadioOptionFemale"
                                label={this.props.intl.formatMessage({id: 'general.female'})}
                                selectedValue={values.gender}
                                value="female"
                                onSetFieldValue={setFieldValue}
                            />
                            <GenderOption
                                id="GenderRadioOptionMale"
                                label={this.props.intl.formatMessage({id: 'general.male'})}
                                selectedValue={values.gender}
                                value="male"
                                onSetFieldValue={setFieldValue}
                            />
                            <GenderOption
                                label={this.props.intl.formatMessage({id: 'general.nonBinary'})}
                                selectedValue={values.gender}
                                value="non-binary"
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
                                onClick={() => {
                                    setFieldValue('gender', values.custom, false);
                                    if (this.customInput) this.customInput.focus();
                                }}
                                /* eslint-enable react/jsx-no-bind */
                            >
                                <FormikRadioButton
                                    isCustomInput
                                    className={classNames(
                                        'join-flow-radio'
                                    )}
                                    id="GenderRadioOptionCustom"
                                    label={this.props.intl.formatMessage({id: 'registration.genderOptionAnother'})}
                                    name="gender"
                                    value={values.custom}
                                    /* eslint-disable react/jsx-no-bind */
                                    onSetCustom={newCustomVal => setValues({
                                        gender: newCustomVal,
                                        custom: newCustomVal
                                    })}
                                    onSetCustomRef={this.handleSetCustomRef}
                                    /* eslint-enable react/jsx-no-bind */
                                />
                            </div>
                            <GenderOption
                                id="GenderRadioOptionPreferNot"
                                label={this.props.intl.formatMessage({id: 'registration.genderOptionPreferNotToSay'})}
                                selectedValue={values.gender}
                                value="(Prefer not to say)"
                                onSetFieldValue={setFieldValue}
                            />
                            <div className="join-flow-privacy-message join-flow-gender-privacy">
                                <FormattedMessage id="registration.private" />
                                <InfoButton
                                    message={this.props.intl.formatMessage({id: 'registration.genderStepInfo'})}
                                />
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
