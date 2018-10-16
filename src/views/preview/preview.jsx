// preview view can show either project page or editor page;
// idea is that we shouldn't require a page reload to switch back and forth

const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const connect = require('react-redux').connect;
const injectIntl = require('react-intl').injectIntl;
const parser = require('scratch-parser');
const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');
const storage = require('../../lib/storage.js').default;
const log = require('../../lib/log');
const EXTENSION_INFO = require('../../lib/extensions.js').default;

const PreviewPresentation = require('./presentation.jsx');
const projectShape = require('./projectshape.jsx').projectShape;
const Registration = require('../../components/registration/registration.jsx');
const ConnectedLogin = require('../../components/login/connected-login.jsx');
const CanceledDeletionModal = require('../../components/login/canceled-deletion-modal.jsx');

const sessionActions = require('../../redux/session.js');
const navigationActions = require('../../redux/navigation.js');
const previewActions = require('../../redux/preview.js');

const frameless = require('../../lib/frameless');

const GUI = require('scratch-gui');
const IntlGUI = injectIntl(GUI.default);

class Preview extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'addEventListeners',
            'handleAddComment',
            'handleDeleteComment',
            'handleToggleStudio',
            'handleFavoriteToggle',
            'handleLoadMore',
            'handleLoveToggle',
            'handlePopState',
            'handleReportClick',
            'handleReportClose',
            'handleReportComment',
            'handleReportSubmit',
            'handleAddToStudioClick',
            'handleAddToStudioClose',
            'handleSeeInside',
            'handleUpdateProjectTitle',
            'handleUpdate',
            'handleToggleComments',
            'initCounts',
            'pushHistory',
            'renderLogin',
            'setScreenFromOrientation'
        ]);
        const pathname = window.location.pathname.toLowerCase();
        const parts = pathname.split('/').filter(Boolean);
        // parts[0]: 'preview'
        // parts[1]: either :id or 'editor'
        // parts[2]: undefined if no :id, otherwise either 'editor' or 'fullscreen'
        this.state = {
            extensions: [],
            favoriteCount: 0,
            loveCount: 0,
            projectId: parts[1] === 'editor' ? 0 : parts[1],
            addToStudioOpen: false,
            reportOpen: false
        };
        this.getExtensions(this.state.projectId);
        this.addEventListeners();
        /* In the beginning, if user is on mobile and landscape, go to fullscreen */
        this.setScreenFromOrientation();
    }
    componentDidUpdate (prevProps) {
        if (this.props.sessionStatus !== prevProps.sessionStatus &&
            this.props.sessionStatus === sessionActions.Status.FETCHED &&
            this.state.projectId) {
            if (this.props.user) {
                const username = this.props.user.username;
                const token = this.props.user.token;
                this.props.getTopLevelComments(this.state.projectId, this.props.comments.length);
                this.props.getProjectInfo(this.state.projectId, token);
                this.props.getRemixes(this.state.projectId, token);
                this.props.getProjectStudios(this.state.projectId, token);
                this.props.getCuratedStudios(username);
                this.props.getFavedStatus(this.state.projectId, username, token);
                this.props.getLovedStatus(this.state.projectId, username, token);
            } else {
                this.props.getTopLevelComments(this.state.projectId, this.props.comments.length);
                this.props.getProjectInfo(this.state.projectId);
                this.props.getRemixes(this.state.projectId);
                this.props.getProjectStudios(this.state.projectId);
            }
        }
        if (this.props.projectInfo.id !== prevProps.projectInfo.id) {
            this.getExtensions(this.state.projectId);
            this.initCounts(this.props.projectInfo.stats.favorites, this.props.projectInfo.stats.loves);
            if (this.props.projectInfo.remix.parent !== null) {
                this.props.getParentInfo(this.props.projectInfo.remix.parent);
            }
            if (this.props.projectInfo.remix.root !== null &&
                this.props.projectInfo.remix.root !== this.props.projectInfo.remix.parent
            ) {
                this.props.getOriginalInfo(this.props.projectInfo.remix.root);
            }
        }
        if (this.props.playerMode !== prevProps.playerMode || this.props.fullScreen !== prevProps.fullScreen) {
            this.pushHistory(history.state === null);
        }
    }
    componentWillUnmount () {
        this.removeEventListeners();
    }
    addEventListeners () {
        window.addEventListener('popstate', this.handlePopState);
        window.addEventListener('orientationchange', this.setScreenFromOrientation);
    }
    removeEventListeners () {
        window.removeEventListener('popstate', this.handlePopState);
        window.removeEventListener('orientationchange', this.setScreenFromOrientation);
    }
    setScreenFromOrientation () {
        /*
        * If the user is on a mobile device, switching to
        * landscape format should make the fullscreen mode active
        */
        const isMobileDevice = screen.height <= frameless.mobile || screen.width <= frameless.mobile;
        const isAModalOpen = this.state.addToStudioOpen || this.state.reportOpen;
        if (this.props.playerMode && isMobileDevice && !isAModalOpen) {
            const isLandscape = screen.height < screen.width;
            if (isLandscape) {
                this.props.setFullScreen(true);
            } else {
                this.props.setFullScreen(false);
            }
        }
    }
    getExtensions (projectId) {
        storage
            .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
            .then(projectAsset => { // NOTE: this is turning up null, breaking the line below.
                let input = projectAsset.data;
                if (typeof input === 'object' && !(input instanceof ArrayBuffer) &&
                !ArrayBuffer.isView(input)) { // taken from scratch-vm
                    // If the input is an object and not any ArrayBuffer
                    // or an ArrayBuffer view (this includes all typed arrays and DataViews)
                    // turn the object into a JSON string, because we suspect
                    // this is a project.json as an object
                    // validate expects a string or buffer as input
                    // TODO not sure if we need to check that it also isn't a data view
                    input = JSON.stringify(input);
                }
                parser(projectAsset.data, false, (err, projectData) => {
                    if (err) {
                        log.error(`Unhandled project parsing error: ${err}`);
                        return;
                    }
                    const extensionSet = new Set();
                    if (projectData[0].extensions) {
                        projectData[0].extensions.forEach(extension => {
                            extensionSet.add(EXTENSION_INFO[extension]);
                        });
                    }
                    this.setState({
                        extensions: Array.from(extensionSet)
                    });
                });
            });
    }
    handleToggleComments () {
        this.props.updateProject(
            this.props.projectInfo.id,
            {comments_allowed: !this.props.projectInfo.comments_allowed},
            this.props.user.username,
            this.props.user.token
        );
    }
    handleAddComment (comment, topLevelCommentId) {
        this.props.handleAddComment(comment, topLevelCommentId);
    }
    handleDeleteComment (id, topLevelCommentId) {
        this.props.handleDeleteComment(this.state.projectId, id, topLevelCommentId, this.props.user.token);
    }
    handleReportComment (id, topLevelCommentId) {
        this.props.handleReportComment(this.state.projectId, id, topLevelCommentId, this.props.user.token);
    }
    handleReportClick () {
        this.setState({reportOpen: true});
    }
    handleReportClose () {
        this.setState({reportOpen: false});
    }
    handleAddToStudioClick () {
        this.setState({addToStudioOpen: true});
    }
    handleAddToStudioClose () {
        this.setState({addToStudioOpen: false});
    }
    handleReportSubmit (formData) {
        this.props.reportProject(this.state.projectId, formData);
    }
    handlePopState () {
        const path = window.location.pathname.toLowerCase();
        const playerMode = path.indexOf('editor') === -1;
        const fullScreen = path.indexOf('fullscreen') !== -1;
        if (this.props.playerMode !== playerMode) {
            this.props.setPlayer(playerMode);
        }
        if (this.props.fullScreen !== fullScreen) {
            this.props.setFullScreen(fullScreen);
        }
    }
    pushHistory (push) {
        // update URI to match mode
        const idPath = this.state.projectId ? `${this.state.projectId}/` : '';
        let modePath = '';
        if (!this.props.playerMode) modePath = 'editor/';
        // fullscreen overrides editor
        if (this.props.fullScreen) modePath = 'fullscreen/';
        const newPath = `/preview/${idPath}${modePath}`;
        if (push) {
            history.pushState(
                {},
                document.title,
                newPath
            );
        } else {
            history.replaceState(
                {},
                document.title,
                newPath
            );
        }
    }
    handleToggleStudio (id) {
        const studioId = parseInt(id, 10);
        if (isNaN(studioId)) { // sanity check in case event had no integer data-id
            return;
        }
        const studio = this.props.studios.find(thisStudio => (thisStudio.id === studioId));
        // only send add or leave request to server if we know current status
        if ((typeof studio !== 'undefined') && ('includesProject' in studio)) {
            this.props.toggleStudio(
                (studio.includesProject === false),
                studioId,
                this.props.projectInfo.id,
                this.props.user.token
            );
        }
    }
    handleFavoriteToggle () {
        this.props.setFavedStatus(
            !this.props.faved,
            this.props.projectInfo.id,
            this.props.user.username,
            this.props.user.token
        );
        if (this.props.faved) {
            this.setState(state => ({
                favoriteCount: state.favoriteCount - 1
            }));
        } else {
            this.setState(state => ({
                favoriteCount: state.favoriteCount + 1
            }));
        }
    }
    handleLoadMore () {
        this.props.getTopLevelComments(this.state.projectId, this.props.comments.length);
    }
    handleLoveToggle () {
        this.props.setLovedStatus(
            !this.props.loved,
            this.props.projectInfo.id,
            this.props.user.username,
            this.props.user.token
        );
        if (this.props.loved) {
            this.setState(state => ({
                loveCount: state.loveCount - 1
            }));
        } else {
            this.setState(state => ({
                loveCount: state.loveCount + 1
            }));
        }
    }
    handleSeeInside () {
        this.props.setPlayer(false);
    }
    handleShare () {
        // This is just a placeholder, but enables the button in the editor
    }
    handleUpdate (jsonData) {
        this.props.updateProject(
            this.props.projectInfo.id,
            jsonData,
            this.props.user.username,
            this.props.user.token
        );
    }
    handleUpdateProjectTitle (title) {
        this.handleUpdate({
            title: title
        });
    }
    initCounts (favorites, loves) {
        this.setState({
            favoriteCount: favorites,
            loveCount: loves
        });
    }
    renderLogin ({onClose}) {
        return (
            <ConnectedLogin
                key="login-dropdown-presentation"
                /* eslint-disable react/jsx-no-bind */
                onLogIn={(formData, callback) => {
                    this.props.handleLogIn(formData, result => {
                        if (result.success === true) {
                            onClose();
                        }
                        callback(result);
                    });
                }}
                /* eslint-ensable react/jsx-no-bind */
            />
        );
    }
    render () {
        return (
            this.props.playerMode ?
                <Page>
                    <PreviewPresentation
                        addToStudioOpen={this.state.addToStudioOpen}
                        assetHost={this.props.assetHost}
                        backpackOptions={this.props.backpackOptions}
                        canAddToStudio={this.props.canAddToStudio}
                        canReport={this.props.canReport}
                        comments={this.props.comments}
                        editable={this.props.isEditable}
                        extensions={this.state.extensions}
                        faved={this.props.faved}
                        favoriteCount={this.state.favoriteCount}
                        isFullScreen={this.state.isFullScreen}
                        isLoggedIn={this.props.isLoggedIn}
                        isShared={this.props.isShared}
                        loveCount={this.state.loveCount}
                        loved={this.props.loved}
                        originalInfo={this.props.original}
                        parentInfo={this.props.parent}
                        projectHost={this.props.projectHost}
                        projectId={this.state.projectId}
                        projectInfo={this.props.projectInfo}
                        projectStudios={this.props.projectStudios}
                        remixes={this.props.remixes}
                        replies={this.props.replies}
                        reportOpen={this.state.reportOpen}
                        studios={this.props.studios}
                        userOwnsProject={this.props.userOwnsProject}
                        onAddComment={this.handleAddComment}
                        onAddToStudioClicked={this.handleAddToStudioClick}
                        onAddToStudioClosed={this.handleAddToStudioClose}
                        onDeleteComment={this.handleDeleteComment}
                        onFavoriteClicked={this.handleFavoriteToggle}
                        onLoadMore={this.handleLoadMore}
                        onLoveClicked={this.handleLoveToggle}
                        onReportClicked={this.handleReportClick}
                        onReportClose={this.handleReportClose}
                        onReportComment={this.handleReportComment}
                        onReportSubmit={this.handleReportSubmit}
                        onSeeInside={this.handleSeeInside}
                        onToggleComments={this.handleToggleComments}
                        onToggleStudio={this.handleToggleStudio}
                        onUpdate={this.handleUpdate}
                    />
                </Page> :
                <React.Fragment>
                    <IntlGUI
                        enableCommunity
                        hideIntro
                        assetHost={this.props.assetHost}
                        backpackOptions={this.props.backpackOptions}
                        basePath="/"
                        canCreateNew={this.props.canCreateNew}
                        canRemix={this.props.canRemix}
                        canSave={this.props.canSave}
                        canSaveAsCopy={this.props.canSaveAsCopy}
                        canShare={this.props.canShare}
                        className="gui"
                        projectHost={this.props.projectHost}
                        projectId={this.state.projectId}
                        projectTitle={this.props.projectInfo.title}
                        renderLogin={this.renderLogin}
                        onLogOut={this.props.handleLogOut}
                        onOpenRegistration={this.props.handleOpenRegistration}
                        onShare={this.handleShare}
                        onToggleLoginOpen={this.props.handleToggleLoginOpen}
                        onUpdateProjectTitle={this.handleUpdateProjectTitle}
                    />
                    <Registration />
                    <CanceledDeletionModal />
                </React.Fragment>

        );
    }
}

