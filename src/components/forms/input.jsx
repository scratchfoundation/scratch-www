var classNames = require('classnames');
var FRCInput = require('formsy-react-components').Input;
var React = require('react');
var defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
var inputHOC = require('./input-hoc.jsx');

require('./input.scss');
require('./row.scss');

var Input = React.createClass({
    type: 'Input',
    getDefaultProps: function () {
        return {};
    },
    getInitialState: function () {
        return {
            status: ''
        };
    },
    onValid: function () {
        this.setState({
            status: 'pass'
        });
    },
    onInvalid: function () {
        this.setState({
            status: 'fail'
        });
    },
    render: function () {
        var classes = classNames(
            this.state.status,
            this.props.className
        );
        return (
            <FRCInput {... this.props}
                      className="input"
                      rowClassName={classes}
                      onValid={this.onValid}
                      onInvalid={this.onInvalid} />
        );
    }
});

module.exports = inputHOC(defaultValidationHOC(Input));
