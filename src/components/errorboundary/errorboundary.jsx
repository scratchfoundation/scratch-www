const PropTypes = require('prop-types');
const React = require('react');

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

    componentDidCatch (error, info) {
        // Display fallback UI
        this.setState({
            hasError: true,
            errorId: window.Raven ? window.Raven.lastEventId() : null
        });
        if (window.Raven) {
            window.Raven.captureException(error, {extra: info});
        }
        log.error(`Unhandled Error: ${error}, info: ${info}`);
    }

    handleBack () {
        window.history.back();
    }

    render () {
        if (this.state.hasError) {
            return (
                <CrashMessageComponent
                    eventId={this.state.eventId}
                    onBack={this.handleBack}
                />
            );
        }
        return this.props.children;
    }
}
ErrorBoundary.propTypes = {
    children: PropTypes.node
};

module.exports = ErrorBoundary;