Preview.propTypes = {
    assetHost: PropTypes.string.isRequired,
    backpackOptions: PropTypes.shape({
        host: PropTypes.string,
        visible: PropTypes.bool
    }),
    canAddToStudio: PropTypes.bool,
    canCreateNew: PropTypes.bool,
    canRemix: PropTypes.bool,
    canReport: PropTypes.bool,
    canSave: PropTypes.bool,
    canSaveAsCopy: PropTypes.bool,
    canShare: PropTypes.bool,
    comments: PropTypes.arrayOf(PropTypes.object),
    faved: PropTypes.bool,
    fullScreen: PropTypes.bool,
    getCuratedStudios: PropTypes.func.isRequired,
    getFavedStatus: PropTypes.func.isRequired,
    getLovedStatus: PropTypes.func.isRequired,
    getOriginalInfo: PropTypes.func.isRequired,
    getParentInfo: PropTypes.func.isRequired,
    getProjectInfo: PropTypes.func.isRequired,
    getProjectStudios: PropTypes.func.isRequired,
    getRemixes: PropTypes.func.isRequired,
    getTopLevelComments: PropTypes.func.isRequired,
    handleAddComment: PropTypes.func,
    handleDeleteComment: PropTypes.func,
    handleLogIn: PropTypes.func,
    handleLogOut: PropTypes.func,
    handleOpenRegistration: PropTypes.func,
    handleReportComment: PropTypes.func,
    handleToggleLoginOpen: PropTypes.func,
    isEditable: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    isShared: PropTypes.bool,
    loved: PropTypes.bool,
    original: projectShape,
    parent: projectShape,
    playerMode: PropTypes.bool,
    projectHost: PropTypes.string.isRequired,
    projectInfo: projectShape,
    projectStudios: PropTypes.arrayOf(PropTypes.object),
    remixes: PropTypes.arrayOf(PropTypes.object),
    replies: PropTypes.objectOf(PropTypes.array),
    reportProject: PropTypes.func,
    sessionStatus: PropTypes.string,
    setFavedStatus: PropTypes.func.isRequired,
    setFullScreen: PropTypes.func.isRequired,
    setLovedStatus: PropTypes.func.isRequired,
    setPlayer: PropTypes.func.isRequired,
    studios: PropTypes.arrayOf(PropTypes.object),
    toggleStudio: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number,
        banned: PropTypes.bool,
        username: PropTypes.string,
        token: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        dateJoined: PropTypes.string,
        email: PropTypes.string,
        classroomId: PropTypes.string
    }),
    userOwnsProject: PropTypes.bool
};

