const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const api = require('../../lib/api');
const log = require('../../lib/log');
const render = require('../../lib/render.jsx');
const sessionActions = require('../../redux/session.js');
const splashActions = require('../../redux/splash.js');
const navigationActions = require('../../redux/navigation.js');

const Page = require('../../components/page/www/page.jsx');
const SplashPresentation = require('./presentation.jsx');
const {injectIntl} = require('react-intl');
const {
    CommunityGuidelinesModal
} = require('../../components/community-guidelines/community-guidelines-modal.jsx');

const SCRATCH_WEEK_START_TIME = 1621224000000; // 2021-05-17 00:00:00 -- No end time for now
// const HOC_START_TIME = 1638144000000; // 2021-11-29 00:00:00 GMT in ms
// const HOC_END_TIME = 1639353600000; // 2021-12-13 00:00:00 GMT in ms

const HOC_START_TIME = 1668574800000; // 2022-11-16 00:00:00 GMT in ms
const HOC_END_TIME = 1670821200000; // 2022-12-12 00:00:00 GMT in ms

const FEATURES_START_TIME = 1687305600000; // 2023-06-21 00:00:00 GMT in ms
const FEATURES_END_TIME = 1688083200000; // 2023-06-30 00:00:00 GMT in ms

class Splash extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getNews',
            'handleRefreshHomepageCache',
            'getHomepageRefreshStatus',
            'handleCommunityGuidelinesReview',
            'handleCloseAdminPanel',
            'handleCloseDonateBanner',
            'handleOpenAdminPanel',
            'handleDismiss',
            'shouldShowWelcome',
            'shouldShowEmailConfirmation'
        ]);
        this.state = {
            adminPanelOpen: false,
            dismissedDonateBanner: false,
            news: [], // gets news posts from the scratch Tumblr
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
        }, (err, body, resp) => {
            if (resp.statusCode !== 200) {
                return log.error(`Unexpected status code ${resp.statusCode} received from news request`);
            }
            if (!body) return log.error('No response body');
            if (!err) return this.setState({news: body});
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
    handleCloseAdminPanel () {
        this.setState({adminPanelOpen: false});
    }
    handleOpenAdminPanel () {
        this.setState({adminPanelOpen: true});
    }
    handleCloseDonateBanner () {
        this.setState({dismissedDonateBanner: true});
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
    handleCommunityGuidelinesReview () {
        this.props.reviewCommunityGuidelines();
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
    shouldShowHOCTopBanner () {
        return (
            this.props.sessionStatus === sessionActions.Status.FETCHED && // done fetching session
            Object.keys(this.props.user).length === 0 && // no user session found
            Date.now() >= HOC_START_TIME &&
            Date.now() < HOC_END_TIME
        );
    }
    shouldShowHOCMiddleBanner () {
        return false; // we did not use this middle banner in last HoC
    }
    shouldShowIntro () {
        return (
            this.props.sessionStatus === sessionActions.Status.FETCHED && // done fetching session
            Object.keys(this.props.user).length === 0 && // no user session found
            !this.shouldShowHOCTopBanner() &&
            !this.shouldShowFeaturesBanner()
        );
    }
    shouldShowDonateBanner () {
        return (
            this.state.dismissedDonateBanner === false &&
            this.props.sessionStatus === sessionActions.Status.FETCHED && // done fetching session
            Object.keys(this.props.user).length === 0 && // no user session found
            Date.now() >= SCRATCH_WEEK_START_TIME
        );
    }
    shouldShowFeaturesBanner () {
        const now = Date.now();
        return now >= FEATURES_START_TIME && now <= FEATURES_END_TIME;
    }
    render () {
        const showDonateBanner = this.shouldShowDonateBanner() || false;
        const showEmailConfirmation = this.shouldShowEmailConfirmation() || false;
        const showFeaturesBanner = this.shouldShowFeaturesBanner();
        const showHOCMiddleBanner = this.shouldShowHOCMiddleBanner() || false;
        const showHOCTopBanner = this.shouldShowHOCTopBanner() || false;
        const showIntro = this.shouldShowIntro() || false;
        const showWelcome = this.shouldShowWelcome();
        const homepageRefreshStatus = this.getHomepageRefreshStatus();
        const userUsesParentEmail = this.props.flags && this.props.flags.with_parent_email;

        const shouldReviewCommunityGuidelines = this.props.shouldReviewCommunityGuidelines;

        return (<>
            <CommunityGuidelinesModal
                isOpen={shouldReviewCommunityGuidelines && this.props.user.id}
                userId={`${this.props.user.id}`}
                onComplete={this.handleCommunityGuidelinesReview}
            />
            <SplashPresentation
                activity={this.props.activity}
                adminPanelOpen={this.state.adminPanelOpen}
                featuredGlobal={this.props.featured}
                inStudiosFollowing={this.props.studios}
                isAdmin={this.props.isAdmin}
                isEducator={this.props.isEducator}
                lovedByFollowing={this.props.loved}
                news={this.state.news}
                permissions={this.props.permissions}
                refreshCacheStatus={homepageRefreshStatus}
                sessionStatus={this.props.sessionStatus}
                sharedByFollowing={this.props.shared}
                shouldShowDonateBanner={showDonateBanner}
                shouldShowEmailConfirmation={showEmailConfirmation}
                shouldShowFeaturesBanner={showFeaturesBanner}
                shouldShowHOCMiddleBanner={showHOCMiddleBanner}
                shouldShowHOCTopBanner={showHOCTopBanner}
                shouldShowIntro={showIntro}
                shouldShowWelcome={showWelcome}
                user={this.props.user}
                userUsesParentEmail={userUsesParentEmail}
                onCloseDonateBanner={this.handleCloseDonateBanner}
                onCloseAdminPanel={this.handleCloseAdminPanel}
                onDismiss={this.handleDismiss}
                onOpenAdminPanel={this.handleOpenAdminPanel}
                onRefreshHomepageCache={this.handleRefreshHomepageCache}
            /></>
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
        unsupported_browser_banner: PropTypes.bool,
        with_parent_email: PropTypes.bool
    }),
    getActivity: PropTypes.func.isRequired,
    getFeaturedGlobal: PropTypes.func.isRequired,
    getInStudiosFollowing: PropTypes.func.isRequired,
    getLovedByFollowing: PropTypes.func.isRequired,
    getSharedByFollowing: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
    isEducator: PropTypes.bool,
    loved: PropTypes.arrayOf(PropTypes.object).isRequired,
    permissions: PropTypes.object,
    refreshSession: PropTypes.func.isRequired,
    reviewCommunityGuidelines: PropTypes.func.isRequired,
    sessionStatus: PropTypes.string,
    setRows: PropTypes.func.isRequired,
    shared: PropTypes.arrayOf(PropTypes.object).isRequired,
    shouldReviewCommunityGuidelines: PropTypes.bool.isRequired,
    studios: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.shape({
        id: PropTypes.number,
        banned: PropTypes.bool,
        vpn_required: PropTypes.bool,
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
    permissions: state.permissions,
    sessionStatus: state.session.status,
    shared: state.splash.shared.rows,
    studios: state.splash.studios.rows,
    user: state.session.session.user,
    shouldReviewCommunityGuidelines: state.navigation.shouldReviewCommunityGuidelines
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
    },
    reviewCommunityGuidelines: () => {
        dispatch(navigationActions.reviewCommunityGuidelines());
    }
});

const IntlConnectedSplash = injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Splash));

render(
    <Page
        showDonorRecognition
    >
        <IntlConnectedSplash />
    </Page>,
    document.getElementById('app'),
    {splash: splashActions.splashReducer}
);
