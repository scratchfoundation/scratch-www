var React = require('react');
var classNames = require('classnames');
var xhr = require('xhr');

var log = require('../../log.js');

var Api = require('../../mixins/api.jsx');
var Session = require('../../mixins/session.jsx');

var Avatar = require('../avatar/avatar.jsx');
var Dropdown = require('./dropdown.jsx');
var Input = require('../forms/input.jsx');
var Login = require('../login/login.jsx');

require('./navigation.scss');

module.exports = React.createClass({
    mixins: [
        Api,
        Session
    ],
    getInitialState: function () {
        return {
            'loginOpen': false,
            'loginError': null,
            'accountNavOpen': false
        };
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (prevState.session.user != this.state.session.user) {
            this.setState({
                'loginOpen': false,
                'accountNavOpen': false
            });
        }
    },
    handleLoginClick: function (e) {
        e.preventDefault();
        this.setState({'loginOpen': !this.state.loginOpen});
    },
    closeLogin: function () {
        this.setState({'loginOpen': false});
    },
    handleLogIn: function (formData) {
        this.setState({'loginError': null});
        this.api({
            method: 'post',
            uri: '/accounts/login/',
            json: formData,
            useCsrf: true
        }, function (err, body) {
            if (body) {
                body = body[0];
                if (!body.success) {
                    this.setState({'loginError': body.msg});
                } else {
                    this.closeLogin();
                    window.refreshSession();
                }
            }
        }.bind(this));
    },
    handleLogOut: function () {
        xhr({
            uri: '/accounts/logout/'
        }, function (err) {
            if (err) {
                log.error(err);
            } else {
                this.closeLogin();
                window.refreshSession();
            }
        }.bind(this));
    },
    handleClickAccountNav: function () {
        this.setState({'accountNavOpen': true});
    },
    closeAccountNav: function () {
        this.setState({'accountNavOpen': false});
    },
    render: function () {
        var classes = classNames({
            'inner': true,
            'logged-in': this.state.session.user
        });
        return (
            <div className={classes}>
                <ul>
                    <li className="logo"><a href="/"></a></li>
                    
                    <li className="link"><a href="/projects/editor">Create</a></li>
                    <li className="link"><a href="/explore">Explore</a></li>
                    <li className="link"><a href="/discuss">Discuss</a></li>
                    <li className="link"><a href="/about">About</a></li>
                    <li className="link"><a href="/help">Help</a></li>

                    <li className="search">
                        <form action="/search/google_results" method="get">
                            <Input type="submit" value="" />
                            <Input type="text" placeholder="Search" name="q" />
                            <Input type="hidden" name="date" value="anytime" />
                            <Input type="hidden" name="sort_by" value="datetime_shared" />
                        </form>
                    </li>
                    {this.state.session.user ? [
                        <li className="link right messages" key="messages">
                            <a href="/messages/" title="Messages">Messages</a>
                        </li>,
                        <li className="link right mystuff" key="mystuff">
                            <a href="/mystuff/" title="My Stuff">My Stuff</a>
                        </li>,
                        <li className="link right account-nav" key="account-nav">
                            <a className="userInfo" href="#" onClick={this.handleClickAccountNav}>
                                <Avatar src={this.state.session.user.thumbnailUrl} />
                                {this.state.session.user.username}
                            </a>
                            <Dropdown
                                    as="ul"
                                    isOpen={this.state.accountNavOpen}
                                    onRequestClose={this.closeAccountNav}>
                                <li><a href="/users/raimondious/">Profile</a></li>
                                <li><a href="/mystuff/">My Stuff</a></li>
                                <li><a href="/accounts/settings/">Account settings</a></li>
                                <li className="divider">
                                    <a href="#" onClick={this.handleLogOut}>Sign out</a>
                                </li>
                            </Dropdown>
                        </li>
                    ] : [
                        <li className="link right join" key="join"><a href="/join">Join Scratch</a></li>,
                        <li className="link right" key="login">
                            <a
                                href="#"
                                onClick={this.handleLoginClick}
                                className="ignore-react-onclickoutside">Sign In</a>
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
            </div>
        );
    }
});
