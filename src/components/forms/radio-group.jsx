import classNames from 'classnames';
import {RadioGroup as FRCRadioGroup} from 'formsy-react-components';
import React from 'react';
import {defaultValidationHOC} from './validations.jsx';
import inputHOC from './input-hoc.jsx';

require('./row.scss');
require('./radio-group.scss');

var RadioGroup = React.createClass({
    type: 'RadioGroup',
    render: function () {
        var classes = classNames(
            'radio-group',
            this.props.className
        );
        return (
            <FRCRadioGroup {... this.props} className={classes} />
        );
    }
});

export default inputHOC(defaultValidationHOC(RadioGroup));
