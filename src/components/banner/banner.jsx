var classNames = require('classnames');
var React = require('react');

require('./banner.scss');

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

module.exports = Banner;
