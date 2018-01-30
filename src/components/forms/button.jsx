const classNames = require('classnames');
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

require('./button.scss');

const Button = props => {
    const classes = classNames('button', props.className);

    return (
        <button
            className={classes}
            {...omit(props, ['className', 'children'])}
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = Button;
