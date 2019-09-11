const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
import {Field} from 'formik';

require('./formik-checkbox.scss');
require('./formik-forms.scss');
require('../forms/row.scss');

const FormikCheckboxSubComponent = ({
    field,
    id,
    label,
    labelClassName,
    outerClassName,
    ...props
}) => (
    <div className={classNames('checkbox', outerClassName)}>
        <input
            checked={field.value}
            className="formik-checkbox"
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
        onBlur: PropTypes.function,
        onChange: PropTypes.function,
        value: PropTypes.bool
    }),
    id: PropTypes.string,
    label: PropTypes.string,
    labelClassName: PropTypes.string,
    outerClassName: PropTypes.string
};


const FormikCheckbox = ({
    id,
    label,
    labelClassName,
    name,
    outerClassName,
    ...props
}) => (
    <Field
        component={FormikCheckboxSubComponent}
        id={id}
        label={label}
        labelClassName={labelClassName}
        name={name}
        outerClassName={outerClassName}
        {...props}
    />
);

FormikCheckbox.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    labelClassName: PropTypes.string,
    name: PropTypes.string,
    outerClassName: PropTypes.string
};

module.exports = FormikCheckbox;
