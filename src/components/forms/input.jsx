import classNames from 'classnames';
import {Input as FRCInput} from 'formsy-react-components';
import React from 'react';
import {defaultValidationHOC} from './validations.jsx';
import inputHOC from './input-hoc.jsx';

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
            this.props.className,
            {'no-label': (typeof this.props.label === 'undefined')}
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

export default inputHOC(defaultValidationHOC(Input));
