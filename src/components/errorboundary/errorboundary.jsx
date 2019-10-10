const PropTypes = require('prop-types');
const React = require('react');
const Sentry = require('@sentry/browser');

const CrashMessageComponent = require('../crashmessage/crashmessage.jsx');
import log from '../../lib/log.js';

class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false,
            errorId: null
        };
    }

    componentDidCatch (error, errorInfo) {
        // Display fallback UI
        Sentry.withScope(scope => {
            scope.setTag('project', 'scratch-www');
            if (this.props.name) {
                scope.setTag('errorboundary', this.props.name);
            }
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
        this.setState({
            hasError: true,
            errorId: Sentry.lastEventId()
        });
        log.error(`Unhandled Error: ${error}, info: ${errorInfo}`);
    }

    handleBack () {
        window.history.back();
    }

    render () {
        if (this.state.hasError) {
            return (
                <CrashMessageComponent
                    eventId={this.state.errorId}
                    onBack={this.handleBack}
                />
            );
        }
        return this.props.children;
    }
}
ErrorBoundary.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string
};

module.exports = ErrorBoundary;
