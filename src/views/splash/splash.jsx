var connect = require('react-redux').connect;
var injectIntl = require('react-intl').injectIntl;
var omit = require('lodash.omit');
var React = require('react');

var api = require('../../lib/api');
var render = require('../../lib/render.jsx');
var sessionActions = require('../../redux/session.js');
var shuffle = require('../../lib/shuffle.js').shuffle;

var Activity = require('../../components/activity/activity.jsx');
var AdminPanel = require('../../components/adminpanel/adminpanel.jsx');
var DropdownBanner = require('../../components/dropdown-banner/banner.jsx');
var Box = require('../../components/box/box.jsx');
var Button = require('../../components/forms/button.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var Intro = require('../../components/intro/intro.jsx');
var Modal = require('../../components/modal/modal.jsx');
var News = require('../../components/news/news.jsx');
var Page = require('../../components/page/www/page.jsx');
var TeacherBanner = require('../../components/teacher-banner/teacher-banner.jsx');
var Welcome = require('../../components/welcome/welcome.jsx');

var MediaQuery = require('react-responsive');
var frameless = require('../../lib/frameless');

require('./splash.scss');

var Splash = injectIntl(React.createClass({
    type: 'Splash',
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
        api({
            uri: '/proxy/users/' + this.props.session.session.user.username + '/activity?limit=5'
        }, function (err, body) {
            if (!err) this.setState({activity: body});
        }.bind(this));
    },
    getFeaturedGlobal: function () {
        api({
            uri: '/proxy/featured'
        }, function (err, body) {
            if (!err) this.setState({featuredGlobal: body});
        }.bind(this));
    },
    getFeaturedCustom: function () {
        api({
            uri: '/proxy/users/' + this.props.session.session.user.id + '/featured'
        }, function (err, body) {
            if (!err) this.setState({featuredCustom: body});
        }.bind(this));
    },
    getNews: function () {
        api({
            uri: '/news?limit=3'
        }, function (err, body) {
            if (!err) this.setState({news: body});
        }.bind(this));
    },
    getProjectCount: function () {
        api({
            uri: '/projects/count/all'
        }, function (err, body) {
            if (!err) this.setState({projectCount: body.count});
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
    renderHomepageRows: function () {
        var formatMessage = this.props.intl.formatMessage;

        var rows = [
            <Box
                    title={formatMessage({
                        id: 'splash.featuredProjects',
                        defaultMessage: 'Featured Projects'})}
                    key="community_featured_projects">
                <Carousel items={this.state.featuredGlobal.community_featured_projects} />
            </Box>,
            <Box
                    title={formatMessage({
                        id: 'splash.featuredStudios',
                        defaultMessage: 'Featured Studios'})}
                    key="community_featured_studios">
                <Carousel items={this.state.featuredGlobal.community_featured_studios}
                          settings={{slidesToShow: 4, slidesToScroll: 4, lazyLoad: false}} />
            </Box>
        ];

        if (this.state.featuredGlobal.curator_top_projects &&
            this.state.featuredGlobal.curator_top_projects.length > 4) {

            rows.push(
                <Box
                        key="curator_top_projects"
                        title={
                            'Projects Curated by ' +
                            this.state.featuredGlobal.curator_top_projects[0].curator_name}
                        moreTitle={formatMessage({id: 'general.learnMore', defaultMessage: 'Learn More'})}
                        moreHref="/studios/386359/">
                    <Carousel
                        items={this.state.featuredGlobal.curator_top_projects} />
                </Box>
            );
        }

        if (this.state.featuredGlobal.scratch_design_studio &&
            this.state.featuredGlobal.scratch_design_studio.length > 4) {

            rows.push(
                <Box
                        key="scratch_design_studio"
                        title={
                            formatMessage({
                                id: 'splash.scratchDesignStudioTitle',
                                defaultMessage: 'Scratch Design Studio' })
                            + ' - ' + this.state.featuredGlobal.scratch_design_studio[0].gallery_title}
                        moreTitle={formatMessage({id: 'splash.visitTheStudio', defaultMessage: 'Visit the studio'})}
                        moreHref={'/studios/' + this.state.featuredGlobal.scratch_design_studio[0].gallery_id + '/'}>
                    <Carousel
                        items={this.state.featuredGlobal.scratch_design_studio} />
                </Box>
            );
        }

        if (this.props.session.session.user &&
            this.state.featuredGlobal.community_newest_projects &&
            this.state.featuredGlobal.community_newest_projects.length > 0) {

            rows.push(
                <Box
                        title={
                            formatMessage({
                                id: 'splash.recentlySharedProjects',
                                defaultMessage: 'Recently Shared Projects' })}
                        key="community_newest_projects">
                    <Carousel
                        items={this.state.featuredGlobal.community_newest_projects} />
                </Box>
            );
        }

        if (this.state.featuredCustom.custom_projects_by_following &&
            this.state.featuredCustom.custom_projects_by_following.length > 0) {

            rows.push(
                <Box title={
                            formatMessage({
                                id: 'splash.projectsByScratchersFollowing',
                                defaultMessage: 'Projects by Scratchers I\'m Following'})}
                     key="custom_projects_by_following">

                    <Carousel items={this.state.featuredCustom.custom_projects_by_following} />
                </Box>
            );
        }
        if (this.state.featuredCustom.custom_projects_loved_by_following &&
            this.state.featuredCustom.custom_projects_loved_by_following.length > 0) {

            rows.push(
                <Box title={
                            formatMessage({
                                id: 'splash.projectsLovedByScratchersFollowing',
                                defaultMessage: 'Projects Loved by Scratchers I\'m Following'})}
                     key="custom_projects_loved_by_following">

                    <Carousel items={this.state.featuredCustom.custom_projects_loved_by_following} />
                </Box>
            );
        }

        if (this.state.featuredCustom.custom_projects_in_studios_following &&
            this.state.featuredCustom.custom_projects_in_studios_following.length > 0) {

            rows.push(
                <Box title={
                            formatMessage({
                                id:'splash.projectsInStudiosFollowing',
                                defaultMessage: 'Projects in Studios I\'m Following'})}
                     key="custom_projects_in_studios_following">

                    <Carousel items={this.state.featuredCustom.custom_projects_in_studios_following} />
                </Box>
            );
        }

        rows.push(
            <Box title={
                        formatMessage({
                            id: 'splash.communityRemixing',
                            defaultMessage: 'What the Community is Remixing' })}
                 key="community_most_remixed_projects">

                <Carousel items={shuffle(this.state.featuredGlobal.community_most_remixed_projects)}
                          showRemixes={true} />
            </Box>,
            <Box title={
                        formatMessage({
                            id: 'splash.communityLoving',
                            defaultMessage: 'What the Community is Loving' })}
                 key="community_most_loved_projects">

                <Carousel items={shuffle(this.state.featuredGlobal.community_most_loved_projects)}
                          showLoves={true} />
            </Box>
        );

        return rows;
    },
    render: function () {
        var featured = this.renderHomepageRows();
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
                    <DropdownBanner key="confirmedEmail"
                            className="warning"
                            onRequestDismiss={this.handleDismiss.bind(this, 'confirmed_email')}>
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
                    <TeacherBanner key="teacherbanner" messages={messages} />
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
                            <MediaQuery minWidth={frameless.desktop}>
                                <Intro projectCount={this.state.projectCount} messages={messages} key="intro"/>
                            </MediaQuery>
                        ]) : []
                    }

                    {featured}

                    <AdminPanel>
                        <dt>Tools</dt>
                        <dd>
                            <ul>
                                <li>
                                    <a href="/scratch_admin/tickets">Ticket Queue</a>
                                </li>
                                <li>
                                    <a href="/scratch_admin/ip-search/">IP Search</a>
                                </li>
                                <li>
                                    <a href="/scratch_admin/email-search/">Email Search</a>
                                </li>
                            </ul>
                        </dd>
                        <dt>Homepage Cache</dt>
                        <dd>
                            <ul className="cache-list">
                                <li>
                                    <div className="button-row">
                                        <span>Refresh row data:</span>
                                        <Button onClick={this.refreshHomepageCache}
                                                className={homepageCacheState.status}
                                                disabled={homepageCacheState.disabled}>
                                            <span>{homepageCacheState.content}</span>
                                        </Button>
                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </AdminPanel>
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

var ConnectedSplash = connect(mapStateToProps)(Splash);

render(<Page><ConnectedSplash /></Page>, document.getElementById('app'));
