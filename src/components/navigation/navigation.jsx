var React = require('react');
var Login = require('../login/login.jsx');
var Dropdown = require('./dropdown.jsx');

require('./navigation.scss');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'loginOpen': false,
            'loggedIn': false,
            'loggedInUser': {
                'username': 'raimondious',
                'thumbnail': '//cdn2.scratch.mit.edu/get_image/user/2584924_32x32.png'
            },
            'accountNavOpen': false
        };
    },
    handleLoginClick: function (e) {
        e.preventDefault();
        this.setState({'loginOpen': true});
    },
    closeLogin: function () {
        this.setState({'loginOpen': false});
    },
    handleLogIn: function () {
        this.setState({'loggedIn': true});
    },
    handleLogOut: function () {
        this.setState({'loggedIn': false});
    },
    handleClickAccountNav: function () {
        this.setState({'accountNavOpen': true});
    },
    closeAccountNav: function () {
        this.setState({'accountNavOpen': false});
    },
    render: function () {
        var className = [
            'inner',
            this.state.loggedIn ? 'logged-in' : 'logged-out'
        ].join(' ');
        return (
            <div className={className}>
                <ul>
                    <li className="logo"><a href="/"></a></li>
                    
                    <li className="link"><a href="/projects/editor">Create</a></li>
                    <li className="link"><a href="/explore">Explore</a></li>
                    <li className="link"><a href="/discuss">Discuss</a></li>
                    <li className="link"><a href="/about">About</a></li>
                    <li className="link"><a href="/help">Help</a></li>

                    <li className="search">
                        <form action="/search/google_results" method="get">
                            <input type="submit" value="" />
                            <input type="text" placeholder="Search" name="q" />
                            <input type="hidden" name="date" value="anytime" />
                            <input type="hidden" name="sort_by" value="datetime_shared" />
                        </form>
                    </li>
                    {this.state.loggedIn ? [
                        <li className="link right messages"><a href="/messages/" title="Messages">Messages</a></li>,
                        <li className="link right mystuff"><a href="/mystuff/" title="My Stuff">My Stuff</a></li>,
                        <li className="link right account-nav">
                            <a href="#" onClick={this.handleClickAccountNav}>
                                <img src={this.state.loggedInUser.thumbnail} />
                                {this.state.loggedInUser.username}
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
                        <li className="link right join"><a href="/join">Join Scratch</a></li>,
                        <li className="link right">
                            <a href="#" onClick={this.handleLoginClick}>Sign In</a>
                            <Dropdown
                                    className="login-dropdown with-arrow"
                                    isOpen={this.state.loginOpen}
                                    onRequestClose={this.closeLogin}>
                                <Login onLogIn={this.handleLogIn} />
                            </Dropdown>
                        </li>
                    ]}
                </ul>
            </div>
        );
    }
});
