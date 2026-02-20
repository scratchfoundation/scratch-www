const classNames = require('classnames');
const FRCCheckbox = require('formsy-react-components').Checkbox;
const PropTypes = require('prop-types');
const React = require('react');

const defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
const inputHOC = require('./input-hoc.jsx');

require('./row.scss');
require('./checkbox.scss');

const Checkbox = ({
    className = '',
    value = false,
    valueLabel = '',
    ...props
}) => (
    <FRCCheckbox
        rowClassName={classNames('checkbox-row', className)}
        value={value}
        valueLabel={valueLabel}
        {...props}
    />
);

Checkbox.propTypes = {
    className: PropTypes.string,
    value: PropTypes.bool,
    valueLabel: PropTypes.string
};

module.exports = inputHOC(defaultValidationHOC(Checkbox));
