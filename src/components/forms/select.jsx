const classNames = require('classnames');
const defaults = require('lodash.defaultsdeep');
const FRCSelect = require('formsy-react-components').Select;
const PropTypes = require('prop-types');
const React = require('react');

const defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
const inputHOC = require('./input-hoc.jsx');

require('./row.scss');
require('./select.scss');

const Select = props => {
    if (props.required && !props.value) {
        props = defaults({}, props, {value: props.options[0].value});
    }
    return (
        <div className={classNames('select', props.className)}>
            <FRCSelect {...props} />
        </div>
    );
};

Select.propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.any),
    required: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

module.exports = inputHOC(defaultValidationHOC(Select));
