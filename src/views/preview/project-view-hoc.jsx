const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const connect = require('react-redux').connect;

const storage = require('../../lib/storage.js').default;
const previewActions = require('../../redux/preview.js');

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

/**
 * Higher-order component for presenting a project view.
 * @param  {React.Component} Component a project view component
 * @return {React.Component}           a wrapped project view component
 */

const ProjectViewHOC = Component => {
    class WrappedComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'fetchProjectData'
            ]);
        }
        fetchProjectData (projectId) {
            if (projectId <= 0) return Promise.reject(null);
            return storage
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
                        input = JSON.stringify(input); // NOTE: what is the point of doing this??
                    }
                });
        }
        render () {
            return (<Component
                fetchProjectData={this.fetchProjectData}
                {...this.props}
            />);
        }
    }

    WrappedComponent.propTypes = {
        assetHost: PropTypes.string.isRequired,
        projectHost: PropTypes.string.isRequired
    };

    WrappedComponent.defaultProps = {
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

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WrappedComponent);
};

module.exports = ProjectViewHOC;
