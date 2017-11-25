import classNames from 'classnames';
import React from 'react';

require('./banner.scss');

/**
 * Container for messages displayed below the nav bar that can be dismissed
 * (See: email not confirmed banner)
 */
var Banner = React.createClass({
    type: 'Banner',
    propTypes: {
        onRequestDismiss: React.PropTypes.func
    },
    render: function () {
        var classes = classNames(
            'banner',
            this.props.className
        );
        return (
            <div className={classes}>
                <div className="inner">
                    {this.props.children}
                    {this.props.onRequestDismiss ? [
                        <a className="close" key="close" href="#" onClick={this.props.onRequestDismiss}>x</a>
                    ] : []}
                </div>
            </div>
        );
    }
});

export default Banner;
