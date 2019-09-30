const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
const connect = require('react-redux').connect;

const previewActions = require('../../redux/preview.js');

/**
 * Higher-order component for presenting a project view.
 * @param  {React.Component} Component a project view component
 * @return {React.Component}           a wrapped project view component
 */

const ProjectViewHOC = Component => {
    // initialize Sentry instance, making sure it hasn't been initialized already
    if (!window.Sentry && `${process.env.SENTRY_DSN}` !== '') {
        const Sentry = require('@sentry/browser');
        Sentry.init({
            dsn: `${process.env.SENTRY_DSN}`,
            // Do not collect global onerror, only collect specifically from React error boundaries.
            // TryCatch plugin also includes errors from setTimeouts (i.e. the VM)
            integrations: integrations => integrations.filter(i =>
                !(i.name === 'GlobalHandlers' || i.name === 'TryCatch'))
        });
        window.Sentry = Sentry; // Allow GUI access to Sentry via window
    }

    class WrappedComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
            ]);
        }
        render () {
            return (<Component
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
