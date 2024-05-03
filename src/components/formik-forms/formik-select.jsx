const PropTypes = require('prop-types');
const React = require('react');
const {Field} = require('formik');

const ValidationMessage = require('../forms/validation-message.jsx');

require('../forms/select.scss');
require('../forms/row.scss');
require('./formik-select.scss');

const FormikSelect = ({
    className,
    error,
    options,
    validationClassName,
    ...props
}) => {
    const optionsList = options.map((item, index) => (
        <option
            disabled={item.disabled}
            key={index}
            value={item.value}
        >
            {item.label}
        </option>
    ));
    return (
        <div className="select row-with-tooltip">
            <Field
                className={className}
                component="select"
                {...props}
            >
                {optionsList}
            </Field>
            {error && (
                <ValidationMessage
                    className={validationClassName}
                    message={error}
                    mode="error"
                />
            )}
        </div>
    );
};


FormikSelect.propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired,
    validationClassName: PropTypes.string,
    // selected value
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

module.exports = FormikSelect;
