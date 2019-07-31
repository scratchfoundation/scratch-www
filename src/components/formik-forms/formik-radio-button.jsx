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
            checked={buttonValue === field.value}
            className={classNames(
                'formik-radio-button',
                className
            )}
            name={field.name}
            type="radio"
            value={buttonValue}
            onBlur={field.onBlur} /* eslint-disable-line react/jsx-handler-names */
            onChange={field.onChange} /* eslint-disable-line react/jsx-handler-names */
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
    labelClassName: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};


const FormikRadioButton = ({
    buttonValue,
    className,
    isCustomInput,
    label,
    onSetCustom,
    ...props
}) => (
    <Field
        buttonValue={buttonValue}
        className={className}
        component={FormikRadioButtonSubComponent}
        id="radioOption1"
        label={label}
        labelClassName={isCustomInput ? 'formik-radio-label-other' : ''}
        {...props}
    >
        {isCustomInput && (
            <FormikInput
                className="formik-radio-input"
                id="other"
                name="other"
                wrapperClassName="formik-radio-input-wrapper"
                /* eslint-disable react/jsx-no-bind */
                onChange={event => onSetCustom(event.target.value)}
                onFocus={event => onSetCustom(event.target.value)}
                /* eslint-enable react/jsx-no-bind */
            />
        )}
    </Field>
);

FormikRadioButton.propTypes = {
    buttonValue: PropTypes.string,
    className: PropTypes.string,
    isCustomInput: PropTypes.bool,
    label: PropTypes.string,
    onSetCustom: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

module.exports = FormikRadioButton;
