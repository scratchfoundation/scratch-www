const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
import {Field} from 'formik';

require('./formik-checkbox.scss');
require('./formik-forms.scss');
require('../forms/row.scss');

const FormikCheckboxSubComponent = ({
    className,
    field,
    id,
    label,
    ...props
}) => (
    <div className="checkbox">
        <input
            checked={field.value}
            className={classNames(
                'formik-checkbox',
                className
            )}
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
                    'formik-label',
                    'formik-checkbox-label'
                )}
                htmlFor={id}
            >
                {label}
            </label>
        )}
    </div>
);

FormikCheckboxSubComponent.propTypes = {
    className: PropTypes.string,
    field: PropTypes.shape({
        name: PropTypes.string,
        onBlur: PropTypes.function,
        onChange: PropTypes.function,
        value: PropTypes.bool
    }),
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};


const FormikCheckbox = ({
    className,
    id,
    label,
    name,
    ...props
}) => (
    <Field
        className={className}
        component={FormikCheckboxSubComponent}
        id={id}
        label={label}
        name={name}
        {...props}
    />
);

FormikCheckbox.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string
};

module.exports = FormikCheckbox;
