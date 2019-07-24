const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
import {Field} from 'formik';

const FormikInput = require('./formik-input.jsx');

require('../forms/row.scss');

const FormikRadioButtonSubComponent = ({
    buttonValue,
    className,
    field,
    label,
    ...props
}) => (
    <div>
        <input
            // className={classNames(
            //     'select',
            //     className
            // )}

            className={className}
            name={field.name}
            type="radio"
            value={buttonValue}
            checked={buttonValue === field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...props}
        />
        <label htmlFor={buttonValue}>{label}</label>
    </div>
);

FormikRadioButtonSubComponent.propTypes = {
    buttonValue: PropTypes.string,
    className: PropTypes.string,
    field: PropTypes.shape({
        name: PropTypes.string,
        onBlur: PropTypes.function,
        onChange: PropTypes.function,
        value: PropTypes.string
    }),
    // error: PropTypes.string,
    // options: PropTypes.arrayOf(PropTypes.shape({
    //     className: PropTypes.string,
    //     disabled: PropTypes.bool,
    //     label: PropTypes.string.isRequired,
    //     value: PropTypes.string.isRequired
    // })).isRequired,
    // validationClassName: PropTypes.string,
    // selected value
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};


const FormikRadioButton = ({
    buttonValue,
    className,
    isOther,
    ...props
}) => (
    <div className="row">
        <div className="col-sm-9">
            <Field
                buttonValue={buttonValue}
                className={className}
                component={FormikRadioButtonSubComponent}
                id="radioOption1"
                label="Choose this option"
                {...props}
            />
            {isOther && (
                <FormikInput
                    className={className}
                    id={"other"}
                    name="other"
                    onFocus={() => {}}
                />
            )}
        </div>
    </div>
);

FormikRadioButton.propTypes = {
    buttonValue: PropTypes.string,
    className: PropTypes.string,
    // error: PropTypes.string,
    // options: PropTypes.arrayOf(PropTypes.shape({
    //     className: PropTypes.string,
    //     disabled: PropTypes.bool,
    //     label: PropTypes.string.isRequired,
    //     value: PropTypes.string.isRequired
    // })).isRequired,
    // validationClassName: PropTypes.string,
    // selected value
    isOther: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

module.exports = FormikRadioButton;
