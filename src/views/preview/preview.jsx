const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const connect = require('react-redux').connect;
const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const PreviewPresentation = require('./presentation.jsx');

const sessionActions = require('../../redux/session.js');
const previewActions = require('../../redux/preview.js');

class Preview extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleFavoriteToggle',
            'handleLoveToggle',
            'handlePermissions',
            'handleUpdate',
            'initCounts'
        ]);
        this.state = {
            editable: false,
            favoriteCount: 0,
            loveCount: 0
        };
    }
    componentDidUpdate (prevProps) {
        let pathname = window.location.pathname.toLowerCase();
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        const path = pathname.split('/');
        const projectId = path[path.length - 1];
        if (this.props.sessionStatus !== prevProps.sessionStatus &&
            this.props.sessionStatus === sessionActions.Status.FETCHED) {
            if (this.props.user) {
                const username = this.props.user.username;
                const token = this.props.user.token;
                this.props.getProjectInfo(projectId, token);
                this.props.getRemixes(projectId, token);
                this.props.getStudios(projectId, token);
                this.props.getFavedStatus(projectId, username, token);
                this.props.getLovedStatus(projectId, username, token);
            } else {
                this.props.getProjectInfo(projectId);
                this.props.getRemixes(projectId);
                this.props.getStudios(projectId);
            }
            
        }
        if (this.props.projectInfo.id !== prevProps.projectInfo.id) {
            this.initCounts(this.props.projectInfo.stats.favorites, this.props.projectInfo.stats.loves);
            this.handlePermissions();
            if (this.props.projectInfo.remix.root !== null) {
                this.props.getCreditInfo(this.props.projectInfo.remix.root);
            }
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
    render () {
        return (
            <PreviewPresentation
                comments={this.props.comments}
                creditInfo={this.props.credit}
                editable={this.state.editable}
                faved={this.props.faved}
                favoriteCount={this.state.favoriteCount}
                loveCount={this.state.loveCount}
                loved={this.props.loved}
                projectInfo={this.props.projectInfo}
                remixes={this.props.remixes}
                sessionStatus={this.props.sessionStatus}
                studios={this.props.studios}
                user={this.props.user}
                onFavoriteClicked={this.handleFavoriteToggle}
                onLoveClicked={this.handleLoveToggle}
                onUpdate={this.handleUpdate}
            />
        );
    }
}

Preview.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    credit: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        author: PropTypes.shape({
            id: PropTypes.number
        }),
        history: PropTypes.shape({
            created: PropTypes.string,
            modified: PropTypes.string,
            shared: PropTypes.string
        }),
        stats: PropTypes.shape({
            views: PropTypes.number,
            loves: PropTypes.number,
            favorites: PropTypes.number
        }),
        remix: PropTypes.shape({
            parent: PropTypes.number,
            root: PropTypes.number
        })
    }),
    faved: PropTypes.bool,
    getCreditInfo: PropTypes.func.isRequired,
    getFavedStatus: PropTypes.func.isRequired,
    getLovedStatus: PropTypes.func.isRequired,
    getProjectInfo: PropTypes.func.isRequired,
    getRemixes: PropTypes.func.isRequired,
    getStudios: PropTypes.func.isRequired,
    loved: PropTypes.bool,
    projectInfo: PropTypes.shape({
        author: PropTypes.shape({
            id: PropTypes.number,
            username: PropTypes.string
        }),
        description: PropTypes.string,
        history: PropTypes.shape({
            created: PropTypes.string,
            modified: PropTypes.string,
            shared: PropTypes.string
        }),
        id: PropTypes.number,
        remix: PropTypes.shape({
            parent: PropTypes.number,
            root: PropTypes.number
        }),
        stats: PropTypes.shape({
            views: PropTypes.number,
            loves: PropTypes.number,
            favorites: PropTypes.number
        }),
        title: PropTypes.string
    }),
    remixes: PropTypes.arrayOf(PropTypes.object),
    sessionStatus: PropTypes.string,
    setFavedStatus: PropTypes.func.isRequired,
    setLovedStatus: PropTypes.func.isRequired,
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
    credit: state.preview.credit,
    comments: state.preview.comments,
    faved: state.preview.faved,
    loved: state.preview.loved,
    remixes: state.preview.remixes,
    sessionStatus: state.session.status,
    studios: state.preview.studios,
    user: state.session.session.user
});


const mapDispatchToProps = dispatch => ({
    getCreditInfo: id => {
        dispatch(previewActions.getCreditInfo(id));
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
        dispatch(previewActions.setLovedStatus(faved, id, username, token));
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
    setCreditInfo: info => {
        dispatch(previewActions.setCreditInfo(info));
    },
    updateProject: (id, formData, username, token) => {
        dispatch(previewActions.updateProject(id, formData, username, token));
    }
});

const ConnectedPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview);

render(
    <Page><ConnectedPreview /></Page>,
    document.getElementById('app'),
    {preview: previewActions.previewReducer}
);
