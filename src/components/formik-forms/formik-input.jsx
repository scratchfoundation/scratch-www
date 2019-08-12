const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
import {Field} from 'formik';

const ValidationMessage = require('../forms/validation-message.jsx');

require('../forms/row.scss');
require('./formik-input.scss');

const FormikInput = ({
    className,
    error,
    toolTip,
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
                {fail: error},
                className
            )}
            {...props}
        />
        {error ? (
            <ValidationMessage
                isError
                className={validationClassName}
                message={error}
            />
        ) : toolTip && (
            <ValidationMessage
                isOk
                className={validationClassName}
                message={toolTip}
            />
        )}
    </div>
);


FormikInput.propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    toolTip: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    type: PropTypes.string,
    validationClassName: PropTypes.string,
    wrapperClassName: PropTypes.string
};

module.exports = FormikInput;
