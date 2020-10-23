const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const connect = require('react-redux').connect;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');

const messageCountActions = require('../../../redux/message-count.js');
const navigationActions = require('../../../redux/navigation.js');
const sessionActions = require('../../../redux/session.js');

const Button = require('../../forms/button.jsx');
const Form = require('../../forms/form.jsx');
const Input = require('../../forms/input.jsx');
const LoginDropdown = require('../../login/login-dropdown.jsx');
const CanceledDeletionModal = require('../../login/canceled-deletion-modal.jsx');
const NavigationBox = require('../base/navigation.jsx');
const Registration = require('../../registration/registration.jsx');
const AccountNav = require('./accountnav.jsx');

require('./navigation.scss');

class Navigation extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getProfileUrl',
            'handleSearchSubmit',
            'pollForMessages'
        ]);
        // Keep the timeout id so we can cancel it (e.g. when we unmount)
        this.messageCountTimeoutId = -1;
    }
    componentDidMount () {
        if (this.props.user) {
            // Setup polling for messages to start in 2 minutes.
            const twoMinInMs = 2 * 60 * 1000;
            this.messageCountTimeoutId = setTimeout(this.pollForMessages.bind(this, twoMinInMs), twoMinInMs);
        }
    }
    componentDidUpdate (prevProps) {
        if (prevProps.user !== this.props.user) {
            this.props.handleCloseAccountNav();
            if (this.props.user) {
                const twoMinInMs = 2 * 60 * 1000;
                this.messageCountTimeoutId = setTimeout(this.pollForMessages.bind(this, twoMinInMs), twoMinInMs);
            } else {
                // Clear message count check, and set to default id.
                if (this.messageCountTimeoutId !== -1) {
                    clearTimeout(this.messageCountTimeoutId);
                }
                this.props.setMessageCount(0);
                this.messageCountTimeoutId = -1;
            }
        }
    }
    componentWillUnmount () {
        // clear message interval if it exists
        if (this.messageCountTimeoutId !== -1) {
            clearTimeout(this.messageCountTimeoutId);
            this.props.setMessageCount(0);
            this.messageCountTimeoutId = -1;
        }
    }
    getProfileUrl () {
        if (!this.props.user) return;
        return `/users/${this.props.user.username}/`;
    }

    pollForMessages (ms) {
        this.props.getMessageCount(this.props.user.username);
        // We only poll if it has been less than 32 minutes.
        // Chances of someone actively using the page for that long without
        // a navigation is low.
        if (ms < 32 * 60 * 1000) { // 32 minutes
            const nextFetch = ms * 2; // exponentially back off next fetch time.
            const timeoutId = setTimeout(() => {
                this.pollForMessages(nextFetch);
            }, nextFetch);
            this.messageCountTimeoutId = timeoutId;
        }
    }

    handleSearchSubmit (formData) {
        let targetUrl = '/search/projects';
        if (formData.q) {
            targetUrl += `?q=${encodeURIComponent(formData.q)}`;
        }
        window.location.href = targetUrl;
    }
    render () {
        const createLink = this.props.user ? '/projects/editor/' : '/projects/editor/?tutorial=getStarted';
        return (
            <NavigationBox
                className={classNames({
                    'logged-in': this.props.user
                })}
            >
                <ul>
                    <li className="logo">
                        <a
                            aria-label="Scratch"
                            href="/"
                        />
                    </li>

                    <li className="link create">
                        <a href={createLink}>
                            <FormattedMessage id="general.create" />
                        </a>
                    </li>
                    <li className="link explore">
                        <a href="/explore/projects/all">
                            <FormattedMessage id="general.explore" />
                        </a>
                    </li>
                    <li className="link ideas">
                        <a href="/ideas">
                            <FormattedMessage id="general.ideas" />
                        </a>
                    </li>
                    <li className="link about">
                        <a href="/about">
                            <FormattedMessage id="general.about" />
                        </a>
                    </li>

                    <li className="search">
                        <Form onSubmit={this.handleSearchSubmit}>
                            <Button
                                className="btn-search"
                                type="submit"
                            />
                            <Input
                                aria-label={this.props.intl.formatMessage({id: 'general.search'})}
                                className="search-input"
                                name="q"
                                placeholder={this.props.intl.formatMessage({id: 'general.search'})}
                                type="text"
                                value={this.props.searchTerm}
                            />
                        </Form>
                    </li>
                    {this.props.session.status === sessionActions.Status.FETCHED ? (
                        this.props.user ? [
                            <li
                                className="link right messages"
                                key="messages"
                            >
                                <a
                                    href="/messages/"
                                    title={this.props.intl.formatMessage({id: 'general.messages'})}
                                >
                                    <span
                                        className={classNames({
                                            'message-count': true,
                                            'show': this.props.unreadMessageCount > 0
                                        })}
                                    >{this.props.unreadMessageCount} </span>
                                    <FormattedMessage id="general.messages" />
                                </a>
                            </li>,
                            <li
                                className="link right mystuff"
                                key="mystuff"
                            >
                                <a
                                    href="/mystuff/"
                                    title={this.props.intl.formatMessage({id: 'general.myStuff'})}
                                >
                                    <FormattedMessage id="general.myStuff" />
                                </a>
                            </li>,
                            <li
                                className="link right account-nav"
                                key="account-nav"
                            >
                                <AccountNav
                                    classroomId={this.props.user.classroomId}
                                    isEducator={this.props.permissions.educator}
                                    isOpen={this.props.accountNavOpen}
                                    isStudent={this.props.permissions.student}
                                    profileUrl={this.getProfileUrl()}
                                    thumbnailUrl={this.props.user.thumbnailUrl}
                                    username={this.props.user.username}
                                    onClick={this.props.handleToggleAccountNav}
                                    onClickLogout={this.props.handleLogOut}
                                    onClose={this.props.handleCloseAccountNav}
                                />
                            </li>
                        ] : [
                            <li
                                className="link right join"
                                key="join"
                            >
                                {/* there's no css class registrationLink -- this is
                                just to make the link findable for testing */}
                                <a
                                    className="registrationLink"
                                    href="#"
                                    onClick={this.props.handleClickRegistration}
                                >
                                    <FormattedMessage id="general.joinScratch" />
                                </a>
                            </li>,
                            <li
                                className="link right login-item"
                                key="login"
                            >
                                <a
                                    className="ignore-react-onclickoutside"
                                    href="#"
                                    key="login-link"
                                    onClick={this.props.handleToggleLoginOpen}
                                >
                                    <FormattedMessage id="general.signIn" />
                                </a>
                                <LoginDropdown
                                    key="login-dropdown"
                                />
                            </li>
                        ]) : []
                    }
                    {this.props.registrationOpen && !this.props.useScratch3Registration && (
                        <Registration
                            key="registration"
                        />
                    )}
                </ul>
                <CanceledDeletionModal />
            </NavigationBox>
        );
    }
}

