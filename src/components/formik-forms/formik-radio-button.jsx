const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
import {Field} from 'formik';

const FormikInput = require('./formik-input.jsx');

require('./formik-forms.scss');
require('./formik-radio-button.scss');
require('../forms/row.scss');

const FormikRadioButtonSubComponent = ({
    children,
    className,
    field, // field.value is the current selected value of the entire radio group
    id,
    label,
    labelClassName,
    value,
    ...props
}) => (
    <React.Fragment>
        <input
            checked={value === field.value}
            className={classNames(
                'formik-radio-button',
                className
            )}
            id={id}
            name={field.name}
            type="radio"
            value={value}
            onBlur={field.onBlur} /* eslint-disable-line react/jsx-handler-names */
            onChange={field.onChange} /* eslint-disable-line react/jsx-handler-names */
            {...props}
        />
        {label && (
            <label
                className={classNames(
                    'formik-label',
                    'formik-radio-label',
                    labelClassName
                )}
            >
                {label}
            </label>
        )}
        {children}
    </React.Fragment>
);

FormikRadioButtonSubComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    field: PropTypes.shape({
        name: PropTypes.string,
        onBlur: PropTypes.function,
        onChange: PropTypes.function,
        value: PropTypes.string
    }),
    id: PropTypes.string,
    label: PropTypes.string,
    labelClassName: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};


const FormikRadioButton = ({
    className,
    id,
    isCustomInput,
    label,
    name,
    onSetCustom,
    onSetCustomRef,
    value,
    ...props
}) => (
    <Field
        className={className}
        component={FormikRadioButtonSubComponent}
        id={id}
        label={label}
        labelClassName={isCustomInput ? 'formik-radio-label-other' : ''}
        name={name}
        value={value}
        {...props}
    >
        {isCustomInput && (
            <FormikInput
                className="formik-radio-input"
                name="custom"
                setRef={onSetCustomRef}
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
    className: PropTypes.string,
    id: PropTypes.string,
    isCustomInput: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onSetCustom: PropTypes.func,
    onSetCustomRef: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

module.exports = FormikRadioButton;