Preview.defaultProps = {
    assetHost: process.env.ASSET_HOST,
    backpackOptions: {
        host: process.env.BACKPACK_HOST,
        visible: true
    },
    projectHost: process.env.PROJECT_HOST,
    sessionStatus: sessionActions.Status.NOT_FETCHED,
    user: {}
};

// Build consolidated curatedStudios object from all studio info.
// We add flags to indicate whether the project is currently in the studio,
// and the status of requests to join/leave studios.
const consolidateStudiosInfo = (curatedStudios, projectStudios, currentStudioIds, studioRequests) => {
    const consolidatedStudios = [];

    projectStudios.forEach(projectStudio => {
        const includesProject = (currentStudioIds.indexOf(projectStudio.id) !== -1);
        const consolidatedStudio =
            Object.assign({}, projectStudio, {includesProject: includesProject});
        consolidatedStudios.push(consolidatedStudio);
    });

    // copy the curated studios that project is not in
    curatedStudios.forEach(curatedStudio => {
        if (!projectStudios.some(projectStudio => (projectStudio.id === curatedStudio.id))) {
            const includesProject = (currentStudioIds.indexOf(curatedStudio.id) !== -1);
            const consolidatedStudio =
                Object.assign({}, curatedStudio, {includesProject: includesProject});
            consolidatedStudios.push(consolidatedStudio);
        }
    });

    // set studio state to hasRequestOutstanding==true if it's being fetched,
    // false if it's not
    consolidatedStudios.forEach(consolidatedStudio => {
        const id = consolidatedStudio.id;
        consolidatedStudio.hasRequestOutstanding =
            ((id in studioRequests) &&
           (studioRequests[id] === previewActions.Status.FETCHING));
    });
    return consolidatedStudios;
};

