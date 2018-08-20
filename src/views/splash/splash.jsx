const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const api = require('../../lib/api');
const log = require('../../lib/log');
const render = require('../../lib/render.jsx');
const sessionActions = require('../../redux/session.js');
const splashActions = require('../../redux/splash.js');

const Page = require('../../components/page/www/page.jsx');
const SplashPresentation = require('./presentation.jsx');

class Splash extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getNews',
            'getProjectCount',
            'handleRefreshHomepageCache',
            'getHomepageRefreshStatus',
            'handleShowEmailConfirmationModal',
            'handleHideEmailConfirmationModal',
            'handleDismiss',
            'shouldShowWelcome',
            'shouldShowEmailConfirmation'
        ]);
        this.state = {
            projectCount: 30000000, // gets the shared project count
            news: [], // gets news posts from the scratch Tumblr
            emailConfirmationModalOpen: false, // flag that determines whether to show banner to request email conf.
            refreshCacheStatus: 'notrequested'
        };
    }
    componentDidMount () {
        this.props.getFeaturedGlobal();
        if (this.props.user.username) {
            this.props.getActivity(this.props.user.username, this.props.user.token);
            this.props.getSharedByFollowing(this.props.user.username, this.props.user.token);
            this.props.getInStudiosFollowing(this.props.user.username, this.props.user.token);
            this.props.getLovedByFollowing(this.props.user.username, this.props.user.token);
            this.getNews();
        } else {
            this.getProjectCount();
        }
    }
    componentDidUpdate (prevProps) {
        if (this.props.user.username !== prevProps.user.username) {
            if (this.props.user.username) {
                this.props.getActivity(this.props.user.username, this.props.user.token);
                this.props.getSharedByFollowing(this.props.user.username, this.props.user.token);
                this.props.getInStudiosFollowing(this.props.user.username, this.props.user.token);
                this.props.getLovedByFollowing(this.props.user.username, this.props.user.token);
                this.getNews();
            } else {
                this.props.setRows('shared', []);
                this.props.setRows('loved', []);
                this.props.setRows('studios', []);
                this.props.setRows('activity', []);
                this.setState({news: []}); // eslint-disable-line react/no-did-update-set-state
                this.getProjectCount();
            }
            if (this.shouldShowEmailConfirmation()) {
                window.addEventListener('message', this.onMessage);
            } else {
                window.removeEventListener('message', this.onMessage);
            }
        }
    }
    getNews () {
        api({
            uri: '/news?limit=3'
        }, (err, body) => {
            if (!body) return log.error('No response body');
            if (!err) return this.setState({news: body});
        });
    }
    getProjectCount () {
        api({
            uri: '/projects/count/all'
        }, (err, body) => {
            if (!body) return log.error('No response body');
            if (!err) return this.setState({projectCount: body.count});
        });
    }
    handleRefreshHomepageCache () {
        api({
            host: '',
            uri: '/scratch_admin/homepage/clear-cache/',
            method: 'post',
            useCsrf: true
        }, (err, body) => {
            if (err) return this.setState({refreshCacheStatus: 'fail'});
            if (!body) return log.error('No response body');
            if (!body.success) return this.setState({refreshCacheStatus: 'inprogress'});
            return this.setState({refreshCacheStatus: 'pass'});
        });
    }
    getHomepageRefreshStatus () {
        const status = {
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
        } else if (this.state.refreshCacheStatus === 'fail') {
            status.disabled = false;
            status.content = 'Error';
        }
        return status;
    }
    handleShowEmailConfirmationModal () {
        this.setState({emailConfirmationModalOpen: true});
    }
    handleHideEmailConfirmationModal () {
        this.setState({emailConfirmationModalOpen: false});
    }
    handleDismiss (cue) {
        api({
            host: '',
            uri: '/site-api/users/set-template-cue/',
            method: 'post',
            useCsrf: true,
            json: {cue: cue, value: false}
        }, err => {
            if (!err) this.props.refreshSession();
        });
    }
    shouldShowWelcome () {
        if (!this.props.user || !this.props.flags.show_welcome) return false;
        return (
            new Date(this.props.user.dateJoined) >
            new Date(new Date() - (2 * 7 * 24 * 60 * 60 * 1000)) // Two weeks ago
        );
    }
    shouldShowEmailConfirmation () {
        return (
            this.props.user && this.props.flags.has_outstanding_email_confirmation &&
            this.props.flags.confirm_email_banner
        );
    }
    render () {
        const showEmailConfirmation = this.shouldShowEmailConfirmation() || false;
        const showWelcome = this.shouldShowWelcome();
        const homepageRefreshStatus = this.getHomepageRefreshStatus();

        return (
            <SplashPresentation
                activity={this.props.activity}
                emailConfirmationModalOpen={this.state.emailConfirmationModalOpen}
                featuredGlobal={this.props.featured}
                inStudiosFollowing={this.props.studios}
                isAdmin={this.props.isAdmin}
                isEducator={this.props.isEducator}
                lovedByFollowing={this.props.loved}
                news={this.state.news}
                projectCount={this.state.projectCount}
                refreshCacheStatus={homepageRefreshStatus}
                sessionStatus={this.props.sessionStatus}
                sharedByFollowing={this.props.shared}
                shouldShowEmailConfirmation={showEmailConfirmation}
                shouldShowWelcome={showWelcome}
                user={this.props.user}
                onDismiss={this.handleDismiss}
                onHideEmailConfirmationModal={this.handleHideEmailConfirmationModal}
                onRefreshHomepageCache={this.handleRefreshHomepageCache}
                onShowEmailConfirmationModal={this.handleShowEmailConfirmationModal}
            />
        );
    }
}

