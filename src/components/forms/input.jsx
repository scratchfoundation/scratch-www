const classNames = require('classnames');
const FRCInput = require('formsy-react-components').Input;
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

const defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
const inputHOC = require('./input-hoc.jsx');

require('./input.scss');
require('./row.scss');

const Input = ({
    className,
    label,
    ...props
}) => (
    <FRCInput
        className="input"
        label={label}
        rowClassName={classNames(
            className,
            {'no-label': (typeof label === 'undefined')}
        )}
        {...omit(props, ['className'])}
    />
);

Input.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string
};

module.exports = inputHOC(defaultValidationHOC(Input));
