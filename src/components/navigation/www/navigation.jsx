const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const connect = require('react-redux').connect;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');

const messageCountActions = require('../../../redux/message-count.js');
const sessionActions = require('../../../redux/session.js');

const api = require('../../../lib/api');
const Button = require('../../forms/button.jsx');
const Dropdown = require('../../dropdown/dropdown.jsx');
const Form = require('../../forms/form.jsx');
const Input = require('../../forms/input.jsx');
const log = require('../../../lib/log.js');
const Login = require('../../login/login.jsx');
const Modal = require('../../modal/base/modal.jsx');
const NavigationBox = require('../base/navigation.jsx');
const Registration = require('../../registration/registration.jsx');
const AccountNav = require('./accountnav.jsx');

require('./navigation.scss');

class Navigation extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getProfileUrl',
            'handleJoinClick',
            'handleLoginClick',
            'handleCloseLogin',
            'handleLogIn',
            'handleLogOut',
            'handleAccountNavClick',
            'handleCloseAccountNav',
            'showCanceledDeletion',
            'handleCloseCanceledDeletion',
            'handleCloseRegistration',
            'handleCompleteRegistration',
            'handleSearchSubmit'
        ]);
        this.state = {
            accountNavOpen: false,
            canceledDeletionOpen: false,
            loginOpen: false,
            loginError: null,
            registrationOpen: false,
            messageCountIntervalId: -1 // javascript method interval id for getting messsage count.
        };
    }
    componentDidMount () {
        if (this.props.session.session.user) {
            const intervalId = setInterval(() => {
                this.props.dispatch(
                    messageCountActions.getCount(this.props.session.session.user.username)
                );
            }, 120000); // check for new messages every 2 mins.
            this.setState({ // eslint-disable-line react/no-did-mount-set-state
                messageCountIntervalId: intervalId
            });
        }
    }
    componentDidUpdate (prevProps) {
        if (prevProps.session.session.user !== this.props.session.session.user) {
            this.setState({ // eslint-disable-line react/no-did-update-set-state
                loginOpen: false,
                accountNavOpen: false
            });
            if (this.props.session.session.user) {
                const intervalId = setInterval(() => {
                    this.props.dispatch(
                        messageCountActions.getCount(this.props.session.session.user.username)
                    );
                }, 120000); // check for new messages every 2 mins.
                this.setState({ // eslint-disable-line react/no-did-update-set-state
                    messageCountIntervalId: intervalId
                });
            } else {
                // clear message count check, and set to default id.
                clearInterval(this.state.messageCountIntervalId);
                this.props.dispatch(messageCountActions.setCount(0));
                this.setState({ // eslint-disable-line react/no-did-update-set-state
                    messageCountIntervalId: -1
                });
            }
        }
    }
    componentWillUnmount () {
        // clear message interval if it exists
        if (this.state.messageCountIntervalId !== -1) {
            clearInterval(this.state.messageCountIntervalId);
            this.props.dispatch(messageCountActions.setCount(0));
            this.setState({
                messageCountIntervalId: -1
            });
        }
    }
    getProfileUrl () {
        if (!this.props.session.session.user) return;
        return `/users/${this.props.session.session.user.username}/`;
    }
    handleJoinClick (e) {
        e.preventDefault();
        this.setState({registrationOpen: true});
    }
    handleLoginClick (e) {
        e.preventDefault();
        this.setState({loginOpen: !this.state.loginOpen});
    }
    handleCloseLogin () {
        this.setState({loginOpen: false});
    }
    handleLogIn (formData, callback) {
        this.setState({loginError: null});
        formData.useMessages = true;
        api({
            method: 'post',
            host: '',
            uri: '/accounts/login/',
            json: formData,
            useCsrf: true
        }, (err, body) => {
            if (err) this.setState({loginError: err.message});
            if (body) {
                body = body[0];
                if (body.success) {
                    this.handleCloseLogin();
                    body.messages.map(message => { // eslint-disable-line array-callback-return
                        if (message.message === 'canceled-deletion') {
                            this.showCanceledDeletion();
                        }
                    });
                    this.props.dispatch(sessionActions.refreshSession());
                } else {
                    if (body.redirect) {
                        window.location = body.redirect;
                    }
                    // Update login error message to a friendlier one if it exists
                    this.setState({loginError: body.msg});
                }
            }
            // JS error already logged by api mixin
            callback();
        });
    }
    handleLogOut (e) {
        e.preventDefault();
        api({
            host: '',
            method: 'post',
            uri: '/accounts/logout/',
            useCsrf: true
        }, err => {
            if (err) log.error(err);
            this.handleCloseLogin();
            window.location = '/';
        });
    }
    handleAccountNavClick (e) {
        e.preventDefault();
        this.setState({accountNavOpen: true});
    }
    handleCloseAccountNav () {
        this.setState({accountNavOpen: false});
    }
    showCanceledDeletion () {
        this.setState({canceledDeletionOpen: true});
    }
    handleCloseCanceledDeletion () {
        this.setState({canceledDeletionOpen: false});
    }
    handleCloseRegistration () {
        this.setState({registrationOpen: false});
    }
    handleCompleteRegistration () {
        this.props.dispatch(sessionActions.refreshSession());
        this.handleCloseRegistration();
    }
    handleSearchSubmit (formData) {
        window.location.href = `/search/projects?q=${encodeURIComponent(formData.q)}`;
    }
    render () {
        const createLink = this.props.session.session.user ? '/projects/editor/' : '/projects/editor/?tip_bar=home';
        return (
            <NavigationBox
                className={classNames({
                    'logged-in': this.props.session.session.user
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
                    <li className="link tips">
                        <a href="/tips">
                            <FormattedMessage id="general.tips" />
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
                                name="q"
                                placeholder={this.props.intl.formatMessage({id: 'general.search'})}
                                type="text"
                                value={this.props.searchTerm}
                            />
                        </Form>
                    </li>
                    {this.props.session.status === sessionActions.Status.FETCHED ? (
                        this.props.session.session.user ? [
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
                                    classroomId={this.props.session.session.user.classroomId}
                                    isEducator={this.props.permissions.educator}
                                    isOpen={this.state.accountNavOpen}
                                    isStudent={this.props.permissions.student}
                                    profileUrl={this.getProfileUrl()}
                                    thumbnailUrl={this.props.session.session.user.thumbnailUrl}
                                    username={this.props.session.session.user.username}
                                    onClick={this.handleAccountNavClick}
                                    onClickLogout={this.handleLogOut}
                                    onClose={this.handleCloseAccountNav}
                                />
                            </li>
                        ] : [
                            <li
                                className="link right join"
                                key="join"
                            >
                                <a
                                    href="#"
                                    onClick={this.handleJoinClick}
                                >
                                    <FormattedMessage id="general.joinScratch" />
                                </a>
                            </li>,
                            <Registration
                                isOpen={this.state.registrationOpen}
                                key="registration"
                                onRegistrationDone={this.handleCompleteRegistration}
                                onRequestClose={this.handleCloseRegistration}
                            />,
                            <li
                                className="link right login-item"
                                key="login"
                            >
                                <a
                                    className="ignore-react-onclickoutside"
                                    href="#"
                                    key="login-link"
                                    onClick={this.handleLoginClick}
                                >
                                    <FormattedMessage id="general.signIn" />
                                </a>
                                <Dropdown
                                    className="login-dropdown with-arrow"
                                    isOpen={this.state.loginOpen}
                                    key="login-dropdown"
                                    onRequestClose={this.handleCloseLogin}
                                >
                                    <Login
                                        error={this.state.loginError}
                                        onLogIn={this.handleLogIn}
                                    />
                                </Dropdown>
                            </li>
                        ]) : []}
                </ul>
                <Modal
                    isOpen={this.state.canceledDeletionOpen}
                    style={{
                        content: {
                            padding: 15
                        }
                    }}
                    onRequestClose={this.handleCloseCanceledDeletion}
                >
                    <h4>Your Account Will Not Be Deleted</h4>
                    <h4><FormattedMessage id="general.noDeletionTitle" /></h4>
                    <p>
                        <FormattedMessage
                            id="general.noDeletionDescription"
                            values={{
                                resetLink: <a href="/accounts/password_reset/">
                                    {this.props.intl.formatMessage({id: 'general.noDeletionLink'})}
                                </a>
                            }}
                        />
                    </p>
                </Modal>
            </NavigationBox>
        );
    }
}

Navigation.propTypes = {
    dispatch: PropTypes.func,
    intl: intlShape,
    permissions: PropTypes.shape({
        admin: PropTypes.bool,
        social: PropTypes.bool,
        educator: PropTypes.bool,
        educator_invitee: PropTypes.bool,
        student: PropTypes.bool
    }),
    searchTerm: PropTypes.string,
    session: PropTypes.shape({
        session: PropTypes.shape({
            user: PropTypes.shape({
                classroomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                thumbnailUrl: PropTypes.string,
                username: PropTypes.string
            })
        }),
        status: PropTypes.string
    }),
    unreadMessageCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Navigation.defaultProps = {
    session: {},
    unreadMessageCount: 0, // bubble number to display how many notifications someone has.
    searchTerm: ''
};

const mapStateToProps = state => ({
    session: state.session,
    permissions: state.permissions,
    unreadMessageCount: state.messageCount.messageCount,
    searchTerm: state.navigation
});

const mapDispatchToProps = () => ({});

const ConnectedNavigation = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);

module.exports = injectIntl(ConnectedNavigation);