const mapStateToProps = state => {
    const projectInfoPresent = Object.keys(state.preview.projectInfo).length > 0;
    const userPresent = state.session.session.user &&
        Object.keys(state.session.session.user).length > 0;
    const isLoggedIn = state.session.status === sessionActions.Status.FETCHED &&
        userPresent;
    const authorPresent = projectInfoPresent && state.preview.projectInfo.author &&
        Object.keys(state.preview.projectInfo.author).length > 0;
    const userOwnsProject = isLoggedIn && authorPresent &&
        state.session.session.user.id === state.preview.projectInfo.author.id;

    return {
        canAddToStudio: isLoggedIn && userOwnsProject,
        canCreateNew: false,
        canRemix: false,
        canReport: isLoggedIn && !userOwnsProject,
        canSave: userOwnsProject,
        canSaveAsCopy: false,
        canShare: userOwnsProject && state.permissions.social,
        comments: state.preview.comments,
        faved: state.preview.faved,
        fullScreen: state.scratchGui.mode.isFullScreen,
        // project is editable iff logged in user is the author of the project, or
        // logged in user is an admin.
        isEditable: isLoggedIn &&
            ((authorPresent && state.preview.projectInfo.author.username === state.session.session.user.username) ||
            state.permissions.admin === true),
        isLoggedIn: isLoggedIn,
        // if we don't have projectInfo, assume it's shared until we know otherwise
        isShared: !projectInfoPresent || (
            state.preview.projectInfo.history &&
            state.preview.projectInfo.history.shared &&
            state.preview.projectInfo.history.shared.length > 0),
        loved: state.preview.loved,
        original: state.preview.original,
        parent: state.preview.parent,
        playerMode: state.scratchGui.mode.isPlayerOnly,
        projectInfo: state.preview.projectInfo,
        projectStudios: state.preview.projectStudios,
        remixes: state.preview.remixes,
        replies: state.preview.replies,
        sessionStatus: state.session.status, // check if used
        studios: consolidateStudiosInfo(state.preview.curatedStudios,
            state.preview.projectStudios, state.preview.currentStudioIds,
            state.preview.status.studioRequests),
        user: state.session.session.user,
        userOwnsProject: userOwnsProject
    };
};

