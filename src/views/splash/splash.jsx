var connect = require('react-redux').connect;
var injectIntl = require('react-intl').injectIntl;
var React = require('react');
var render = require('../../lib/render.jsx');

var shuffle = require('../../lib/shuffle.js').shuffle;
var omit = require('lodash.omit');

var permissions = require('../../redux/permissions.js');
var session = require('../../redux/session.js');
var rows = require('./splash-rows.js');
var activity = require('./activity.js');
var news = require('./news.js');
var projectCount = require('./project-count.js');
var homepageCache = require('./homepage-cache.js');
var templateCue = require('./template-cue.js');

var GlobalRows = require('./global.jsx');
var CustomRows = require('./custom.jsx');
var ShuffledRows = require('./shuffled.jsx');
var SplashAdmin = require('./admin.jsx');
var TeacherBanner = require('./teacher-banner.jsx');

var Modal = require('../../components/modal/modal.jsx');
var DropdownBanner = require('../../components/dropdown-banner/banner.jsx');
var Activity = require('../../components/activity/activity.jsx');
var Intro = require('../../components/intro/intro.jsx');
var News = require('../../components/news/news.jsx');
var Page = require('../../components/page/www/page.jsx');
var Welcome = require('../../components/welcome/welcome.jsx');

var View = injectIntl(React.createClass({
    type: 'View',
    getInitialState: function () {
        return {
            showEmailConfirmationModal: false, // flag that determines whether to show banner to request email conf.
            refreshCacheStatus: 'notrequested'
        };
    },
    getDefaultProps: function () {
        return {
            session: {},
            permissions: {}
        };
    },
    componentDidUpdate: function (prevProps) {
        if (this.props.session.session.user != prevProps.session.session.user) {
            if (this.props.session.session.user) {
                this.props.dispatch(activity.getActivity(this.props.session.session.user.username));
                this.props.dispatch(rows.getCustom(this.props.session.session.user.id));
                this.props.dispatch(news.getNews());
            } else {
                this.props.dispatch(projectCount.getProjectCount());
            }
            if (this.shouldShowEmailConfirmation()) {
                window.addEventListener('message', this.onMessage);
            } else {
                window.removeEventListener('message', this.onMessage);
            }
        }
    },
    componentWillMount: function () {
        // Determine whether to show the teacher banner or not
        this.props.dispatch(permissions.getPermissions());
    },
    componentDidMount: function () {
        this.props.dispatch(rows.getGlobal());
        if (this.props.session.session.user) {
            this.props.dispatch(activity.getActivity(this.props.session.session.user.username));
            this.props.dispatch(rows.getCustom(this.props.session.session.user.id));
            this.props.dispatch(news.getNews());
        } else {
            this.props.dispatch(projectCount.getProjectCount());
        }
        if (this.shouldShowEmailConfirmation()) window.addEventListener('message', this.onMessage);
    },
    componentWillUnmount: function () {
        window.removeEventListener('message', this.onMessage);
    },
    onMessage: function (e) {
        if (e.origin != window.location.origin) return;
        if (e.source != this.refs.emailConfirmationiFrame.contentWindow) return;
        if (e.data == 'resend-done') {
            this.hideEmailConfirmationModal();
        } else {
            var data = JSON.parse(e.data);
            if (data['action'] === 'leave-page') {
                window.location.href = data['uri'];
            }
        }
    },
    getHomepageRefreshStatus: function () {
        var status = {
            status: this.props.homepageCache.status,
            disabled: false,
            content: 'Refresh'
        };
        if (this.props.homepageCache.status === homepageCache.Status.IN_PROGRESS) {
            status.disabled = true;
            status.content = 'In Progress';
        } else if (this.props.homepageCache.status === homepageCache.Status.PASS) {
            status.disabled = true;
            status.content = 'Requested';
        } else if (this.props.homepageCache.status == homepageCache.Status.FAIL) {
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
    shouldShowWelcome: function () {
        if (!this.props.session.session.user || !this.props.session.session.flags.show_welcome) return false;
        return (
            new Date(this.props.session.session.user.dateJoined) >
            new Date(new Date - 2*7*24*60*60*1000) // Two weeks ago
        );
    },
    shouldShowEmailConfirmation: function () {
        return (
            this.props.session.session.user && this.props.session.session.flags.has_outstanding_email_confirmation &&
            this.props.session.session.flags.confirm_email_banner);
    },
    render: function () {
        var emailConfirmationStyle = {width: 500, height: 330, padding: 1};
        var homepageCacheState = this.getHomepageRefreshStatus();

        var formatHTMLMessage = this.props.intl.formatHTMLMessage;
        var formatNumber = this.props.intl.formatNumber;
        var formatMessage = this.props.intl.formatMessage;
        var messages = {
            'general.viewAll': formatMessage({id: 'general.viewAll'}),
            'news.scratchNews': formatMessage({id: 'news.scratchNews'}),
            'welcome.welcomeToScratch': formatMessage({id: 'welcome.welcomeToScratch'}),
            'welcome.learn': formatMessage({id: 'welcome.learn'}),
            'welcome.tryOut': formatMessage({id: 'welcome.tryOut'}),
            'welcome.connect': formatMessage({id: 'welcome.connect'}),
            'intro.aboutScratch': formatMessage({id: 'intro.aboutScratch'}),
            'intro.forEducators': formatMessage({id: 'intro.forEducators'}),
            'intro.forParents': formatMessage({id: 'intro.forParents'}),
            'intro.joinScratch': formatMessage({id: 'intro.joinScratch'}),
            'intro.seeExamples': formatMessage({id: 'intro.seeExamples'}),
            'intro.tagLine': formatHTMLMessage({id: 'intro.tagLine'}),
            'intro.tryItOut': formatMessage({id: 'intro.tryItOut'}),
            'teacherbanner.greeting': formatMessage({id: 'teacherbanner.greeting'}),
            'teacherbanner.subgreeting': formatMessage({id: 'teacherbanner.subgreeting'}),
            'teacherbanner.classesButton': formatMessage({id: 'teacherbanner.classesButton'}),
            'teacherbanner.resourcesButton': formatMessage({id: 'teacherbanner.resourcesButton'}),
            'teacherbanner.faqButton': formatMessage({id: 'teacherbanner.faqButton'})
        };
        if (this.props.projectCount.projectCount === projectCount.getInitialState().projectCount) {
            messages['intro.description'] = formatHTMLMessage({id: 'intro.defaultDescription'});
        } else {
            var count = formatNumber(this.props.projectCount.projectCount);
            messages['intro.description'] = formatHTMLMessage({id: 'intro.description'}, {value: count});
        }

        return (
            <div className="splash">
                {this.shouldShowEmailConfirmation() ? [
                    <DropdownBanner key="confirmedEmail"
                            className="warning"
                            onRequestDismiss={templateCue.handleDismiss('confirmed_email')}>
                        <a href="#" onClick={this.showEmailConfirmationModal}>Confirm your email</a>
                        {' '}to enable sharing.{' '}
                        <a href="/info/faq/#accounts">Having trouble?</a>
                    </DropdownBanner>,
                    <Modal key="emailConfirmationModal"
                           isOpen={this.state.emailConfirmationModalOpen}
                           onRequestClose={this.hideEmailConfirmationModal}
                           style={{content: emailConfirmationStyle}}>
                        <iframe ref="emailConfirmationiFrame"
                                src="/accounts/email_resend_standalone/"
                                {...omit(emailConfirmationStyle, 'padding')} />
                    </Modal>
                ] : []}

                {this.props.permissions.educator ? [
                    <TeacherBanner messages={messages} />
                ] : []}

                <div key="inner" className="inner">
                    {this.props.session.status === session.Status.FETCHED ? (
                        this.props.session.session.user ? [
                            <div key="header" className="splash-header">
                                {this.shouldShowWelcome() ? [
                                    <Welcome key="welcome"
                                             onDismiss={templateCue.handleDismiss('welcome')}
                                             messages={messages} />
                                ] : [
                                    <Activity key="activity" items={this.props.activity.activity} />
                                ]}
                                <News items={this.props.news.news} messages={messages} />
                            </div>
                        ] : [
                            <Intro projectCount={this.props.projectCount.projectCount} messages={messages} key="intro"/>
                        ]) : []
                    }

                    <GlobalRows intl={this.props.intl}
                            featured={this.props.rows.global} />
                    <CustomRows intl={this.props.intl}
                    featured={this.props.rows.custom} />

                    <ShuffledRows intl={this.props.intl}
                            topLoved={shuffle(this.props.rows.global.community_most_loved_projects)}
                            topRemixed={shuffle(this.props.rows.global.community_most_remixed_projects)}/>

                    <SplashAdmin refreshHomepageCache={homepageCache.refreshHomepageCache}
                        homepageCacheState={homepageCacheState}/>
                </div>
            </div>
        );
    }
}));

var mapStateToProps = function (state) {
    return {
        session: state.session,
        permissions: state.permissions,
        rows: state.rows,
        activity: state.activity,
        news: state.news,
        projectCount: state.projectCount,
        homepageCache: state.homepageCache
    };
};

var ConnectedSplash = connect(mapStateToProps)(View);

var reducers = {
    rows: rows.reducer,
    activity: activity.reducer,
    news: news.reducer,
    projectCount: projectCount.reducer,
    homepageCache: homepageCache.reducer
};

render(<Page><ConnectedSplash /></Page>, document.getElementById('app'), reducers);
