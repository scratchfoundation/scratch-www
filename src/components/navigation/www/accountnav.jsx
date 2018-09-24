const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');

const Avatar = require('../../avatar/avatar.jsx');
const Dropdown = require('../../dropdown/dropdown.jsx');

require('./accountnav.scss');

const AccountNav = ({
    classroomId,
    isEducator,
    isOpen,
    isStudent,
    profileUrl,
    thumbnailUrl,
    username,
    onClick,
    onClickLogout,
    onClose
}) => (
    <div className="account-nav">
        <a
            className={classNames([
                'ignore-react-onclickoutside',
                'user-info',
                {open: isOpen}
            ])}
            href="#"
            onClick={onClick}
        >
            <Avatar
                alt=""
                src={thumbnailUrl}
            />
            <span className="profile-name">
                {username}
            </span>
        </a>
        <Dropdown
            as="ul"
            className={process.env.SCRATCH_ENV}
            isOpen={isOpen}
            onRequestClose={onClose}
        >
            <li>
                <a href={profileUrl}>
                    <FormattedMessage id="general.profile" />
                </a>
            </li>
            <li>
                <a href="/mystuff/">
                    <FormattedMessage id="general.myStuff" />
                </a>
            </li>
            {isEducator ? [
                <li key="my-classes-li">
                    <a href="/educators/classes/">
                        <FormattedMessage id="general.myClasses" />
                    </a>
                </li>
            ] : []}
            {isStudent ? [
                <li key="my-class-li">
                    <a href={`/classes/${classroomId}/`}>
                        <FormattedMessage id="general.myClass" />
                    </a>
                </li>
            ] : []}
            <li>
                <a href="/accounts/settings/">
                    <FormattedMessage id="general.accountSettings" />
                </a>
            </li>
            <li className="divider">
                <a
                    href="#"
                    onClick={onClickLogout}
                >
                    <FormattedMessage id="navigation.signOut" />
                </a>
            </li>
        </Dropdown>
    </div>
);

AccountNav.propTypes = {
    classroomId: PropTypes.string,
    isEducator: PropTypes.bool,
    isOpen: PropTypes.bool,
    isStudent: PropTypes.bool,
    onClick: PropTypes.func,
    onClickLogout: PropTypes.func,
    onClose: PropTypes.func,
    profileUrl: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    username: PropTypes.string
};

module.exports = injectIntl(AccountNav);
