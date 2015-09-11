var React = require('react');

require('./navigation.scss');

var Dropdown = React.createClass({
    mixins: [
        require('react-onclickoutside')
    ],
    propTypes: {
        onRequestClose: React.PropTypes.func,
        isOpen: React.PropTypes.bool
    },
    getDefaultProps: function () {
        return {
            isOpen: false
        };
    },
    handleClickOutside: function () {
        if (this.props.isOpen) {
            this.props.onRequestClose();
        }
    },
    render: function () {
        var className = [
            'dropdown',
            this.props.className,
            this.props.isOpen ? 'open' : ''
        ].join(' ');
        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = React.createClass({
    getInitialState: function () {
        return {
            'loginOpen': false
        };
    },
    handleLoginClick: function (e) {
        e.preventDefault();
        this.setState({'loginOpen': true});
    },
    closeLogin: function () {
        this.setState({'loginOpen': false});
    },
    render: function () {
        return (
            <div className="inner">
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

                    <li className="link right"><a href="/join">Join Scratch</a></li>
                    <li className="link right">
                        <a href="" onClick={this.handleLoginClick}>Sign In</a>
                        <Dropdown
                            className="login"
                            isOpen={this.state.loginOpen}
                            onRequestClose={this.closeLogin}>
                            I'm a dropdown
                        </Dropdown>
                    </li>
                </ul>
            </div>
        );
    }
});
