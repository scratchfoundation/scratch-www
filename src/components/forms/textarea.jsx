import classNames from 'classnames';
import {Textarea as FRCTextarea} from 'formsy-react-components';
import React from 'react';
import {defaultValidationHOC} from './validations.jsx';
import inputHOC from './input-hoc.jsx';

require('./row.scss');
require('./textarea.scss');

var TextArea = React.createClass({
    type: 'TextArea',
    render: function () {
        var classes = classNames(
            'textarea-row',
            this.props.className
        );
        return (
            <FRCTextarea {... this.props}
                         className="textarea"
                         rowClassName={classes} />
        );
    }
});

export default inputHOC(defaultValidationHOC(TextArea));
