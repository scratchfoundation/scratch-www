import classNames from 'classnames';
import {Checkbox as FRCCheckbox} from 'formsy-react-components';
import React from 'react';
import {defaultValidationHOC} from './validations.jsx';
import inputHOC from './input-hoc.jsx';

require('./row.scss');
require('./checkbox.scss');

var Checkbox = React.createClass({
    type: 'Checkbox',
    render: function () {
        var classes = classNames(
            'checkbox-row',
            this.props.className
        );
        return (
            <FRCCheckbox rowClassName={classes} {... this.props} />
        );
    }
});

export default inputHOC(defaultValidationHOC(Checkbox));
