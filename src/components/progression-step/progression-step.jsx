var React = require('react');
var classNames = require('classnames');

var ProgressionStep = React.createClass({
    displayName: 'ProgressionStep',
    render: function () {
        var classes = classNames(
            'step',
            this.props.className
        );
        return (
            <div {... this.props} className={classes}>
                {this.props.description}
                {this.props.children}
                {this.props.navigation}
            </div>
        );
    }
});

module.exports = ProgressionStep;
