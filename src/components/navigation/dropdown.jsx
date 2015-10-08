var React = require('react');
var classNames = require('classnames');

require('./dropdown.scss');

var Dropdown = React.createClass({
    mixins: [
        require('react-onclickoutside')
    ],
    propTypes: {
        onRequestClose: React.PropTypes.func,
        isOpen: React.PropTypes.bool
    },
    getDefaultProps: function () {
        return {
            as: 'div',
            isOpen: false
        };
    },
    handleClickOutside: function () {
        if (this.props.isOpen) {
            this.props.onRequestClose();
        }
    },
    render: function () {
        var classes = classNames(
            'dropdown',
            this.props.className,
            {open: this.props.isOpen}
        );
        return (
            <this.props.as className={classes}>
                {this.props.children}
            </this.props.as>
        );
    }
});

module.exports = Dropdown;
