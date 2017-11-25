import classNames from 'classnames';
import {CheckboxGroup as FRCCheckboxGroup} from 'formsy-react-components';
import React from 'react';
import {defaultValidationHOC} from './validations.jsx';
import inputHOC from './input-hoc.jsx';

require('./row.scss');
require('./checkbox-group.scss');

var CheckboxGroup = React.createClass({
    type: 'CheckboxGroup',
    render: function () {
        var classes = classNames(
            'checkbox-group',
            this.props.className
        );
        return (
            <div className={classes}>
                <FRCCheckboxGroup {... this.props} className={classes} />
            </div>
        );
    }
});

export default inputHOC(defaultValidationHOC(CheckboxGroup));
