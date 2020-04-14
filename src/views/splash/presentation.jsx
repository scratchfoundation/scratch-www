const bindAll = require('lodash.bindall');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const MediaQuery = require('react-responsive').default;
const PropTypes = require('prop-types');
const React = require('react');

const frameless = require('../../lib/frameless');
const sessionActions = require('../../redux/session.js');
const shuffle = require('../../lib/shuffle.js').shuffle;

const AdminPanel = require('../../components/adminpanel/adminpanel.jsx');
const Box = require('../../components/box/box.jsx');
const Button = require('../../components/forms/button.jsx');
const Carousel = require('../../components/carousel/carousel.jsx');
const DropdownBanner = require('../../components/dropdown-banner/banner.jsx');
const IframeModal = require('../../components/modal/iframe/modal.jsx');
const Intro = require('../../components/intro/intro.jsx');
const LegacyCarousel = require('../../components/carousel/legacy-carousel.jsx');
const News = require('../../components/news/news.jsx');
const TeacherBanner = require('../../components/teacher-banner/teacher-banner.jsx');
const Welcome = require('../../components/welcome/welcome.jsx');

// Activity Components
const BecomeCuratorMessage = require('./activity-rows/become-curator.jsx');
const BecomeManagerMessage = require('./activity-rows/become-manager.jsx');
const FavoriteProjectMessage = require('./activity-rows/favorite-project.jsx');
const FollowMessage = require('./activity-rows/follow.jsx');
const LoveProjectMessage = require('./activity-rows/love-project.jsx');
const RemixProjectMessage = require('./activity-rows/remix-project.jsx');
const ShareProjectMessage = require('./activity-rows/share-project.jsx');

// Hour of Code Banner Components
const TopBanner = require('./hoc/top-banner.jsx');
const MiddleBanner = require('./hoc/middle-banner.jsx');

const HOC_START_TIME = 1575262800000; // 2019-12-02 00:00:00
const HOC_END_TIME = 1577077200000; // 2019-12-23 00:00:00

require('./splash.scss');

class ActivityList extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getComponentForMessage'
        ]);
    }
    getComponentForMessage (message) {
        const key = `${message.type}_${message.datetime_created}`;

        switch (message.type) {
        case 'followuser':
            return (
                <FollowMessage
                    followDateTime={message.datetime_created}
                    followeeId={message.followed_username}
                    followerUsername={message.actor_username}
                    key={key}
                />
            );
        case 'followstudio':
            return (
                <FollowMessage
                    followDateTime={message.datetime_created}
                    followeeId={message.gallery_id}
                    followeeTitle={message.title}
                    followerUsername={message.actor_username}
                    key={key}
                />
            );
        case 'loveproject':
            return (
                <LoveProjectMessage
                    actorUsername={message.actor_username}
                    key={key}
                    loveDateTime={message.datetime_created}
                    projectId={message.project_id}
                    projectTitle={message.title}
                />
            );
        case 'favoriteproject':
            return (
                <FavoriteProjectMessage
                    actorUsername={message.actor_username}
                    favoriteDateTime={message.datetime_created}
                    key={key}
                    projectId={message.project_id}
                    projectTitle={message.project_title}
                />
            );
        case 'remixproject':
            return (
                <RemixProjectMessage
                    actorUsername={message.actor_username}
                    key={key}
                    parentId={message.parent_id}
                    parentTitle={message.parent_title}
                    projectId={message.project_id}
                    projectTitle={message.title}
                    remixDate={message.datetime_created}
                />
            );
        case 'becomecurator':
            return (
                <BecomeCuratorMessage
                    actorUsername={message.actor_username}
                    datetimePromoted={message.datetime_created}
                    key={key}
                    studioId={message.gallery_id}
                    studioTitle={message.title}
                />
            );
        case 'becomeownerstudio':
            return (
                <BecomeManagerMessage
                    datetimePromoted={message.datetime_created}
                    key={key}
                    recipientUsername={message.recipient_username}
                    studioId={message.gallery_id}
                    studioTitle={message.gallery_title}
                />
            );
        case 'shareproject':
            return (
                <ShareProjectMessage
                    actorUsername={message.actor_username}
                    key={key}
                    loveDateTime={message.datetime_created}
                    projectId={message.project_id}
                    projectTitle={message.title}
                />
            );
        }
    }
    render () {
        return (
            <Box
                className="activity"
                title={this.props.intl.formatMessage({
                    id: 'general.whatsHappening'
                })}
            >
                {this.props.items && this.props.items.length > 0 ? [
                    <ul
                        className="activity-ul"
                        key="activity-ul"
                    >
                        {this.props.items.map(item => {
                            let profileLink = `/users/${item.actor_username}/`;
                            let profileThumbUrl = `//uploads.scratch.mit.edu/users/avatars/${item.actor_id}.png`;
                            if (item.type === 'becomeownerstudio') {
                                profileLink = `/users/${item.recipient_username}/`;
                                profileThumbUrl = `//uploads.scratch.mit.edu/users/avatars/${item.recipient_id}.png`;
                            }

                            return (
                                <li
                                    className="activity-li"
                                    key={`${item.type}_${item.datetime_created}`}
                                >
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
                        })}
                    </ul>
                ] : [
                    <div
                        className="empty"
                        key="activity-empty"
                    >
                        <h4>
                            <FormattedMessage id="activity.seeUpdates" />
                        </h4>
                        <a href="/studios/146521/">
                            <FormattedMessage id="activity.checkOutScratchers" />
                        </a>
                    </div>
                ]}
            </Box>
        );
    }
}

