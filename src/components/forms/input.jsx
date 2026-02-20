const classNames = require('classnames');
const FRCInput = require('formsy-react-components').Input;
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');
const withFormsy = require('formsy-react').withFormsy;

const defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
const inputHOC = require('./input-hoc.jsx');

require('./input.scss');
require('./row.scss');

const Input = ({
    className,
    label,
    setValue,
    ...props
}) => {
    const handleChange = React.useCallback((_name, value) => {
        setValue(value);
    }, [setValue]);

    return (<FRCInput
        className="input"
        label={label}
        rowClassName={classNames(
            className,
            {'no-label': (typeof label === 'undefined')}
        )}
        onChange={handleChange}
        {...omit(props, ['className'])}
    />);
};

Input.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    setValue: PropTypes.func
};

module.exports = withFormsy(inputHOC(defaultValidationHOC(Input)));
