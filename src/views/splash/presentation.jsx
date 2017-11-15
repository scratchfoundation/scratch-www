var FormattedMessage = require('react-intl').FormattedMessage;
var injectIntl = require('react-intl').injectIntl;
var React = require('react');

var sessionActions = require('../../redux/session.js');
var shuffle = require('../../lib/shuffle.js').shuffle;

var AdminPanel = require('../../components/adminpanel/adminpanel.jsx');
var DropdownBanner = require('../../components/dropdown-banner/banner.jsx');
var Box = require('../../components/box/box.jsx');
var Button = require('../../components/forms/button.jsx');
var Carousel = require('../../components/carousel/carousel.jsx');
var LegacyCarousel = require('../../components/carousel/legacy-carousel.jsx');
var TopBanner = require('./hoc/top-banner.jsx');
var MiddleBanner = require('./hoc/middle-banner.jsx');
var Intro = require('../../components/intro/intro.jsx');
var IframeModal = require('../../components/modal/iframe/modal.jsx');
var News = require('../../components/news/news.jsx');
var TeacherBanner = require('../../components/teacher-banner/teacher-banner.jsx');
var Welcome = require('../../components/welcome/welcome.jsx');

// Activity Components
var BecomeCuratorMessage = require('./activity-rows/become-manager.jsx');
var BecomeManagerMessage = require('./activity-rows/become-manager.jsx');
var FavoriteProjectMessage = require('./activity-rows/favorite-project.jsx');
var FollowMessage = require('./activity-rows/follow.jsx');
var LoveProjectMessage = require('./activity-rows/love-project.jsx');
var RemixProjectMessage = require('./activity-rows/remix-project.jsx');
var ShareProjectMessage = require('./activity-rows/share-project.jsx');

var MediaQuery = require('react-responsive');
var frameless = require('../../lib/frameless');

require('./splash.scss');

var ActivityList = injectIntl(React.createClass({
    propTypes: {
        items: React.PropTypes.array
    },
    getComponentForMessage: function (message) {
        var key = message.type + '_' + message.id;

        switch (message.type) {
        case 'followuser':
            return <FollowMessage
                key={key}
                followerUsername={message.actor_username}
                followeeId={message.followed_username}
                followDateTime={message.datetime_created}
            />;
        case 'followstudio':
            return <FollowMessage
                key={key}
                followerUsername={message.actor_username}
                followeeId={message.gallery_id}
                followeeTitle={message.title}
                followDateTime={message.datetime_created}
            />;
        case 'loveproject':
            return <LoveProjectMessage
                key={key}
                actorUsername={message.actor_username}
                projectId={message.project_id}
                projectTitle={message.title}
                loveDateTime={message.datetime_created}
            />;
        case 'favoriteproject':
            return <FavoriteProjectMessage
                key={key}
                actorUsername={message.actor_username}
                projectId={message.project_id}
                projectTitle={message.project_title}
                favoriteDateTime={message.datetime_created}
            />;
        case 'remixproject':
            return <RemixProjectMessage
                key={key}
                actorUsername={message.actor_username}
                projectId={message.project_id}
                projectTitle={message.title}
                parentId={message.parent_id}
                parentTitle={message.parent_title}
                remixDate={message.datetime_created}
            />;
        case 'becomecurator':
            return <BecomeCuratorMessage
                key={key}
                actorUsername={message.actor_username}
                studioId={message.gallery_id}
                studioTitle={message.title}
                datetimePromoted={message.datetime_created}
            />;
        case 'becomeownerstudio':
            return <BecomeManagerMessage
                key={key}
                recipientUsername={message.recipient_username}
                studioId={message.gallery_id}
                studioTitle={message.gallery_title}
                datetimePromoted={message.datetime_created}
            />;
        case 'shareproject':
            return <ShareProjectMessage
                key={key}
                actorUsername={message.actor_username}
                projectId={message.project_id}
                projectTitle={message.title}
                loveDateTime={message.datetime_created}
            />;
        }
    },
    render: function () {
        var formatMessage = this.props.intl.formatMessage;
        return (
            <Box
                className="activity"
                title={formatMessage({id: 'general.whatsHappening'})}
            >
                {this.props.items && this.props.items.length > 0 ? [
                    <ul
                        className="activity-ul"
                        key="activity-ul"
                    >
                        {this.props.items.map(function (item) {
                            var profileLink = '/users/' + item.actor_username; + '/';
                            var profileThumbUrl = '//uploads.scratch.mit.edu/users/avatars/' + item.actor_id + '.png';
                            if (item.type === 'becomeownerstudio') {
                                profileLink = '/users/' + item.recipient_username; + '/';
                                profileThumbUrl = '//uploads.scratch.mit.edu/users/avatars/'
                                    + item.recipient_id
                                    + '.png';
                            }

                            return (
                                <li className="activity-li">
                                    <a href={profileLink}>
                                        <img
                                            alt=""
                                            className="activity-img"
                                            src={profileThumbUrl}
                                        />
                                    </a>
                                    {this.getComponentForMessage(item)}
                                </li>
                            );
                        }.bind(this))}
                    </ul>
                ] : [
                    <div className="empty" key="activity-empty">
                        <h4>
                            <FormattedMessage
                                id="activity.seeUpdates"
                                defaultMessage="This is where you will see updates from Scratchers you follow" />
                        </h4>
                        <a href="/studios/146521/">
                            <FormattedMessage
                                id="activity.checkOutScratchers"
                                defaultMessage="Check out some Scratchers you might like to follow" />
                        </a>
                    </div>
                ]}
            </Box>
        );
    }
}));

