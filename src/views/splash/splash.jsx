var connect = require('react-redux').connect;
var injectIntl = require('react-intl').injectIntl;
var React = require('react');
var render = require('../../lib/render.jsx');

var permissionsActions = require('../../redux/permissions.js');
var sessionActions = require('../../redux/session.js');
var shuffle = require('../../lib/shuffle.js').shuffle;

var GlobalRows = require('./components/global.jsx');
var CustomRows = require('./components/custom.jsx');
var ShuffledRows = require('./components/shuffled.jsx');
var SplashAdmin = require('./components/admin.jsx');
var ConfirmEmail = require('./components/emailconfirmation.jsx');

var Activity = require('../../components/activity/activity.jsx');
var Intro = require('../../components/intro/intro.jsx');
var News = require('../../components/news/news.jsx');
var Page = require('../../components/page/www/page.jsx');
var TeacherBanner = require('../../components/teacher-banner/teacher-banner.jsx');
var Welcome = require('../../components/welcome/welcome.jsx');

var Api = require('../../mixins/api.jsx');

var View = injectIntl(React.createClass({
    type: 'View',
    mixins: [
        Api
    ],
    getInitialState: function () {
        return {
            projectCount: 14000000, // gets the shared project count
            activity: [], // recent social actions taken by users someone is following
            news: [], // gets news posts from the scratch Tumblr
            featuredCustom: {}, // custom homepage rows, such as "Projects by Scratchers I'm Following"
            featuredGlobal: {}, // global homepage rows, such as "Featured Projects"
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
                this.getActivity();
                this.getFeaturedCustom();
                this.getNews();
            } else {
                this.setState({featuredCustom: []});
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
    componentWillMount: function () {
        // Determine whether to show the teacher banner or not
        this.props.dispatch(permissionsActions.getPermissions());
    },
    componentDidMount: function () {
        this.getFeaturedGlobal();
        if (this.props.session.session.user) {
            this.getActivity();
            this.getFeaturedCustom();
            this.getNews();
        } else {
            this.getProjectCount();
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
    getActivity: function () {
        this.api({
            uri: '/proxy/users/' + this.props.session.session.user.username + '/activity?limit=5'
        }, function (err, body) {
            if (!err) this.setState({activity: body});
        }.bind(this));
    },
    getFeaturedGlobal: function () {
        this.api({
            uri: '/proxy/featured'
        }, function (err, body) {
            if (!err) this.setState({featuredGlobal: body});
        }.bind(this));
    },
    getFeaturedCustom: function () {
        this.api({
            uri: '/proxy/users/' + this.props.session.session.user.id + '/featured'
        }, function (err, body) {
            if (!err) this.setState({featuredCustom: body});
        }.bind(this));
    },
    getNews: function () {
        this.api({
            uri: '/news?limit=3'
        }, function (err, body) {
            if (!err) this.setState({news: body});
        }.bind(this));
    },
    getProjectCount: function () {
        this.api({
            uri: '/projects/count/all'
        }, function (err, body) {
            if (!err) this.setState({projectCount: body.count});
        }.bind(this));
    },
    refreshHomepageCache: function () {
        this.api({
            host: '',
            uri: '/scratch_admin/homepage/clear-cache/',
            method: 'post',
            useCsrf: true
        }, function (err, body) {
            if (err) return this.setState({refreshCacheStatus: 'fail'});
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
        this.api({
            host: '',
            uri: '/site-api/users/set-template-cue/',
            method: 'post',
            useCsrf: true,
            json: {cue: cue, value: false}
        }, function (err) {
            if (!err) this.props.dispatch(sessionActions.refreshSession());
        });
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
        if (this.state.projectCount === this.getInitialState().projectCount) {
            messages['intro.description'] = formatHTMLMessage({id: 'intro.defaultDescription'});
        } else {
            var count = formatNumber(this.state.projectCount);
            messages['intro.description'] = formatHTMLMessage({id: 'intro.description'}, {value: count});
        }

        return (
            <div className="splash">
                {this.shouldShowEmailConfirmation() ? [
                    <ConfirmEmail handleDismiss={this.handleDismiss}
                        emailConfirmationStyle={emailConfirmationStyle}
                        showEmailConfirmationModal={this.showEmailConfirmationModal}
                        hideEmailConfirmationModal={this.hideEmailConfirmationModal}
                        emailConfirmationModalOpen={this.state.emailConfirmationModalOpen}/>
                ] : []}

                {this.props.permissions.educator ? [
                    <TeacherBanner messages={messages} />
                ] : []}
                <div key="inner" className="inner">
                    {this.props.session.status === sessionActions.Status.FETCHED ? (
                        this.props.session.session.user ? [
                            <div key="header" className="splash-header">
                                {this.shouldShowWelcome() ? [
                                    <Welcome key="welcome"
                                             onDismiss={this.handleDismiss.bind(this, 'welcome')}
                                             messages={messages} />
                                ] : [
                                    <Activity key="activity" items={this.state.activity} />
                                ]}
                                <News items={this.state.news} messages={messages} />
                            </div>
                        ] : [
                            <Intro projectCount={this.state.projectCount} messages={messages} key="intro"/>
                        ]) : []
                    }

                    <GlobalRows intl={this.props.intl}
                            featured={this.state.featuredGlobal} />

                    {this.props.session.status === sessionActions.Status.FETCHED ?
                        (this.props.session.session.user ?
                            <CustomRows intl={this.props.intl}
                            featured={this.state.featuredCustom} />
                        : null)
                    : null }

                    <ShuffledRows intl={this.props.intl}
                            topLoved={shuffle(this.state.featuredGlobal.community_most_loved_projects)}
                            topRemixed={shuffle(this.state.featuredGlobal.community_most_remixed_projects)} />

                    <SplashAdmin refreshHomepageCache={this.refreshHomepageCache}
                            homepageCacheState={homepageCacheState}/>
                </div>
            </div>
        );
    }
}));

var mapStateToProps = function (state) {
    return {
        session: state.session,
        permissions: state.permissions
    };
};

var ConnectedSplash = connect(mapStateToProps)(View);

render(<Page><ConnectedSplash /></Page>, document.getElementById('app'));
