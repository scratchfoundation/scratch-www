import classNames from 'classnames';
import React from 'react';

require('./title-banner.scss');

var TitleBanner = React.createClass({
    type: 'TitleBanner',
    render: function () {
        var classes = classNames(
            'title-banner',
            this.props.className
        );
        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
});

export default TitleBanner;
