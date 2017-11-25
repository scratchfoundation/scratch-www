import classNames from 'classnames';
import defaults from 'lodash.defaultsdeep';
import {Select as FRCSelect} from 'formsy-react-components';
import React from 'react';
import {defaultValidationHOC} from './validations.jsx';
import inputHOC from './input-hoc.jsx';

require('./row.scss');
require('./select.scss');

var Select = React.createClass({
    type: 'Select',
    propTypes: {
        
    },
    render: function () {
        var classes = classNames(
            'select',
            this.props.className
        );
        var props = this.props;
        if (this.props.required && !this.props.value) {
            props = defaults({}, this.props, {value: this.props.options[0].value});
        }
        return (
            <div className={classes}>
                <FRCSelect {... props} />
            </div>
        );
    }
});

export default inputHOC(defaultValidationHOC(Select));
