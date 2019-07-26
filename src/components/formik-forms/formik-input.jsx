const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
import {Field} from 'formik';

const ValidationMessage = require('../forms/validation-message.jsx');

require('../forms/input.scss');
require('../forms/row.scss');

const FormikInput = ({
    className,
    error,
    validationClassName,
    wrapperClassName,
    ...props
}) => (
    <div
        className={classNames(
            'col-sm-9',
            'row',
            'row-with-tooltip',
            wrapperClassName
        )}
    >
        <Field
            className={classNames(
                'input',
                className
            )}
            {...props}
        />
        {error && (
            <ValidationMessage
                className={validationClassName}
                message={error}
            />
        )}
    </div>
);


FormikInput.propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    validationClassName: PropTypes.string,
    wrapperClassName: PropTypes.string
};

module.exports = FormikInput;
