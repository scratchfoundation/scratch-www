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

const sessionActions = require('../../redux/session.js');
const previewActions = require('../../redux/preview.js');

const GUI = require('scratch-gui');
const IntlGUI = injectIntl(GUI.default);

class Preview extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'addEventListeners',
            'handleFavoriteToggle',
            'handleLoveToggle',
            'handlePermissions',
            'handlePopState',
            'handleReportClick',
            'handleReportClose',
            'handleReportSubmit',
            'handleSeeInside',
            'handleUpdate',
            'initCounts',
            'isShared',
            'pushHistory',
            'userOwnsProject'
        ]);
        const pathname = window.location.pathname.toLowerCase();
        const parts = pathname.split('/').filter(Boolean);
        // parts[0]: 'preview'
        // parts[1]: either :id or 'editor'
        // parts[2]: undefined if no :id, otherwise either 'editor' or 'fullscreen'
        this.state = {
            editable: false,
            extensions: [],
            favoriteCount: 0,
            loveCount: 0,
            projectId: parts[1] === 'editor' ? 0 : parts[1],
            report: {
                category: '',
                notes: '',
                open: false,
                waiting: false
            }
        };
        this.getExtensions(this.state.projectId);
        this.addEventListeners();
    }
    componentDidUpdate (prevProps) {
        if (this.props.sessionStatus !== prevProps.sessionStatus &&
            this.props.sessionStatus === sessionActions.Status.FETCHED &&
            this.state.projectId) {
            if (this.props.user) {
                const username = this.props.user.username;
                const token = this.props.user.token;
                this.props.getProjectInfo(this.state.projectId, token);
                this.props.getRemixes(this.state.projectId, token);
                this.props.getStudios(this.state.projectId, token);
                this.props.getFavedStatus(this.state.projectId, username, token);
                this.props.getLovedStatus(this.state.projectId, username, token);
            } else {
                this.props.getProjectInfo(this.state.projectId);
                this.props.getRemixes(this.state.projectId);
                this.props.getStudios(this.state.projectId);
            }
            
        }
        if (this.props.projectInfo.id !== prevProps.projectInfo.id) {
            this.getExtensions(this.state.projectId);
            this.initCounts(this.props.projectInfo.stats.favorites, this.props.projectInfo.stats.loves);
            this.handlePermissions();
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
    }
    removeEventListeners () {
        window.removeEventListener('popstate', this.handlePopState);
    }
    getExtensions (projectId) {
        storage
            .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
            .then(projectAsset => {
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
    handleReportClick () {
        this.setState({report: {...this.state.report, open: true}});
    }
    handleReportClose () {
        this.setState({report: {...this.state.report, open: false}});
    }
    handleReportSubmit (formData) {
        this.setState({report: {
            category: formData.report_category,
            notes: formData.notes,
            open: this.state.report.open,
            waiting: true}
        });

        const data = {
            ...formData,
            id: this.state.projectId,
            user: this.props.user.username
        };
        console.log('submit report data', data); // eslint-disable-line no-console
        this.setState({report: {
            category: '',
            notes: '',
            open: false,
            waiting: false}
        });
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
    handlePermissions () {
        // TODO: handle admins and mods 
        if (this.props.projectInfo.author.username === this.props.user.username) {
            this.setState({editable: true});
        }
    }
    handleSeeInside () {
        this.props.setPlayer(false);
    }
    handleUpdate (jsonData) {
        this.props.updateProject(
            this.props.projectInfo.id,
            jsonData,
            this.props.user.username,
            this.props.user.token
        );
    }
    initCounts (favorites, loves) {
        this.setState({
            favoriteCount: favorites,
            loveCount: loves
        });
    }
    isShared () {
        return (
            // if we don't have projectInfo assume shared until we know otherwise
            Object.keys(this.props.projectInfo).length === 0 || (
                this.props.projectInfo.history &&
                this.props.projectInfo.history.shared.length > 0
            )
        );
    }
    isLoggedIn () {
        return (
            this.props.sessionStatus === sessionActions.Status.FETCHED &&
            Object.keys(this.props.user).length > 0
        );
    }
    userOwnsProject () {
        return (
            this.isLoggedIn() &&
            Object.keys(this.props.projectInfo).length > 0 &&
            this.props.user.id === this.props.projectInfo.author.id
        );
    }
    render () {
        return (
            this.props.playerMode ?
                <Page>
                    <PreviewPresentation
                        comments={this.props.comments}
                        editable={this.state.editable}
                        extensions={this.state.extensions}
                        faved={this.props.faved}
                        favoriteCount={this.state.favoriteCount}
                        isFullScreen={this.state.isFullScreen}
                        isLoggedIn={this.isLoggedIn()}
                        isShared={this.isShared()}
                        loveCount={this.state.loveCount}
                        loved={this.props.loved}
                        originalInfo={this.props.original}
                        parentInfo={this.props.parent}
                        projectId={this.state.projectId}
                        projectInfo={this.props.projectInfo}
                        remixes={this.props.remixes}
                        report={this.state.report}
                        studios={this.props.studios}
                        user={this.props.user}
                        userOwnsProject={this.userOwnsProject()}
                        onFavoriteClicked={this.handleFavoriteToggle}
                        onLoveClicked={this.handleLoveToggle}
                        onReportClicked={this.handleReportClick}
                        onReportClose={this.handleReportClose}
                        onReportSubmit={this.handleReportSubmit}
                        onSeeInside={this.handleSeeInside}
                        onUpdate={this.handleUpdate}
                    />
                </Page> :
                <IntlGUI
                    enableCommunity
                    basePath="/"
                    className="gui"
                    projectId={this.state.projectId}
                />
        );
    }
}

Preview.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    faved: PropTypes.bool,
    fullScreen: PropTypes.bool,
    getFavedStatus: PropTypes.func.isRequired,
    getLovedStatus: PropTypes.func.isRequired,
    getOriginalInfo: PropTypes.func.isRequired,
    getParentInfo: PropTypes.func.isRequired,
    getProjectInfo: PropTypes.func.isRequired,
    getRemixes: PropTypes.func.isRequired,
    getStudios: PropTypes.func.isRequired,
    loved: PropTypes.bool,
    original: projectShape,
    parent: projectShape,
    playerMode: PropTypes.bool,
    projectInfo: projectShape,
    remixes: PropTypes.arrayOf(PropTypes.object),
    sessionStatus: PropTypes.string,
    setFavedStatus: PropTypes.func.isRequired,
    setFullScreen: PropTypes.func.isRequired,
    setLovedStatus: PropTypes.func.isRequired,
    setPlayer: PropTypes.func.isRequired,
    studios: PropTypes.arrayOf(PropTypes.object),
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
    })
};

Preview.defaultProps = {
    sessionStatus: sessionActions.Status.NOT_FETCHED,
    user: {}
};

const mapStateToProps = state => ({
    projectInfo: state.preview.projectInfo,
    comments: state.preview.comments,
    faved: state.preview.faved,
    loved: state.preview.loved,
    original: state.preview.original,
    parent: state.preview.parent,
    remixes: state.preview.remixes,
    sessionStatus: state.session.status,
    studios: state.preview.studios,
    user: state.session.session.user,
    playerMode: state.scratchGui.mode.isPlayerOnly,
    fullScreen: state.scratchGui.mode.isFullScreen
});


const mapDispatchToProps = dispatch => ({
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
    getStudios: id => {
        dispatch(previewActions.getStudios(id));
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
    refreshSession: () => {
        dispatch(sessionActions.refreshSession());
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
