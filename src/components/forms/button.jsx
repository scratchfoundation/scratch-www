import React from 'react';
import classNames from 'classnames';

require('./button.scss');

var Button = React.createClass({
    type: 'Button',
    propTypes: {
        
    },
    render: function () {
        var classes = classNames(
            'button',
            this.props.className
        );
        return (
            <button {... this.props} className={classes} >{this.props.children}</button>
        );
    }
});

export default Button;
