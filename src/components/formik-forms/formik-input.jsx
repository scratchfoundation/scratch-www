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
    setRef,
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
            /* formik uses "innerRef" to return the actual input element */
            innerRef={setRef}
            {...props}
        />
        {error ? (
            <ValidationMessage
                className={validationClassName}
                message={error}
                mode="error"
            />
        ) : toolTip && (
            <ValidationMessage
                className={validationClassName}
                message={toolTip}
                mode="info"
            />
        )}
    </div>
);

FormikInput.propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    setRef: PropTypes.func,
    toolTip: PropTypes.string,
    type: PropTypes.string,
    validationClassName: PropTypes.string,
    wrapperClassName: PropTypes.string
};

module.exports = FormikInput;
