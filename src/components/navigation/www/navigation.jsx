import classNames from 'classnames';
import {connect} from 'react-redux';
import React from 'react';
import ReactIntl from 'react-intl';
var FormattedMessage = ReactIntl.FormattedMessage;
var injectIntl = ReactIntl.injectIntl;

import messageCountActions from '../../../redux/message-count.js';
import sessionActions from '../../../redux/session.js;

import api from '../../../lib/api';
import Avatar from '../../avatar/avatar.jsx';
import Button from '../../forms/button.jsx';
import Dropdown from '../../dropdown/dropdown.jsx';
import Form from '../../forms/form.jsx';
import Input from '../../forms/input.jsx';
import log from '../../../lib/log.js';
import Login from '../../login/login.jsx';
import Modal from '../../modal/base/modal.jsx';
import NavigationBox from '../base/navigation.jsx';
import Registration from '../../registration/registration.jsx';

require('./navigation.scss');

var Navigation = React.createClass({
    type: 'Navigation',
    getInitialState: function () {
        return {
            accountNavOpen: false,
            canceledDeletionOpen: false,
            loginOpen: false,
            loginError: null,
            registrationOpen: false,
            messageCountIntervalId: -1 // javascript method interval id for getting messsage count.
        };
    },
    getDefaultProps: function () {
        return {
            session: {},
            unreadMessageCount: 0, // bubble number to display how many notifications someone has.
            searchTerm: ''
        };
    },
    componentDidMount: function () {
        if (this.props.session.session.user) {
            var intervalId = setInterval(function () {
                this.props.dispatch(messageCountActions.getCount(this.props.session.session.user.username));
            }.bind(this), 120000); // check for new messages every 2 mins.
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
                var intervalId = setInterval(function () {
                    this.props.dispatch(messageCountActions.getCount(this.props.session.session.user.username));
                }.bind(this), 120000); // check for new messages every 2 mins.
                this.setState({'messageCountIntervalId': intervalId});
            } else {
                // clear message count check, and set to default id.
                clearInterval(this.state.messageCountIntervalId);
                this.props.dispatch(messageCountActions.setCount(0));
                this.setState({
                    'messageCountIntervalId': -1
                });
            }
        }
    },
    componentWillUnmount: function () {
        // clear message interval if it exists
        if (this.state.messageCountIntervalId != -1) {
            clearInterval(this.state.messageCountIntervalId);
            this.props.dispatch(messageCountActions.setCount(0));
            this.setState({
                'messageCountIntervalId': -1
            });
        }
    },
    getProfileUrl: function () {
        if (!this.props.session.session.user) return;
        return '/users/' + this.props.session.session.user.username + '/';
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
            window.location = '/';
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
    onSearchSubmit: function (formData) {
        window.location.href = '/search/projects?q=' + encodeURIComponent(formData.q);
    },
    render: function () {
        var classes = classNames({
            'logged-in': this.props.session.session.user
        });
        var messageClasses = classNames({
            'message-count': true,
            'show': this.props.unreadMessageCount > 0
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
                        <Form onSubmit={this.onSearchSubmit}>
                            <Button type="submit" className="btn-search" />
                            <Input type="text"
                                   value={this.props.searchTerm}
                                   aria-label={formatMessage({id: 'general.search'})}
                                   placeholder={formatMessage({id: 'general.search'})}
                                   name="q" />
                        </Form>
                    </li>
                    {this.props.session.status === sessionActions.Status.FETCHED ? (
                        this.props.session.session.user ? [
                            <li className="link right messages" key="messages">
                                <a
                                    href="/messages/"
                                    title={formatMessage({id: 'general.messages'})}>

                                    <span className={messageClasses}>{this.props.unreadMessageCount}</span>
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
                                    <span className='profile-name'>
                                        {this.props.session.session.user.username}
                                    </span>
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
                                    <FormattedMessage id="general.joinScratch" />
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
                                    className="ignore-react-onclickoutside"
                                    key="login-link">
                                        <FormattedMessage id="general.signIn" />
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
        permissions: state.permissions,
        unreadMessageCount: state.messageCount.messageCount,
        searchTerm: state.navigation
    };
};

var ConnectedNavigation = connect(mapStateToProps)(Navigation);

export default injectIntl(ConnectedNavigation);
