import React from 'react';
import classNames from 'classnames';

require('./dropdown.scss');

var Dropdown = React.createClass({
    type: 'Dropdown',
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

export default Dropdown;
