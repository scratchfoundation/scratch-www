const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const onClickOutside = require('react-onclickoutside').default;
const PropTypes = require('prop-types');
const React = require('react');

require('./dropdown.scss');

class Dropdown extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickOutside'
        ]);
    }
    handleClickOutside () {
        if (this.props.isOpen) {
            this.props.onRequestClose();
        }
    }
    render () {
        return (
            <this.props.as
                className={classNames('dropdown', this.props.className, {
                    open: this.props.isOpen
                })}
            >
                {this.props.children}
            </this.props.as>
        );
    }
}

Dropdown.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired
};

Dropdown.defaultProps = {
    as: 'div',
    isOpen: false
};

module.exports = onClickOutside(Dropdown);
