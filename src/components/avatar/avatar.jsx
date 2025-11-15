const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./avatar.scss');

const Avatar = ({
    className,
    src = '//uploads.scratch.mit.edu/get_image/user/2584924_24x24.png?v=1438702210.96',
    showAvatarBadge = false,
    ...rest
}) => (
    <div className={classNames('avatar-wrapper', showAvatarBadge && 'avatar-badge-wrapper')}>
        <img
            className={classNames(
                'avatar',
                showAvatarBadge && 'avatar-badge',
                className
            )}
            src={src}
            {...rest}
        />
    </div>
);

Avatar.propTypes = {
    showAvatarBadge: PropTypes.bool,
    className: PropTypes.string,
    src: PropTypes.string
};

module.exports = Avatar;
