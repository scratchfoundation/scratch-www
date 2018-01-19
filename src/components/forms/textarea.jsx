const classNames = require('classnames');
const FRCTextarea = require('formsy-react-components').Textarea;
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

const defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
const inputHOC = require('./input-hoc.jsx');

require('./row.scss');
require('./textarea.scss');

const TextArea = props => (
    <FRCTextarea
        className="textarea"
        rowClassName={classNames('textarea-row', props.className)}
        {...omit(props, ['className'])}
    />
);

TextArea.propTypes = {
    className: PropTypes.string
};

module.exports = inputHOC(defaultValidationHOC(TextArea));
