const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const Avatar = ({
    className,
    src = '//uploads.scratch.mit.edu/get_image/user/2584924_24x24.png?v=1438702210.96',
    ...rest
}) => (
    <img
        className={classNames('avatar', className)}
        src={src}
        {...rest}
    />
);

Avatar.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string
};

module.exports = Avatar;
