var classNames = require('classnames');
var React = require('react');

require('./masonrygrid.scss');

var MasonryGrid = React.createClass({
    type: 'MasonryGrid',
    getDefaultProps: function () {
        return {
            as: 'div'
        };
    },
    render: function () {
        var classes = classNames(
            'masonry',
            this.props.className
        );
        return (
            <this.props.as className={classes}>
                {this.props.children}
            </this.props.as>
        );
    }
});

module.exports = MasonryGrid;
