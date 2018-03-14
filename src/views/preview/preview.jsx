const React = require('react');
const PropTypes = require('prop-types');
const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const api = require('../../lib/api');
const log = require('../../lib/log.js');

const PreviewPresentation = require('./presentation.jsx');

const sessionActions = require('../../redux/session.js');
const previewActions = require('../../redux/preview.js');

class Preview extends React.Component {
    constructor (props) {
        super(props);
    }
    componentDidMount () {
        let pathname = window.location.pathname.toLowerCase();
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        const path = pathname.split('/');
        const projectId = path[path.length - 1];
        this.props.getProjectInfo(projectId);
        this.props.getRemixes(projectId);
        // get comments
        // get studios

    }
    componentDidUpdate (prevProps) {
        if (this.props.projectInfo.id !== prevProps.projectInfo.id && this.props.projectInfo.remix.root !== null) {
            this.props.getCreditInfo(this.props.projectInfo.remix.root);
        }

    }
    render () {
        return (
            <PreviewPresentation
                comments={this.props.comments}
                creditInfo={this.props.credit}
                projectInfo={this.props.projectInfo}
                remixes={this.props.remixes}
                sessionStatus={this.props.sessionStatus}
                studios={this.props.studios}
            />
        );
    }
}

Preview.propTypes = {
    sessionStatus: PropTypes.string,
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
    remixes: state.preview.remixes,
    sessionStatus: state.session.status,
    studios: state.preview.studios,
    user: state.session.session.user
});


const mapDispatchToProps = dispatch => ({
    getCreditInfo: (id) => {
        dispatch(previewActions.getCreditInfo(id));
    },
    getProjectInfo: (id) => {
        dispatch(previewActions.getProjectInfo(id));
    },
    getRemixes: (id) => {
        dispatch(previewActions.getRemixes(id));
    },
    refreshSession: () => {
        dispatch(sessionActions.refreshSession());
    },
    setCreditInfo: (info) => {
        dispatch(previewActions.setCreditInfo(info));
    },
    setProjectInfo: (info) => {
        dispatch(previewActions.setProjectInfo(info));
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
