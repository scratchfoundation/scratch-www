var classNames = require('classnames');
var React = require('react');

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

module.exports = TitleBanner;
