const classNames = require('classnames');
const FRCCheckbox = require('formsy-react-components').Checkbox;
const PropTypes = require('prop-types');
const React = require('react');

const defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
const inputHOC = require('./input-hoc.jsx');

require('./row.scss');
require('./checkbox.scss');

const Checkbox = props => (
    <FRCCheckbox
        rowClassName={classNames('checkbox-row', props.className)}
        {...props}
    />
);

Checkbox.propTypes = {
    className: PropTypes.string,
    value: PropTypes.bool,
    valueLabel: PropTypes.string
};

Checkbox.defaultProps = {
    value: false,
    valueLabel: ''
};

module.exports = inputHOC(defaultValidationHOC(Checkbox));
