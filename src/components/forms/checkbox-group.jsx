const classNames = require('classnames');
const FRCCheckboxGroup = require('formsy-react-components').CheckboxGroup;
const PropTypes = require('prop-types');
const React = require('react');

const defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
const inputHOC = require('./input-hoc.jsx');

require('./row.scss');
require('./checkbox-group.scss');

const CheckboxGroup = props => (
    <div className={classNames('checkbox-group', props.className)}>
        <FRCCheckboxGroup
            className={classNames('checkbox-group', props.className)}
            {... props}
        />
    </div>
);

CheckboxGroup.propTypes = {
    className: PropTypes.string
};

module.exports = inputHOC(defaultValidationHOC(CheckboxGroup));
