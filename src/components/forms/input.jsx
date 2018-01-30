const bindAll = require('lodash.bindall');
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
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleInvalid',
            'handleValid'
        ]);
        this.state = {
            status: ''
        };
    }
    handleValid () {
        this.setState({
            status: 'pass'
        });
    }
    handleInvalid () {
        this.setState({
            status: 'fail'
        });
    }
    render () {
        return (
            <FRCInput
                className="input"
                rowClassName={classNames(
                    this.state.status,
                    this.props.className,
                    {'no-label': (typeof this.props.label === 'undefined')}
                )}
                onInvalid={this.handleInvalid}
                onValid={this.handleValid}
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