Navigation.propTypes = {
    accountNavOpen: PropTypes.bool,
    getMessageCount: PropTypes.func,
    handleClickRegistration: PropTypes.func,
    handleCloseAccountNav: PropTypes.func,
    handleLogOut: PropTypes.func,
    handleToggleAccountNav: PropTypes.func,
    handleToggleLoginOpen: PropTypes.func,
    intl: intlShape,
    permissions: PropTypes.shape({
        admin: PropTypes.bool,
        social: PropTypes.bool,
        educator: PropTypes.bool,
        educator_invitee: PropTypes.bool,
        student: PropTypes.bool
    }),
    registrationOpen: PropTypes.bool,
    searchTerm: PropTypes.string,
    session: PropTypes.shape({
        status: PropTypes.string
    }),
    setMessageCount: PropTypes.func,
    unreadMessageCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    useScratch3Registration: PropTypes.bool,
    user: PropTypes.shape({
        classroomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        thumbnailUrl: PropTypes.string,
        username: PropTypes.string
    })
};

Navigation.defaultProps = {
    session: {},
    unreadMessageCount: 0, // bubble number to display how many notifications someone has.
    searchTerm: ''
};

const mapStateToProps = state => ({
    accountNavOpen: state.navigation && state.navigation.accountNavOpen,
    session: state.session,
    permissions: state.permissions,
    registrationOpen: state.navigation.registrationOpen,
    searchTerm: state.navigation.searchTerm,
    unreadMessageCount: state.messageCount.messageCount,
    user: state.session && state.session.session && state.session.session.user,
    useScratch3Registration: state.navigation.useScratch3Registration
});

const mapDispatchToProps = dispatch => ({
    getMessageCount: username => {
        dispatch(messageCountActions.getCount(username));
    },
    handleToggleAccountNav: event => {
        event.preventDefault();
        dispatch(navigationActions.handleToggleAccountNav());
    },
    handleCloseAccountNav: () => {
        dispatch(navigationActions.setAccountNavOpen(false));
    },
    handleClickRegistration: event => {
        event.preventDefault();
        dispatch(navigationActions.handleRegistrationRequested());
    },
    handleLogOut: event => {
        event.preventDefault();
        dispatch(navigationActions.handleLogOut());
    },
    handleToggleLoginOpen: event => {
        event.preventDefault();
        dispatch(navigationActions.toggleLoginOpen());
    },
    setMessageCount: newCount => {
        dispatch(messageCountActions.setCount(newCount));
    }
});

// Allow incoming props to override redux-provided props. Used to mock in tests.
const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
    {}, stateProps, dispatchProps, ownProps
);

const ConnectedNavigation = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Navigation);

module.exports = injectIntl(ConnectedNavigation);