var SplashPresentation = injectIntl(React.createClass({
    type: 'Splash',
    propTypes: {
        sessionStatus: React.PropTypes.string.isRequired,
        user: React.PropTypes.object.isRequired,
        isEducator: React.PropTypes.bool.isRequired,
        isAdmin: React.PropTypes.bool.isRequired,
        handleDismiss: React.PropTypes.func.isRequired,
        refreshHomepageCache: React.PropTypes.func.isRequired,
        shouldShowEmailConfirmation: React.PropTypes.bool.isRequired,
        emailConfirmationModalOpen: React.PropTypes.bool.isRequired,
        showEmailConfirmationModal: React.PropTypes.func.isRequired,
        hideEmailConfirmationModal: React.PropTypes.func.isRequired,
        shouldShowWelcome: React.PropTypes.bool.isRequired,
        refreshCacheStatus: React.PropTypes.object.isRequired
    },
    getDefaultProps: function () {
        return {
            projectCount: 20000000, // gets the shared project count
            activity: [], // recent social actions taken by users someone is following
            news: [], // gets news posts from the scratch Tumblr
            sharedByFollowing: [], // "Projects by Scratchers I'm Following"
            lovedByFollowing: [], // "Projects Loved by Scratchers I'm Following"
            inStudiosFollowing: [], // "Projects in Studios I'm Following"
            featuredGlobal: {} // global homepage rows, such as "Featured Projects"
        };
    },
    componentDidMount: function () {
        if (this.props.shouldShowEmailConfirmation) window.addEventListener('message', this.onMessage);
    },
    componentWillUnmount: function () {
        window.removeEventListener('message', this.onMessage);
    },
    onMessage: function (e) {
        if (e.origin != window.location.origin) return;
        if (e.source != this.emailConfirmationiFrame.contentWindow) return;
        if (e.data == 'resend-done') {
            this.hideEmailConfirmationModal();
        } else {
            var data = JSON.parse(e.data);
            if (data['action'] === 'leave-page') {
                window.location.href = data['uri'];
            }
        }
    },
    renderHomepageRows: function () {
        var formatMessage = this.props.intl.formatMessage;
        var rows = [
            <Box
                title={formatMessage({id: 'splash.featuredProjects'})}
                key="community_featured_projects"
            >
                <LegacyCarousel items={this.props.featuredGlobal.community_featured_projects} />
            </Box>,
            <Box
                title={formatMessage({id: 'splash.featuredStudios'})}
                key="community_featured_studios"
            >
                <LegacyCarousel
                    items={this.props.featuredGlobal.community_featured_studios}
                    settings={{slidesToShow: 4, slidesToScroll: 4, lazyLoad: false}}
                />
            </Box>
        ];

        if (this.props.featuredGlobal.curator_top_projects &&
            this.props.featuredGlobal.curator_top_projects.length > 4) {

            rows.push(
                <Box
                    key="curator_top_projects"
                    title={
                        formatMessage({id: 'splash.projectsCuratedBy'}) + ' ' +
                        this.props.featuredGlobal.curator_top_projects[0].curator_name}
                    moreTitle={formatMessage({id: 'general.learnMore'})}
                    moreHref="/studios/386359/"
                >
                    <LegacyCarousel items={this.props.featuredGlobal.curator_top_projects} />
                </Box>
            );
        }

        if (this.props.featuredGlobal.scratch_design_studio &&
            this.props.featuredGlobal.scratch_design_studio.length > 4) {

            rows.push(
                <Box
                    key="scratch_design_studio"
                    title={
                        formatMessage({id: 'splash.scratchDesignStudioTitle'})
                        + ' - ' + this.props.featuredGlobal.scratch_design_studio[0].gallery_title}
                    moreTitle={formatMessage({id: 'splash.visitTheStudio'})}
                    moreHref={'/studios/' + this.props.featuredGlobal.scratch_design_studio[0].gallery_id + '/'}
                >
                    <LegacyCarousel items={this.props.featuredGlobal.scratch_design_studio} />
                </Box>
            );
        }

        if (this.props.user &&
            this.props.featuredGlobal.community_newest_projects &&
            this.props.featuredGlobal.community_newest_projects.length > 0) {

            rows.push(
                <Box
                    title={formatMessage({id: 'splash.recentlySharedProjects'})}
                    key="community_newest_projects"
                >
                    <LegacyCarousel items={this.props.featuredGlobal.community_newest_projects} />
                </Box>
            );
        }

        if (this.props.sharedByFollowing && this.props.sharedByFollowing.length > 0) {
            rows.push(
                <Box
                    title={formatMessage({id: 'splash.projectsByScratchersFollowing'})}
                    key="custom_projects_by_following"
                >
                    <Carousel items={this.props.sharedByFollowing} />
                </Box>
            );
        }

        if (this.props.lovedByFollowing && this.props.lovedByFollowing.length > 0) {
            rows.push(
                <Box
                    title={formatMessage({id: 'splash.projectsLovedByScratchersFollowing'})}
                    key="custom_projects_loved_by_following"
                >
                    <Carousel items={this.props.lovedByFollowing} />
                </Box>
            );
        }

        if (this.props.inStudiosFollowing && this.props.inStudiosFollowing.length > 0) {
            rows.push(
                <Box
                    title={formatMessage({id:'splash.projectsInStudiosFollowing'})}
                    key="custom_projects_in_studios_following"
                >
                    <Carousel items={this.props.inStudiosFollowing} />
                </Box>
            );
        }

        rows.push(
            <Box
                title={formatMessage({id: 'splash.communityRemixing'})}
                key="community_most_remixed_projects"
            >
                <LegacyCarousel
                    items={shuffle(this.props.featuredGlobal.community_most_remixed_projects)}
                    showRemixes={true}
                />
            </Box>,
            <Box
                title={formatMessage({id: 'splash.communityLoving'})}
                key="community_most_loved_projects"
            >
                <LegacyCarousel
                    items={shuffle(this.props.featuredGlobal.community_most_loved_projects)}
                    showLoves={true}
                />
            </Box>
        );

        return rows;
    },
    render: function () {
        var featured = this.renderHomepageRows();

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
            'intro.itsFree': formatMessage({id: 'intro.itsFree'}),
            'intro.joinScratch': formatMessage({id: 'intro.joinScratch'}),
            'intro.seeExamples': formatMessage({id: 'intro.seeExamples'}),
            'intro.tagLine': formatHTMLMessage({id: 'intro.tagLine'}),
            'intro.tryItOut': formatMessage({id: 'intro.tryItOut'}),
            'teacherbanner.greeting': formatMessage({id: 'teacherbanner.greeting'}),
            'teacherbanner.subgreeting': formatMessage({id: 'teacherbanner.subgreeting'}),
            'teacherbanner.classesButton': formatMessage({id: 'teacherbanner.classesButton'}),
            'teacherbanner.resourcesButton': formatMessage({id: 'general.resourcesTitle'}),
            'teacherbanner.faqButton': formatMessage({id: 'teacherbanner.faqButton'})
        };
        if (this.props.projectCount === 20000000) {
            messages['intro.description'] = formatHTMLMessage({id: 'intro.defaultDescription'});
        } else {
            var count = formatNumber(this.props.projectCount);
            messages['intro.description'] = formatHTMLMessage({id: 'intro.description'}, {value: count});
        }

        return (
            <div className="splash">
                {this.props.shouldShowEmailConfirmation ? [
                    <DropdownBanner
                        key="confirmedEmail"
                        className="warning"
                        onRequestDismiss={this.props.handleDismiss.bind(this, 'confirmed_email')}
                    >
                        <a href="#" onClick={this.props.showEmailConfirmationModal}>Confirm your email</a>
                        {' '}to enable sharing.{' '}
                        <a href="/info/faq/#accounts">Having trouble?</a>
                    </DropdownBanner>,
                    <IframeModal
                        isOpen={this.props.emailConfirmationModalOpen}
                        onRequestClose={this.props.hideEmailConfirmationModal}
                        className="mod-confirmation"
                        componentRef={
                            function (iframe) {
                                this.emailConfirmationiFrame = iframe;
                            }.bind(this)
                        }
                        src="/accounts/email_resend_standalone/"
                    />
                ] : []}
                {this.props.isEducator ? [
                    <TeacherBanner key="teacherbanner" messages={messages} />
                ] : []}
                <TopBanner loggedIn={this.props.sessionStatus === sessionActions.Status.FETCHED
                    && Object.keys(this.props.user).length !== 0}/>
                <div key="inner" className="inner mod-splash">
                    {this.props.sessionStatus === sessionActions.Status.FETCHED ? (
                        Object.keys(this.props.user).length !== 0 ? [
                            <div key="header" className="splash-header">
                                {this.props.shouldShowWelcome ? [
                                    <Welcome
                                        key="welcome"
                                        onDismiss={this.props.handleDismiss.bind(this, 'welcome')}
                                        messages={messages}
                                    />
                                ] : [
                                    <ActivityList key="activity" items={this.props.activity} />
                                ]}
                                <News items={this.props.news} messages={messages} />
                            </div>
                        ] : [
                            <MediaQuery minWidth={frameless.desktop}>
                                <Intro projectCount={this.props.projectCount} messages={messages} key="intro"/>
                            </MediaQuery>
                        ]) : []
                    }

                    {featured.shift()}
                    {featured.shift()}
                </div>
                <MiddleBanner />
                <div key="inner2" className="inner mod-splash">
                    
                    {featured}

                    {this.props.isAdmin ? [
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
                                            <Button onClick={this.props.refreshHomepageCache}
                                                    className={this.props.refreshCacheStatus.status}
                                                    disabled={this.props.refreshCacheStatus.disabled}>
                                                <span>{this.props.refreshCacheStatus.content}</span>
                                            </Button>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </AdminPanel>
                    ] : []}
                </div>
            </div>
        );
    }
}));

module.exports = SplashPresentation;
