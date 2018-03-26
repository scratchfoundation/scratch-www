const classNames = require('classnames');
const FRCInput = require('formsy-react-components').Input;
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

const defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
const inputHOC = require('./input-hoc.jsx');

require('./input.scss');
require('./row.scss');

class Input extends React.Component {
    render () {
        return (
            <FRCInput
                className="input"
                rowClassName={classNames(
                    this.props.className,
                    {'no-label': (typeof this.props.label === 'undefined')}
                )}
                {...omit(this.props, ['className'])}
            />
        );
    }
}

Input.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string
};

module.exports = inputHOC(defaultValidationHOC(Input));