const mapDispatchToProps = dispatch => ({
    handleAddComment: (comment, topLevelCommentId) => {
        dispatch(previewActions.addNewComment(comment, topLevelCommentId));
    },
    handleDeleteComment: (projectId, commentId, topLevelCommentId, token) => {
        dispatch(previewActions.deleteComment(projectId, commentId, topLevelCommentId, token));
    },
    handleReportComment: (projectId, commentId, topLevelCommentId, token) => {
        dispatch(previewActions.reportComment(projectId, commentId, topLevelCommentId, token));
    },
    handleOpenRegistration: event => {
        event.preventDefault();
        dispatch(navigationActions.setRegistrationOpen(true));
    },
    handleLogIn: (formData, callback) => {
        dispatch(navigationActions.handleLogIn(formData, callback));
    },
    handleLogOut: event => {
        event.preventDefault();
        dispatch(navigationActions.handleLogOut());
    },
    handleToggleLoginOpen: event => {
        event.preventDefault();
        dispatch(navigationActions.toggleLoginOpen());
    },
    getOriginalInfo: id => {
        dispatch(previewActions.getOriginalInfo(id));
    },
    getParentInfo: id => {
        dispatch(previewActions.getParentInfo(id));
    },
    getProjectInfo: (id, token) => {
        dispatch(previewActions.getProjectInfo(id, token));
    },
    getRemixes: id => {
        dispatch(previewActions.getRemixes(id));
    },
    getProjectStudios: id => {
        dispatch(previewActions.getProjectStudios(id));
    },
    getCuratedStudios: (username, token) => {
        dispatch(previewActions.getCuratedStudios(username, token));
    },
    toggleStudio: (isAdd, studioId, id, token) => {
        if (isAdd === true) {
            dispatch(previewActions.addToStudio(studioId, id, token));
        } else {
            dispatch(previewActions.leaveStudio(studioId, id, token));
        }
    },
    getTopLevelComments: (id, offset) => {
        dispatch(previewActions.getTopLevelComments(id, offset));
    },
    getFavedStatus: (id, username, token) => {
        dispatch(previewActions.getFavedStatus(id, username, token));
    },
    setFavedStatus: (faved, id, username, token) => {
        dispatch(previewActions.setFavedStatus(faved, id, username, token));
    },
    getLovedStatus: (id, username, token) => {
        dispatch(previewActions.getLovedStatus(id, username, token));
    },
    setLovedStatus: (loved, id, username, token) => {
        dispatch(previewActions.setLovedStatus(loved, id, username, token));
    },
    reportProject: (id, formData) => {
        dispatch(previewActions.reportProject(id, formData));
    },
    setOriginalInfo: info => {
        dispatch(previewActions.setOriginalInfo(info));
    },
    setParentInfo: info => {
        dispatch(previewActions.setParentInfo(info));
    },
    updateProject: (id, formData, username, token) => {
        dispatch(previewActions.updateProject(id, formData, username, token));
    },
    setPlayer: player => {
        dispatch(GUI.setPlayer(player));
    },
    setFullScreen: fullscreen => {
        dispatch(GUI.setFullScreen(fullscreen));
    }
});

const ConnectedPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview);

GUI.setAppElement(document.getElementById('app'));
const initGuiState = guiInitialState => {
    const pathname = window.location.pathname.toLowerCase();
    const parts = pathname.split('/').filter(Boolean);
    // parts[0]: 'preview'
    // parts[1]: either :id or 'editor'
    // parts[2]: undefined if no :id, otherwise either 'editor' or 'fullscreen'
    if (parts.indexOf('editor') === -1) {
        guiInitialState = GUI.initPlayer(guiInitialState);
    }
    if (parts.indexOf('fullscreen') !== -1) {
        guiInitialState = GUI.initFullScreen(guiInitialState);
    }
    return guiInitialState;
};

render(
    <ConnectedPreview />,
    document.getElementById('app'),
    {
        preview: previewActions.previewReducer,
        ...GUI.guiReducers
    },
    {scratchGui: initGuiState(GUI.guiInitialState)},
    GUI.guiMiddleware
);
