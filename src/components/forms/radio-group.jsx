const classNames = require('classnames');
const FRCRadioGroup = require('formsy-react-components').RadioGroup;
const PropTypes = require('prop-types');
const React = require('react');

const defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
const inputHOC = require('./input-hoc.jsx');

require('./row.scss');
require('./radio-group.scss');

const RadioGroup = props => (
    <FRCRadioGroup
        className={classNames('radio-group', props.className)}
        {... props}
    />
);

RadioGroup.propTypes = {
    className: PropTypes.string
};

module.exports = inputHOC(defaultValidationHOC(RadioGroup));
