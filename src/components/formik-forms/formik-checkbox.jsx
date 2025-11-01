const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const {Field} = require('formik');

const ValidationMessage = require('../forms/validation-message.jsx');

require('./formik-checkbox.scss');
require('./formik-forms.scss');
require('../forms/row.scss');

const FormikCheckboxSubComponent = ({
    field,
    id,
    label,
    labelClassName,
    outerClassName,
    className,
    ...props
}) => (
    <div className={classNames('checkbox', outerClassName)}>
        <input
            checked={field.value}
            className={classNames('formik-checkbox', className)}
            id={id}
            name={field.name}
            type="checkbox"
            value={field.value}
            onBlur={field.onBlur} /* eslint-disable-line react/jsx-handler-names */
            onChange={field.onChange} /* eslint-disable-line react/jsx-handler-names */
            {...props}
        />
        {label && (
            <label
                className={classNames(
                    'formik-checkbox-label',
                    'formik-label',
                    labelClassName
                )}
                htmlFor={id}
            >
                {label}
            </label>
        )}
    </div>
);

FormikCheckboxSubComponent.propTypes = {
    field: PropTypes.shape({
        name: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        value: PropTypes.bool
    }),
    id: PropTypes.string,
    label: PropTypes.string,
    labelClassName: PropTypes.string,
    outerClassName: PropTypes.string,
    className: PropTypes.string
};


const FormikCheckbox = ({
    id,
    label,
    labelClassName,
    name,
    outerClassName,
    error,
    validationClassName,
    ...props
}) => (
    <div>
        <Field
            component={FormikCheckboxSubComponent}
            id={id}
            label={label}
            labelClassName={labelClassName}
            name={name}
            outerClassName={outerClassName}
            {...props}
        />
        {error && (
            <ValidationMessage
                className={validationClassName}
                message={error}
                mode="error"
            />
        )}
    </div>
);

FormikCheckbox.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    labelClassName: PropTypes.string,
    name: PropTypes.string,
    outerClassName: PropTypes.string,
    error: PropTypes.string,
    validationClassName: PropTypes.string
};

module.exports = FormikCheckbox;
