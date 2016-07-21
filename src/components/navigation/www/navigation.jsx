var classNames = require('classnames');
var connect = require('react-redux').connect;
var React = require('react');
var ReactIntl = require('react-intl');
var FormattedMessage = ReactIntl.FormattedMessage;
var injectIntl = ReactIntl.injectIntl;

var sessionActions = require('../../../redux/session.js');

var api = require('../../../lib/api');
var Avatar = require('../../avatar/avatar.jsx');
var Button = require('../../forms/button.jsx');
var Dropdown = require('../../dropdown/dropdown.jsx');
var Input = require('../../forms/input.jsx');
var log = require('../../../lib/log.js');
var Login = require('../../login/login.jsx');
var Modal = require('../../modal/modal.jsx');
var NavigationBox = require('../container/navigation.jsx');
var Registration = require('../../registration/registration.jsx');

require('./navigation.scss');

Modal.setAppElement(document.getElementById('view'));

var Navigation = React.createClass({
    type: 'Navigation',
    getInitialState: function () {
        return {
            accountNavOpen: false,
            canceledDeletionOpen: false,
            loginOpen: false,
            loginError: null,
            registrationOpen: false,
            unreadMessageCount: 0, // bubble number to display how many notifications someone has.
            messageCountIntervalId: -1 // javascript method interval id for getting messsage count.
        };
    },
    getDefaultProps: function () {
        return {
            session: {}
        };
    },
    componentDidMount: function () {
        if (this.props.session.session.user) {
            this.getMessageCount();
            var intervalId = setInterval(this.getMessageCount, 120000); // check for new messages every 2 mins.
            this.setState({'messageCountIntervalId': intervalId});
        }
    },
    componentDidUpdate: function (prevProps) {
        if (prevProps.session.session.user != this.props.session.session.user) {
            this.setState({
                'loginOpen': false,
                'accountNavOpen': false
            });
            if (this.props.session.session.user) {
                this.getMessageCount();
                var intervalId = setInterval(this.getMessageCount, 120000);
                this.setState({'messageCountIntervalId': intervalId});
            } else {
                // clear message count check, and set to default id.
                clearInterval(this.state.messageCountIntervalId);
                this.setState({
                    'unreadMessageCount': 0,
                    'messageCountIntervalId': -1
                });
            }
        }
    },
    componentWillUnmount: function () {
        // clear message interval if it exists
        if (this.state.messageCountIntervalId != -1) {
            clearInterval(this.state.messageCountIntervalId);
            this.setState({
                'unreadMessageCount': 0,
                'messageCountIntervalId': -1
            });
        }
    },
    getProfileUrl: function () {
        if (!this.props.session.session.user) return;
        return '/users/' + this.props.session.session.user.username + '/';
    },
    getMessageCount: function () {
        api({
            method: 'get',
            uri: '/users/' + this.props.session.session.user.username + '/messages/count'
        }, function (err, body) {
            if (err) return this.setState({'unreadMessageCount': 0});
            if (body) {
                var count = parseInt(body.count, 10);
                return this.setState({'unreadMessageCount': count});
            }
        }.bind(this));
    },
    handleJoinClick: function (e) {
        e.preventDefault();
        this.setState({'registrationOpen': true});
    },
    handleLoginClick: function (e) {
        e.preventDefault();
        this.setState({'loginOpen': !this.state.loginOpen});
    },
    closeLogin: function () {
        this.setState({'loginOpen': false});
    },
    handleLogIn: function (formData, callback) {
        this.setState({'loginError': null});
        formData['useMessages'] = true;
        api({
            method: 'post',
            host: '',
            uri: '/accounts/login/',
            json: formData,
            useCsrf: true
        }, function (err, body) {
            if (err) this.setState({'loginError': err.message});
            if (body) {
                body = body[0];
                if (!body.success) {
                    if (body.redirect) {
                        window.location = body.redirect;
                    }
                    // Update login error message to a friendlier one if it exists
                    this.setState({'loginError': body.msg});
                } else {
                    this.closeLogin();
                    body.messages.map(function (message) {
                        if (message.message == 'canceled-deletion') {
                            this.showCanceledDeletion();
                        }
                    }.bind(this));
                    this.props.dispatch(sessionActions.refreshSession());
                }
            }
            // JS error already logged by api mixin
            callback();
        }.bind(this));
    },
    handleLogOut: function (e) {
        e.preventDefault();
        api({
            host: '',
            method: 'post',
            uri: '/accounts/logout/',
            useCsrf: true
        }, function (err) {
            if (err) log.error(err);
            this.closeLogin();
            this.props.dispatch(sessionActions.refreshSession());
        }.bind(this));
    },
    handleAccountNavClick: function (e) {
        e.preventDefault();
        this.setState({'accountNavOpen': true});
    },
    closeAccountNav: function () {
        this.setState({'accountNavOpen': false});
    },
    showCanceledDeletion: function () {
        this.setState({'canceledDeletionOpen': true});
    },
    closeCanceledDeletion: function () {
        this.setState({'canceledDeletionOpen': false});
    },
    closeRegistration: function () {
        this.setState({'registrationOpen': false});
    },
    completeRegistration: function () {
        this.props.dispatch(sessionActions.refreshSession());
        this.closeRegistration();
    },
    render: function () {
        var classes = classNames({
            'logged-in': this.props.session.session.user
        });
        var messageClasses = classNames({
            'message-count': true,
            'show': this.state.unreadMessageCount > 0
        });
        var dropdownClasses = classNames({
            'user-info': true,
            'open': this.state.accountNavOpen
        });
        var formatMessage = this.props.intl.formatMessage;
        var createLink = this.props.session.session.user ? '/projects/editor/' : '/projects/editor/?tip_bar=home';
        return (
            <NavigationBox className={classes}>
                <ul>
                    <li className="logo"><a href="/" aria-label="Scratch"></a></li>

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
                    <li className="link discuss">
                        <a href="/discuss">
                            <FormattedMessage id="general.discuss" />
                        </a>
                    </li>
                    <li className="link about">
                        <a href="/about">
                            <FormattedMessage id="general.about" />
                        </a>
                    </li>
                    <li className="link help">
                        <a href="/help">
                            <FormattedMessage id="general.help" />
                        </a>
                    </li>

                    <li className="search">
                        <form action="/search/projects" method="get">
                            <Button type="submit" className="btn-search" />
                            <Input type="text"
                                   aria-label={formatMessage({id: 'general.search'})}
                                   placeholder={formatMessage({id: 'general.search'})}
                                   name="q"
                                   noformsy />
                        </form>
                    </li>
                    {this.props.session.status === sessionActions.Status.FETCHED ? (
                        this.props.session.session.user ? [
                            <li className="link right messages" key="messages">
                                <a
                                    href="/messages/"
                                    title={formatMessage({id: 'general.messages'})}>

                                    <span className={messageClasses}>{this.state.unreadMessageCount}</span>
                                    <FormattedMessage id="general.messages" />
                                </a>
                            </li>,
                            <li className="link right mystuff" key="mystuff">
                                <a
                                    href="/mystuff/"
                                    title={formatMessage({id: 'general.myStuff'})}>

                                    <FormattedMessage id="general.myStuff" />
                                </a>
                            </li>,
                            <li className="link right account-nav" key="account-nav">
                                <a className={dropdownClasses}
                                    href="#" onClick={this.handleAccountNavClick}>
                                    <Avatar src={this.props.session.session.user.thumbnailUrl} alt="" />
                                    {this.props.session.session.user.username}
                                </a>
                                <Dropdown
                                        as="ul"
                                        isOpen={this.state.accountNavOpen}
                                        onRequestClose={this.closeAccountNav}
                                        className={process.env.SCRATCH_ENV}>
                                    <li>
                                        <a href={this.getProfileUrl()}>
                                            <FormattedMessage id="general.profile" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/mystuff/">
                                            <FormattedMessage id="general.myStuff" />
                                        </a>
                                    </li>
                                    {this.props.permissions.educator ? [
                                        <li key="my-classes-li">
                                            <a href="/educators/classes/">
                                                <FormattedMessage id="general.myClasses" />
                                            </a>
                                        </li>
                                    ] : []}
                                    {this.props.permissions.student ? [
                                        <li>
                                            <a href={'/classes/' + this.props.session.session.user.classroomId + '/'}>
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
                                        <a href="#" onClick={this.handleLogOut}>
                                            <FormattedMessage id="navigation.signOut" />
                                        </a>
                                    </li>
                                </Dropdown>
                            </li>
                        ] : [
                            <li className="link right join" key="join">
                                <a href="#" onClick={this.handleJoinClick}>
                                    <FormattedMessage id="general.signUp" />
                                </a>
                            </li>,
                            <Registration
                                    key="registration"
                                    isOpen={this.state.registrationOpen}
                                    onRequestClose={this.closeRegistration}
                                    onRegistrationDone={this.completeRegistration} />,
                            <li className="link login-item" key="login">
                                <a
                                    href="#"
                                    onClick={this.handleLoginClick}
                                    className="ignore-react-onclickoutside"
                                    key="login-link">
                                        <FormattedMessage id="general.logIn" />
                               </a>
                                <Dropdown
                                        className="login-dropdown with-arrow"
                                        isOpen={this.state.loginOpen}
                                        onRequestClose={this.closeLogin}
                                        key="login-dropdown">
                                    <Login
                                        onLogIn={this.handleLogIn}
                                        error={this.state.loginError} />
                                </Dropdown>
                            </li>
                        ]) : [
                        ]}
                </ul>
                <Modal isOpen={this.state.canceledDeletionOpen}
                       onRequestClose={this.closeCanceledDeletion}
                       style={{content:{padding: 15}}}>
                    <h4>Your Account Will Not Be Deleted</h4>
                    <p>
                        Your account was scheduled for deletion but you logged in. Your account has been reactivated.
                        If you didn’t request for your account to be deleted, you should
                        {' '}<a href="/accounts/password_reset/">change your password</a>{' '}
                        to make sure your account is secure.
                    </p>
                </Modal>
            </NavigationBox>
        );
    }
});

var mapStateToProps = function (state) {
    return {
        session: state.session,
        permissions: state.permissions
    };
};

var ConnectedNavigation = connect(mapStateToProps)(Navigation);

module.exports = injectIntl(ConnectedNavigation);
