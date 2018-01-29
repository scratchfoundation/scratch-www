const classNames = require('classnames');
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

const Avatar = props => (
    <img
        className={classNames('avatar', props.className)}
        {...omit(props, ['className'])}
    />
);

Avatar.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string
};

Avatar.defaultProps = {
    src: '//cdn2.scratch.mit.edu/get_image/user/2584924_24x24.png?v=1438702210.96'
};

module.exports = Avatar;