Splash.propTypes = {
    activity: PropTypes.arrayOf(PropTypes.object).isRequired,
    featured: PropTypes.shape({
        community_featured_projects: PropTypes.array,
        community_featured_studios: PropTypes.array,
        curator_top_projects: PropTypes.array,
        scratch_design_studio: PropTypes.array,
        community_most_remixed_projects: PropTypes.array,
        community_most_loved_projects: PropTypes.array
    }),
    flags: PropTypes.shape({
        must_reset_password: PropTypes.bool,
        must_complete_registration: PropTypes.bool,
        has_outstanding_email_confirmation: PropTypes.bool,
        show_welcome: PropTypes.bool,
        confirm_email_banner: PropTypes.bool,
        unsupported_browser_banner: PropTypes.bool
    }),
    getActivity: PropTypes.func.isRequired,
    getFeaturedGlobal: PropTypes.func.isRequired,
    getInStudiosFollowing: PropTypes.func.isRequired,
    getLovedByFollowing: PropTypes.func.isRequired,
    getSharedByFollowing: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
    isEducator: PropTypes.bool,
    loved: PropTypes.arrayOf(PropTypes.object).isRequired,
    refreshSession: PropTypes.func.isRequired,
    sessionStatus: PropTypes.string,
    setRows: PropTypes.func.isRequired,
    shared: PropTypes.arrayOf(PropTypes.object).isRequired,
    studios: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.shape({
        id: PropTypes.number,
        banned: PropTypes.bool,
        username: PropTypes.string,
        token: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        dateJoined: PropTypes.string,
        email: PropTypes.string,
        classroomId: PropTypes.string
    })
};

Splash.defaultProps = {
    flags: {},
    isAdmin: false,
    isEducator: false,
    sessionStatus: sessionActions.Status.NOT_FETCHED,
    user: {}
};

const mapStateToProps = state => ({
    activity: state.splash.activity.rows,
    featured: state.splash.featured.rows,
    flags: state.session.session.flags,
    isAdmin: state.permissions.admin,
    isEducator: state.permissions.educator,
    loved: state.splash.loved.rows,
    sessionStatus: state.session.status,
    shared: state.splash.shared.rows,
    studios: state.splash.studios.rows,
    user: state.session.session.user
});

const mapDispatchToProps = dispatch => ({
    getFeaturedGlobal: () => {
        dispatch(splashActions.getFeaturedGlobal());
    },
    getActivity: (username, token) => {
        dispatch(splashActions.getActivity(username, token));
    },
    getSharedByFollowing: (username, token) => {
        dispatch(splashActions.getSharedByFollowing(username, token));
    },
    getInStudiosFollowing: (username, token) => {
        dispatch(splashActions.getInStudiosFollowing(username, token));
    },
    getLovedByFollowing: (username, token) => {
        dispatch(splashActions.getLovedByFollowing(username, token));
    },
    refreshSession: () => {
        dispatch(sessionActions.refreshSession());
    },
    setRows: (type, rows) => {
        dispatch(splashActions.setRows(type, rows));
    }
});

const ConnectedSplash = connect(
    mapStateToProps,
    mapDispatchToProps
)(Splash);

render(
    <Page><ConnectedSplash /></Page>,
    document.getElementById('app'),
    {splash: splashActions.splashReducer}
);
