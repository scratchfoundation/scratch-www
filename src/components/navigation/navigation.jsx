var classNames = require('classnames');
var React = require('react');
var ReactIntl = require('react-intl');
var defineMessages = ReactIntl.defineMessages;
var FormattedMessage = ReactIntl.FormattedMessage;
var injectIntl = ReactIntl.injectIntl;

var Api = require('../../mixins/api.jsx');
var Avatar = require('../avatar/avatar.jsx');
var Dropdown = require('./dropdown.jsx');
var Input = require('../forms/input.jsx');
var log = require('../../lib/log.js');
var Login = require('../login/login.jsx');
var Modal = require('../modal/modal.jsx');
var Registration = require('../registration/registration.jsx');
var Session = require('../../mixins/session.jsx');

require('./navigation.scss');

Modal.setAppElement(document.getElementById('view'));

var defaultMessages = defineMessages({
    messages: {
        id: 'general.messages',
        defaultMessage: 'Messages'
    },
    myStuff: {
        id: 'general.myStuff',
        defaultMessage: 'My Stuff'
    },
    search: {
        id: 'general.search',
        defaultMessage: 'Search'
    }
});

var Navigation = React.createClass({
    type: 'Navigation',
    mixins: [
        Api,
        Session
    ],
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
    componentDidMount: function () {
        if (this.state.session.user) {
            this.getMessageCount();
            var intervalId = setInterval(this.getMessageCount, 120000); // check for new messages every 2 mins.
            this.setState({'messageCountIntervalId': intervalId});
        }
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (prevState.session.user != this.state.session.user) {
            this.setState({
                'loginOpen': false,
                'accountNavOpen': false
            });
            if (this.state.session.user) {
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
        if (!this.state.session.user) return;
        return '/users/' + this.state.session.user.username + '/';
    },
    getMessageCount: function () {
        this.api({
            method: 'get',
            uri: '/users/' + this.state.session.user.username + '/messages/count'
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
        this.api({
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
                    window.refreshSession();
                }
            }
            // JS error already logged by api mixin
            callback();
        }.bind(this));
    },
    handleLogOut: function (e) {
        e.preventDefault();
        this.api({
            host: '',
            method: 'post',
            uri: '/accounts/logout/',
            useCsrf: true
        }, function (err) {
            if (err) log.error(err);
            this.closeLogin();
            window.refreshSession();
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
        window.refreshSession();
        this.closeRegistration();
    },
    render: function () {
        var classes = classNames({
            'inner': true,
            'logged-in': this.state.session.user
        });
        var messageClasses = classNames({
            'messageCount': true,
            'show': this.state.unreadMessageCount > 0
        });
        var formatMessage = this.props.intl.formatMessage;
        return (
            <div className={classes}>
                <ul>
                    <li className="logo"><a href="/" aria-label="Scratch"></a></li>

                    <li className="link create">
                        <a href="/projects/editor">
                            <FormattedMessage
                                id="general.create"
                                defaultMessage={'Create'} />
                        </a>
                    </li>
                    <li className="link explore">
                        <a href="/explore?date=this_month">
                            <FormattedMessage
                                id="general.explore"
                                defaultMessage={'Explore'} />
                        </a>
                    </li>
                    <li className="link discuss">
                        <a href="/discuss">
                            <FormattedMessage
                                id="general.discuss"
                                defaultMessage={'Discuss'} />
                        </a>
                    </li>
                    <li className="link about">
                        <a href="/about">
                            <FormattedMessage
                                id="general.about"
                                defaultMessage={'About'} />
                        </a>
                    </li>
                    <li className="link help">
                        <a href="/help">
                            <FormattedMessage
                                id="general.help"
                                defaultMessage={'Help'} />
                        </a>
                    </li>

                    <li className="search">
                        <form action="/search/google_results" method="get">
                            <Input type="submit" value="" />
                            <Input type="text"
                                   aria-label={formatMessage(defaultMessages.search)}
                                   placeholder={formatMessage(defaultMessages.search)}
                                   name="q" />
                            <Input type="hidden" name="date" value="anytime" />
                            <Input type="hidden" name="sort_by" value="datetime_shared" />
                        </form>
                    </li>
                    {this.state.session.user ? [
                        <li className="link right messages" key="messages">
                            <a
                                href="/messages/"
                                title={formatMessage(defaultMessages.messages)}>

                                <span className={messageClasses}>{this.state.unreadMessageCount}</span>
                                <FormattedMessage {...defaultMessages.messages} />
                            </a>
                        </li>,
                        <li className="link right mystuff" key="mystuff">
                            <a
                                href="/mystuff/"
                                title={formatMessage(defaultMessages.myStuff)}>

                                <FormattedMessage {...defaultMessages.myStuff} />
                            </a>
                        </li>,
                        <li className="link right account-nav" key="account-nav">
                            <a className="userInfo" href="#" onClick={this.handleAccountNavClick}>
                                <Avatar src={this.state.session.user.thumbnailUrl} alt="" />
                                {this.state.session.user.username}
                            </a>
                            <Dropdown
                                    as="ul"
                                    isOpen={this.state.accountNavOpen}
                                    onRequestClose={this.closeAccountNav}>
                                <li>
                                    <a href={this.getProfileUrl()}>
                                        <FormattedMessage
                                            id='general.profile'
                                            defaultMessage={'Profile'} />
                                    </a>
                                </li>
                                <li>
                                    <a href="/mystuff/">
                                        <FormattedMessage {...defaultMessages.myStuff} />
                                    </a>
                                </li>
                                {this.state.session.permissions.educator ? [
                                    <li>
                                        <a href="/educators/classes/">
                                            <FormattedMessage
                                                id='general.myClasses'
                                                defaultMessage={'My Classes'} />
                                        </a>
                                    </li>
                                ] : []}
                                <li>
                                    <a href="/accounts/settings/">
                                        <FormattedMessage
                                            id='general.accountSettings'
                                            defaultMessage={'Account settings'} />
                                    </a>
                                </li>
                                <li className="divider">
                                    <a href="#" onClick={this.handleLogOut}>
                                        <FormattedMessage
                                            id='navigation.signOut'
                                            defaultMessage={'Sign out'} />
                                    </a>
                                </li>
                            </Dropdown>
                        </li>
                    ] : [
                        <li className="link right join" key="join">
                            <a href="#" onClick={this.handleJoinClick}>
                                <FormattedMessage
                                    id='general.joinScratch'
                                    defaultMessage={'Join Scratch'} />
                            </a>
                        </li>,
                        <Registration
                                key="registration"
                                isOpen={this.state.registrationOpen}
                                onRequestClose={this.closeRegistration}
                                onRegistrationDone={this.completeRegistration} />,
                        <li className="link right login-item" key="login">
                            <a
                                href="#"
                                onClick={this.handleLoginClick}
                                className="ignore-react-onclickoutside">
                                    <FormattedMessage
                                        id='general.signIn'
                                        defaultMessage={'Sign In'} />
                                </a>
                            <Dropdown
                                    className="login-dropdown with-arrow"
                                    isOpen={this.state.loginOpen}
                                    onRequestClose={this.closeLogin}>
                                <Login
                                    onLogIn={this.handleLogIn}
                                    error={this.state.loginError} />
                            </Dropdown>
                        </li>
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
            </div>
        );
    }
});

module.exports = injectIntl(Navigation);
