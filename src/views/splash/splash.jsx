var connect = require('react-redux').connect;
var injectIntl = require('react-intl').injectIntl;
var React = require('react');

var api = require('../../lib/api');
var log = require('../../lib/log');
var render = require('../../lib/render.jsx');
var sessionActions = require('../../redux/session.js');

var Page = require('../../components/page/www/page.jsx');
var SplashPresentation = require('./presentation.jsx');

var Splash = injectIntl(React.createClass({
    type: 'Splash',
    getInitialState: function () {
        return {
            projectCount: 20000000, // gets the shared project count
            activity: [], // recent social actions taken by users someone is following
            news: [], // gets news posts from the scratch Tumblr
            sharedByFollowing: [], // "Projects by Scratchers I'm Following"
            lovedByFollowing: [], // "Projects Loved by Scratchers I'm Following"
            inStudiosFollowing: [], // "Projects in Studios I'm Following"
            featuredGlobal: {}, // global homepage rows, such as "Featured Projects"
            emailConfirmationModalOpen: false, // flag that determines whether to show banner to request email conf.
            refreshCacheStatus: 'notrequested'
        };
    },
    getDefaultProps: function () {
        return {
            sessionStatus: sessionActions.Status.NOT_FETCHED,
            user: {},
            flags: {},
            isEducator: false,
            isAdmin: false
        };
    },
    componentDidUpdate: function (prevProps) {
        if (this.props.user != prevProps.user) {
            if (this.props.user) {
                this.getActivity(this.props.user.username);
                this.getSharedByFollowing(this.props.user.token);
                this.getInStudiosFollowing(this.props.user.token);
                this.getLovedByFollowing(this.props.user.token);
                this.getNews();
            } else {
                this.setState({sharedByFollowing: []});
                this.setState({lovedByFollowing: []});
                this.setState({inStudiosFollowing: []});
                this.setState({activity: []});
                this.setState({news: []});
                this.getProjectCount();
            }
            if (this.shouldShowEmailConfirmation()) {
                window.addEventListener('message', this.onMessage);
            } else {
                window.removeEventListener('message', this.onMessage);
            }
        }
    },
    componentDidMount: function () {
        this.getFeaturedGlobal();
        if (this.props.user) {
            this.getActivity(this.props.user.username);
            this.getSharedByFollowing(this.props.user.token);
            this.getInStudiosFollowing(this.props.user.token);
            this.getLovedByFollowing(this.props.user.token);
            this.getNews();
        } else {
            this.getProjectCount();
        }
    },
    getActivity: function (username) {
        api({
            uri: '/proxy/users/' + username + '/activity?limit=5'
        }, function (err, body) {
            if (!body) return log.error('No response body');
            if (!err) return this.setState({activity: body});
        }.bind(this));
    },
    getFeaturedGlobal: function () {
        api({
            uri: '/proxy/featured'
        }, function (err, body) {
            if (!body) return log.error('No response body');
            if (!err) return this.setState({featuredGlobal: body});
        }.bind(this));
    },
    getSharedByFollowing: function (token) {
        api({
            uri: '/projects/following/users',
            authentication: token
        }, function (err, body) {
            if (!body) return log.error('No response body');
            if (!err) return this.setState({sharedByFollowing: body});
        }.bind(this));
    },
    getInStudiosFollowing: function (token) {
        api({
            uri: '/projects/following/studios',
            authentication: token
        }, function (err, body) {
            if (!body) return log.error('No response body');
            if (!err) return this.setState({inStudiosFollowing: body});
        }.bind(this));
    },
    getLovedByFollowing: function (token) {
        api({
            uri: '/projects/following/loves',
            authentication: token
        }, function (err, body) {
            if (!body) return log.error('No response body');
            if (!err) return this.setState({lovedByFollowing: body});
        }.bind(this));
    },
    getNews: function () {
        api({
            uri: '/news?limit=3'
        }, function (err, body) {
            if (!body) return log.error('No response body');
            if (!err) return this.setState({news: body});
        }.bind(this));
    },
    getProjectCount: function () {
        api({
            uri: '/projects/count/all'
        }, function (err, body) {
            if (!body) return log.error('No response body');
            if (!err) return this.setState({projectCount: body.count});
        }.bind(this));
    },
    refreshHomepageCache: function () {
        api({
            host: '',
            uri: '/scratch_admin/homepage/clear-cache/',
            method: 'post',
            useCsrf: true
        }, function (err, body) {
            if (err) return this.setState({refreshCacheStatus: 'fail'});
            if (!body) return log.error('No response body');
            if (!body.success) return this.setState({refreshCacheStatus: 'inprogress'});
            return this.setState({refreshCacheStatus: 'pass'});
        }.bind(this));
    },
    getHomepageRefreshStatus: function () {
        var status = {
            status: this.state.refreshCacheStatus,
            disabled: false,
            content: 'Refresh'
        };
        if (this.state.refreshCacheStatus === 'inprogress') {
            status.disabled = true;
            status.content = 'In Progress';
        } else if (this.state.refreshCacheStatus === 'pass') {
            status.disabled = true;
            status.content = 'Requested';
        } else if (this.state.refreshCacheStatus == 'fail') {
            status.disabled = false;
            status.content = 'Error';
        }
        return status;
    },
    showEmailConfirmationModal: function () {
        this.setState({emailConfirmationModalOpen: true});
    },
    hideEmailConfirmationModal: function () {
        this.setState({emailConfirmationModalOpen: false});
    },
    handleDismiss: function (cue) {
        api({
            host: '',
            uri: '/site-api/users/set-template-cue/',
            method: 'post',
            useCsrf: true,
            json: {cue: cue, value: false}
        }, function (err) {
            if (!err) this.props.dispatch(sessionActions.refreshSession());
        }.bind(this));
    },
    shouldShowWelcome: function () {
        if (!this.props.user || !this.props.flags.show_welcome) return false;
        return (
            new Date(this.props.user.dateJoined) >
            new Date(new Date - 2*7*24*60*60*1000) // Two weeks ago
        );
    },
    shouldShowEmailConfirmation: function () {
        return (
            this.props.user && this.props.flags.has_outstanding_email_confirmation &&
            this.props.flags.confirm_email_banner);
    },
    render: function () {
        var showEmailConfirmation = this.shouldShowEmailConfirmation() || false;
        var showWelcome = this.shouldShowWelcome();
        var homepageRefreshStatus = this.getHomepageRefreshStatus();

        return (
            <SplashPresentation
                sessionStatus={this.props.sessionStatus}
                user={this.props.user}
                isEducator={this.props.isEducator}
                isAdmin={this.props.isAdmin}
                handleDismiss={this.handleDismiss}
                refreshHomepageCache={this.refreshHomepageCache}
                shouldShowEmailConfirmation={showEmailConfirmation}
                emailConfirmationModalOpen={this.state.emailConfirmationModalOpen}
                showEmailConfirmationModal={this.showEmailConfirmationModal}
                hideEmailConfirmationModal={this.hideEmailConfirmationModal}
                shouldShowWelcome={showWelcome}
                projectCount={this.state.projectCount}
                activity={this.state.activity}
                news={this.state.news}
                sharedByFollowing={this.state.sharedByFollowing}
                lovedByFollowing={this.state.lovedByFollowing}
                inStudiosFollowing={this.state.inStudiosFollowing}
                featuredGlobal={this.state.featuredGlobal}
                refreshCacheStatus={homepageRefreshStatus}
            />
        );
    }
}));

var mapStateToProps = function (state) {
    return {
        sessionStatus: state.session.status,
        user: state.session.session.user,
        flags: state.session.session.flags,
        isEducator: state.permissions.educator,
        isAdmin: state.permissions.admin
    };
};

var ConnectedSplash = connect(mapStateToProps)(Splash);

render(<Page><ConnectedSplash /></Page>, document.getElementById('app'));
