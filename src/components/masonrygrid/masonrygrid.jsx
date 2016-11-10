var classNames = require('classnames');
var React = require('react');
var MediaQuery = require('react-responsive');
var frameless = require('../../lib/frameless');

require('./masonrygrid.scss');

var MasonryGrid = React.createClass({
    type: 'MasonryGrid',
    getDefaultProps: function () {
        return {
            as: 'div'
        };
    },
    reorderColumns: function (items, cols) {
        var a1 = [];
        var a2 = [];
        var a3 = [];
        var i = 0;
        //only implemented for 2 and 3 columns so far - easy to extend if needed
        if (cols > 1 && cols < 4) {
            for (i=0;i<items.length;i++){
                var col = (i+cols)%cols;
                if (col === 0) {
                    a1.push(items[i]);
                }
                else if (col === 1) {
                    a2.push(items[i]);
                }
                else if (col === 2) {
                    a3.push(items[i]);
                }
            }
            return a1.concat(a2,a3);
        } else {
            return items;
        }
    },
    render: function () {
        var classes = classNames(
            'masonry',
            this.props.className
        );
        return (
            <this.props.as className={classes}>
                <MediaQuery maxWidth={frameless.tablet - 1} >
                    {this.props.children}
                </MediaQuery>
                <MediaQuery minWidth={frameless.tablet} maxWidth={frameless.desktop - 1} >
                    {this.reorderColumns(this.props.children, 2)}
                </MediaQuery>
                <MediaQuery minWidth={frameless.desktop} >
                    {this.reorderColumns(this.props.children, 3)}
                </MediaQuery>
            </this.props.as>
        );
    }
});

module.exports = MasonryGrid;
