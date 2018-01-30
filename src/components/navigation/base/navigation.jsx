const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./navigation.scss');

const NavigationBox = props => (
    <div className={classNames('inner', props.className)}>
        {props.children}
    </div>
);

NavigationBox.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = NavigationBox;
