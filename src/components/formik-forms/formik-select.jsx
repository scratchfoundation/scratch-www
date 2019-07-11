const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
import {Field} from 'formik';

const ValidationMessage = require('../forms/validation-message.jsx');

require('../forms/input.scss');
require('../forms/row.scss');

const FormikSelect = ({
    className,
    error,
    options,
    validationClassName,
    ...props
}) => {
    const optionsList = options.map((item, index) => (
        <option
            key={index}
            value={item.value}
        >
            {item.label}
        </option>
    ));
    return (
        <div className="col-sm-9 row row-relative">
            <Field
                className={classNames(
                    'select',
                    className
                )}
                component="select"
                {...props}
            >
                {optionsList}
            </Field>
            {error && (
                <ValidationMessage
                    className={validationClassName}
                    message={error}
                />
            )}
        </div>
    );
};


FormikSelect.propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    // expect structure like: [
    //    {value: 'US', label: 'United States'}
    //    {value: 'AG', label: 'Angola'}
    //    ...
    // ]
    options: PropTypes.arrayOf(PropTypes.any),
    validationClassName: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

module.exports = FormikSelect;