ActivityList.propTypes = {
    intl: intlShape,
    items: PropTypes.arrayOf(PropTypes.object)
};

const WrappedActivityList = injectIntl(ActivityList);

// Splash page
class SplashPresentation extends React.Component { // eslint-disable-line react/no-multi-comp
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleMessage',
            'renderHomepageRows'
        ]);
    }
    componentDidMount () {
        if (this.props.shouldShowEmailConfirmation) window.addEventListener('message', this.handleMessage);
    }
    componentWillUnmount () {
        window.removeEventListener('message', this.handleMessage);
    }
    handleMessage (e) {
        if (e.origin !== window.location.origin) return;
        if (e.source !== this.emailConfirmationiFrame.contentWindow) return;
        if (e.data === 'resend-done') {
            this.props.onHideEmailConfirmationModal();
        } else {
            const data = JSON.parse(e.data);
            if (data.action === 'leave-page') {
                window.location.href = data.uri;
            }
        }
    }
    renderHomepageRows () {
        const rows = [
            <Box
                key="community_featured_projects"
                title={this.props.intl.formatMessage({
                    id: 'splash.featuredProjects'
                })}
            >
                <LegacyCarousel items={this.props.featuredGlobal.community_featured_projects} />
            </Box>,
            <Box
                key="community_featured_studios"
                title={this.props.intl.formatMessage({
                    id: 'splash.featuredStudios'
                })}
            >
                <LegacyCarousel
                    items={this.props.featuredGlobal.community_featured_studios}
                    settings={{
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        lazyLoad: false
                    }}
                />
            </Box>
        ];

        if (this.props.featuredGlobal.curator_top_projects &&
            this.props.featuredGlobal.curator_top_projects.length > 4) {

            const curatorName = this.props.featuredGlobal.curator_top_projects[0].curator_name;
            rows.push(
                <Box
                    key="curator_top_projects"
                    moreHref="/studios/386359/"
                    moreTitle={this.props.intl.formatMessage({
                        id: 'general.learnMore'
                    })}
                    title={this.props.intl.formatMessage(
                        {id: 'splash.projectsCuratedBy'},
                        {curatorId: curatorName}
                    )}
                >
                    <LegacyCarousel items={this.props.featuredGlobal.curator_top_projects} />
                </Box>
            );
        }

        if (this.props.featuredGlobal.scratch_design_studio &&
            this.props.featuredGlobal.scratch_design_studio.length > 4) {

            const galleryTitle = this.props.featuredGlobal.scratch_design_studio[0].gallery_title;
            rows.push(
                <Box
                    key="scratch_design_studio"
                    moreHref={`/studios/${this.props.featuredGlobal.scratch_design_studio[0].gallery_id}/`}
                    moreTitle={this.props.intl.formatMessage({id: 'splash.visitTheStudio'})}
                    title={
                        `${this.props.intl.formatMessage({id: 'splash.scratchDesignStudioTitle'})} - ${galleryTitle}`
                    }
                >
                    <LegacyCarousel items={this.props.featuredGlobal.scratch_design_studio} />
                </Box>
            );
        }

        if (this.props.sharedByFollowing && this.props.sharedByFollowing.length > 0) {
            rows.push(
                <Box
                    key="custom_projects_by_following"
                    title={this.props.intl.formatMessage({id: 'splash.projectsByScratchersFollowing'})}
                >
                    <Carousel items={this.props.sharedByFollowing} />
                </Box>
            );
        }

        if (this.props.lovedByFollowing && this.props.lovedByFollowing.length > 0) {
            rows.push(
                <Box
                    key="custom_projects_loved_by_following"
                    title={this.props.intl.formatMessage({id: 'splash.projectsLovedByScratchersFollowing'})}
                >
                    <Carousel items={this.props.lovedByFollowing} />
                </Box>
            );
        }

        if (this.props.inStudiosFollowing && this.props.inStudiosFollowing.length > 0) {
            rows.push(
                <Box
                    key="custom_projects_in_studios_following"
                    title={this.props.intl.formatMessage({id: 'splash.projectsInStudiosFollowing'})}
                >
                    <Carousel items={this.props.inStudiosFollowing} />
                </Box>
            );
        }

        rows.push(
            <Box
                key="community_most_remixed_projects"
                title={this.props.intl.formatMessage({id: 'splash.communityRemixing'})}
            >
                <LegacyCarousel
                    showRemixes
                    items={shuffle(this.props.featuredGlobal.community_most_remixed_projects)}
                />
            </Box>,
            <Box
                key="community_most_loved_projects"
                title={this.props.intl.formatMessage({id: 'splash.communityLoving'})}
            >
                <LegacyCarousel
                    showLoves
                    items={shuffle(this.props.featuredGlobal.community_most_loved_projects)}
                />
            </Box>
        );

        return rows;
    }
    render () {
        const featured = this.renderHomepageRows();

        const formatHTMLMessage = this.props.intl.formatHTMLMessage;
        const formatMessage = this.props.intl.formatMessage;
        const messages = {
            'general.viewAll': formatMessage({id: 'general.viewAll'}),
            'news.scratchNews': formatMessage({id: 'news.scratchNews'}),
            'welcome.welcomeToScratch': formatMessage({id: 'welcome.welcomeToScratch'}),
            'welcome.learn': formatMessage({id: 'welcome.learn'}),
            'welcome.tryOut': formatMessage({id: 'welcome.tryOut'}),
            'welcome.connect': formatMessage({id: 'welcome.connect'}),
            'intro.aboutScratch': formatMessage({id: 'intro.aboutScratch'}),
            'intro.forEducators': formatMessage({id: 'intro.forEducators'}),
            'intro.forParents': formatMessage({id: 'intro.forParents'}),
            'intro.join': formatMessage({id: 'intro.join'}),
            'intro.startCreating': formatMessage({id: 'intro.startCreating'}),
            'intro.tagLine1': formatHTMLMessage({id: 'intro.tagLine1'}),
            'intro.tagLine2': formatHTMLMessage({id: 'intro.tagLine2'}),
            'intro.watchVideo': formatMessage({id: 'intro.watchVideo'}),
            'teacherbanner.greeting': formatMessage({id: 'teacherbanner.greeting'}),
            'teacherbanner.subgreeting': formatMessage({id: 'teacherbanner.subgreeting'}),
            'teacherbanner.classesButton': formatMessage({id: 'teacherbanner.classesButton'}),
            'teacherbanner.resourcesButton': formatMessage({id: 'general.resourcesTitle'}),
            'teacherbanner.faqButton': formatMessage({id: 'teacherbanner.faqButton'})
        };

        return (
            <div className="splash">
                {this.props.shouldShowEmailConfirmation ? [
                    <DropdownBanner
                        className="warning"
                        key="confirmedEmail"
                        onRequestDismiss={() => { // eslint-disable-line react/jsx-no-bind
                            this.props.onDismiss('confirmed_email');
                        }}
                    >
                        <a
                            href="#"
                            onClick={this.props.onShowEmailConfirmationModal}
                        >
                            Confirm your email
                        </a>{' '}to enable sharing.{' '}
                        <a href="/info/faq/#accounts">
                            Having trouble?
                        </a>
                    </DropdownBanner>,
                    <IframeModal
                        className="mod-confirmation"
                        componentRef={iframe => { // eslint-disable-line react/jsx-no-bind
                            this.emailConfirmationiFrame = iframe;
                        }}
                        isOpen={this.props.emailConfirmationModalOpen}
                        key="iframe-modal"
                        src="/accounts/email_resend_standalone/"
                        onRequestClose={this.props.onHideEmailConfirmationModal}
                    />
                ] : []}
                {this.props.isEducator ? [
                    <TeacherBanner
                        key="teacherbanner"
                        messages={messages}
                    />
                ] : []}
                {
                    this.props.sessionStatus === sessionActions.Status.FETCHED &&
                    Object.keys(this.props.user).length === 0 && (// Only show top banner if user is not logged in
                        (Date.now() >= HOC_START_TIME && Date.now() < HOC_END_TIME) ? (
                            <MediaQuery
                                key="frameless-tablet"
                                minWidth={frameless.tabletPortrait}
                            >
                                <TopBanner />
                            </MediaQuery>
                        ) : (
                            <Intro
                                key="intro"
                                messages={messages}
                            />
                        )
                    )
                }
                <div
                    className="inner mod-splash"
                    key="inner"
                >
                    {
                        this.props.sessionStatus === sessionActions.Status.FETCHED &&
                        Object.keys(this.props.user).length > 0 && // user is logged in
                        <div
                            className="splash-header"
                            key="header"
                        >
                            {this.props.shouldShowWelcome ? [
                                <Welcome
                                    key="welcome"
                                    messages={messages}
                                    onDismiss={() => { // eslint-disable-line react/jsx-no-bind
                                        this.props.onDismiss('welcome');
                                    }}
                                />
                            ] : [
                                <WrappedActivityList
                                    items={this.props.activity}
                                    key="activity"
                                />
                            ]}
                            <News
                                items={this.props.news}
                                messages={messages}
                            />
                        </div>
                    }
                    {featured.shift()}
                    {featured.shift()}
                </div>
                {
                    this.props.sessionStatus === sessionActions.Status.FETCHED &&
                    Object.keys(this.props.user).length !== 0 && // Only show if user is logged in
                    Date.now() >= HOC_START_TIME && // Show middle banner on and after Dec 3
                    Date.now() < HOC_END_TIME && // Hide middle banner after Dec 14
                    <MediaQuery
                        key="frameless-desktop"
                        minWidth={frameless.tabletPortrait}
                    >
                        <MiddleBanner />
                    </MediaQuery>
                }

                <div
                    className="inner mod-splash"
                    key="inner2"
                >
                    {featured}

                    {this.props.isAdmin && (
                        <AdminPanel
                            className="splash-admin-panel"
                            isOpen={this.props.adminPanelOpen}
                            onClose={this.props.onCloseAdminPanel}
                            onOpen={this.props.onOpenAdminPanel}
                        >
                            <dl>
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
                                                <Button
                                                    className={this.props.refreshCacheStatus.status}
                                                    disabled={this.props.refreshCacheStatus.disabled}
                                                    onClick={this.props.onRefreshHomepageCache}
                                                >
                                                    <span>{this.props.refreshCacheStatus.content}</span>
                                                </Button>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                                <dt>Page Cache</dt>
                                <dd>
                                    <ul className="cache-list">
                                        <li>
                                            <form
                                                action="/scratch_admin/page/clear-anon-cache/"
                                                method="post"
                                            >
                                                <input
                                                    name="path"
                                                    type="hidden"
                                                    value="/"
                                                />
                                                <div className="button-row">
                                                    <span>For anonymous users:</span>
                                                    <Button type="submit">
                                                        <span>Clear</span>
                                                    </Button>
                                                </div>
                                            </form>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                        </AdminPanel>
                    )}
                </div>
            </div>
        );
    }
}

