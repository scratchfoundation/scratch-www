// embed view

const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const connect = require('react-redux').connect;
const injectIntl = require('react-intl').injectIntl;

const Page = require('../../components/page/www/page.jsx');
const storage = require('../../lib/storage.js').default;
const jar = require('../../lib/jar.js');
const projectShape = require('./projectshape.jsx').projectShape;
const NotAvailable = require('../../components/not-available/not-available.jsx');
const Meta = require('./meta.jsx');

const sessionActions = require('../../redux/session.js');
const previewActions = require('../../redux/preview.js');

const GUI = require('scratch-gui');
const IntlGUI = injectIntl(GUI.default);

const Sentry = require('@sentry/browser');
if (`${process.env.SENTRY_DSN}` !== '') {
    Sentry.init({
        dsn: `${process.env.SENTRY_DSN}`,
        // Do not collect global onerror, only collect specifically from React error boundaries.
        // TryCatch plugin also includes errors from setTimeouts (i.e. the VM)
        integrations: integrations => integrations.filter(i =>
            !(i.name === 'GlobalHandlers' || i.name === 'TryCatch'))
    });
    window.Sentry = Sentry; // Allow GUI access to Sentry via window
}

class EmbedView extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
        ]);
        const pathname = window.location.pathname.toLowerCase();
        const parts = pathname.split('/').filter(Boolean);
        this.state = {
            extensions: [],
            invalidProject: parts.length === 1,
            projectId: parts[1]
        };
    }
    componentDidUpdate (prevProps) {
        if (this.state.projectId > 0 &&
            ((this.props.sessionStatus !== prevProps.sessionStatus &&
            this.props.sessionStatus === sessionActions.Status.FETCHED))) {
            this.props.getProjectInfo(this.state.projectId);
            this.getProjectData(this.state.projectId, true /* Show cloud/username alerts */);
        }
    }
    getProjectData (projectId) {
        if (projectId <= 0) return 0;
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
            });
    }
    handleSetLanguage (locale) {
        jar.set('scratchlanguage', locale);
    }
    render () {
        if (this.props.projectNotAvailable || this.state.invalidProject) {
            return (
                <Page>
                    <div className="preview">
                        <NotAvailable />
                    </div>
                </Page>
            );
        }

        return (
            <React.Fragment>
                <Meta projectInfo={this.props.projectInfo} />
                <React.Fragment>
                    <IntlGUI
                        assetHost={this.props.assetHost}
                        basePath="/"
                        className="gui"
                        projectHost={this.props.projectHost}
                        projectId={this.state.projectId}
                        projectTitle={this.props.projectInfo.title}
                        onSetLanguage={this.handleSetLanguage}
                    />
                </React.Fragment>
            </React.Fragment>
        );
    }
}

EmbedView.propTypes = {
    assetHost: PropTypes.string.isRequired,
    getProjectInfo: PropTypes.func.isRequired,
    projectHost: PropTypes.string.isRequired,
    projectInfo: projectShape,
    projectNotAvailable: PropTypes.bool,
    sessionStatus: PropTypes.string
};

EmbedView.defaultProps = {
    assetHost: process.env.ASSET_HOST,
    projectHost: process.env.PROJECT_HOST
};

const mapStateToProps = state => ({
    projectInfo: state.preview.projectInfo,
    projectNotAvailable: state.preview.projectNotAvailable
});

const mapDispatchToProps = dispatch => ({
    getProjectInfo: (id, token) => {
        dispatch(previewActions.getProjectInfo(id, token));
    }
});

module.exports.View = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmbedView);

// initialize GUI by calling its reducer functions depending on URL
GUI.setAppElement(document.getElementById('app'));
module.exports.initGuiState = guiInitialState => {
    const pathname = window.location.pathname.toLowerCase();
    const parts = pathname.split('/').filter(Boolean);
    // parts[0]: 'projects'
    // parts[1]: either :id or 'editor'
    // parts[2]: undefined if no :id, otherwise either 'editor', 'fullscreen' or 'embed'
    if (parts.indexOf('embed') !== -1) {
        guiInitialState = GUI.initEmbedded(guiInitialState);
    }
    return guiInitialState;
};

module.exports.guiReducers = GUI.guiReducers;
module.exports.guiInitialState = GUI.guiInitialState;
module.exports.guiMiddleware = GUI.guiMiddleware;
module.exports.initLocale = GUI.initLocale;
module.exports.localesInitialState = GUI.localesInitialState;
