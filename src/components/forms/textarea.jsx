var React = require('react');
var classNames = require('classnames');

require('./textarea.scss');

var TextArea = React.createClass({
    type: 'TextArea',
    getDefaultProps: function () {
        return {
            rows: 5,
            cols: 40
        }
    },
    render: function () {
        var classes = classNames(
            'textarea',
            this.props.className
        );
        return (
            <textarea {... this.props} className={classes}>
                {this.props.children}
            </textarea>
        );
    }
});

module.exports = TextArea;
