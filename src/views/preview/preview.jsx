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

class Preview extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getProjectInfo'
        ]);
        this.state = {
            projectInfo: {} // project data to show
        };
    }
    componentDidMount () {
        let pathname = window.location.pathname.toLowerCase();
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        const path = pathname.split('/');
        const projectId = path[path.length - 1];
        this.getProjectInfo(projectId);
    }
    getProjectInfo (projectId) {
        api({
            uri: `/projects/${projectId}`
        }, (err, body) => {
            if (!body) return log.error('No project info');
            if (!err) return this.setState({projectInfo: body});
        });
    }
    render () {
        return (
            <PreviewPresentation
                projectInfo={this.state.projectInfo}
                sessionStatus={this.props.sessionStatus}
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
    sessionStatus: state.session.status,
    user: state.session.session.user
});

const mapDispatchToProps = dispatch => ({
    refreshSession: () => {
        dispatch(sessionActions.refreshSession());
    }
});

const ConnectedPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview);

render(<Page><ConnectedPreview /></Page>, document.getElementById('app'));
