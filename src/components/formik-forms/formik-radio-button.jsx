const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
import {Field} from 'formik';

const FormikInput = require('./formik-input.jsx');

require('./formik-radio-button.scss');
require('../forms/row.scss');

const FormikRadioButtonSubComponent = ({
    buttonValue,
    children,
    className,
    field,
    label,
    labelClassName,
    ...props
}) => (
    <React.Fragment>
        <input
            className={classNames(
                'formik-radio-button',
                className
            )}
            name={field.name}
            type="radio"
            value={buttonValue}
            checked={buttonValue === field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...props}
        />
        {label && (
            <label
                className={classNames(
                    'formik-radio-label',
                    labelClassName
                )}
                htmlFor={buttonValue}
            >
                {label}
            </label>
        )}
        {children}
    </React.Fragment>
);

FormikRadioButtonSubComponent.propTypes = {
    buttonValue: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    field: PropTypes.shape({
        name: PropTypes.string,
        onBlur: PropTypes.function,
        onChange: PropTypes.function,
        value: PropTypes.string
    }),
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};


const FormikRadioButton = ({
    buttonValue,
    className,
    isOther,
    label,
    onSetOther,
    ...props
}) => (
    <Field
        buttonValue={buttonValue}
        className={className}
        component={FormikRadioButtonSubComponent}
        id="radioOption1"
        label={label}
        labelClassName={isOther ? 'formik-radio-label-other' : ''}
        {...props}
    >
        {isOther && (
            <FormikInput
                className='formik-radio-input'
                id="other"
                name="other"
                wrapperClassName="formik-radio-input-wrapper"
                onChange={event => onSetOther(event.target.value)}
                onFocus={event => onSetOther(event.target.value)}
            />
        )}
    </Field>
);

FormikRadioButton.propTypes = {
    buttonValue: PropTypes.string,
    className: PropTypes.string,
    isOther: PropTypes.bool,
    label: PropTypes.string,
    onSetOther: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

module.exports = FormikRadioButton;
