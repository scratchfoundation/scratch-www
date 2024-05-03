const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const {Field} = require('formik');

const ValidationMessage = require('../forms/validation-message.jsx');

require('../forms/row.scss');
require('./formik-input.scss');

const FormikInput = ({
    className,
    error,
    onSetRef,
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
                'formik-input',
                {fail: error},
                className
            )}
            /* formik uses "innerRef" to return the actual input element */
            innerRef={onSetRef}
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
    // error and toolTip can be false, in which case we ignore them
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onSetRef: PropTypes.func,
    toolTip: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    type: PropTypes.string,
    validationClassName: PropTypes.string,
    wrapperClassName: PropTypes.string
};

module.exports = FormikInput;
