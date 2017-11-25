import classNames from 'classnames';
import React from 'react';

require('./navigation.scss');

var NavigationBox = React.createClass({
    type: 'NavigationBox',
    render: function () {
        var classes = classNames(
            'inner',
            this.props.className
        );
        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
});

export default NavigationBox;
