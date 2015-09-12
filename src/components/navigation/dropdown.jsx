var React = require('react');

require('./dropdown.scss');

module.exports = React.createClass({
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
        var className = [
            'dropdown',
            this.props.className,
            this.props.isOpen ? 'open' : ''
        ].join(' ');
        return (
            <this.props.as className={className}>
                {this.props.children}
            </this.props.as>
        );
    }
});