SplashPresentation.propTypes = {
    activity: PropTypes.arrayOf(PropTypes.object),
    adminPanelOpen: PropTypes.bool,
    emailConfirmationModalOpen: PropTypes.bool.isRequired,
    featuredGlobal: PropTypes.shape({
        community_featured_projects: PropTypes.array,
        community_featured_studios: PropTypes.array,
        curator_top_projects: PropTypes.array,
        scratch_design_studio: PropTypes.array,
        community_most_remixed_projects: PropTypes.array,
        community_most_loved_projects: PropTypes.array
    }),
    inStudiosFollowing: PropTypes.arrayOf(PropTypes.object),
    intl: intlShape,
    isAdmin: PropTypes.bool.isRequired,
    isEducator: PropTypes.bool.isRequired,
    lovedByFollowing: PropTypes.arrayOf(PropTypes.object),
    news: PropTypes.arrayOf(PropTypes.object),
    onCloseAdminPanel: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onHideEmailConfirmationModal: PropTypes.func.isRequired,
    onOpenAdminPanel: PropTypes.func.isRequired,
    onRefreshHomepageCache: PropTypes.func.isRequired,
    onShowEmailConfirmationModal: PropTypes.func.isRequired,
    refreshCacheStatus: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    sessionStatus: PropTypes.string.isRequired,
    sharedByFollowing: PropTypes.arrayOf(PropTypes.object),
    shouldShowEmailConfirmation: PropTypes.bool.isRequired,
    shouldShowWelcome: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

SplashPresentation.defaultProps = {
    activity: [], // recent social actions taken by users someone is following
    featuredGlobal: {}, // global homepage rows, such as "Featured Projects"
    inStudiosFollowing: [], // "Projects in Studios I'm Following"
    lovedByFollowing: [], // "Projects Loved by Scratchers I'm Following"
    news: [], // gets news posts from the scratch Tumblr
    sharedByFollowing: [] // "Projects by Scratchers I'm Following"
};

module.exports = injectIntl(SplashPresentation);
