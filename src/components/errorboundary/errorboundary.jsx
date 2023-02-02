const PropTypes = require('prop-types');
const React = require('react');

const CrashMessageComponent = require('../crashmessage/crashmessage.jsx');
import log from '../../lib/log.js';

class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    /**
     * Handle an error caught by this ErrorBoundary component.
     * @param {Error} error - the error that was caught.
     * @param {React.ErrorInfo} errorInfo - the React error info associated with the error.
     */
    componentDidCatch (error, errorInfo) {
        error = error || {
            stack: 'Unknown stack',
            message: 'Unknown error'
        };
        errorInfo = errorInfo || {
            componentStack: 'Unknown component stack'
        };

        // only remember the first error: later errors might just be side effects of that first one
        if (!this.state.error) {
            // store error & errorInfo for debugging
            this.setState({
                error,
                errorInfo
            });
        }

        // report every error in the console
        const componentInfo = this.props.componentName ? ` in ${this.props.componentName}` : '';
        log.error(`Unhandled Error${componentInfo}: ${error.stack}\nComponent stack: ${errorInfo.componentStack}`);
    }

    handleBack () {
        window.history.back();
    }

    render () {
        if (this.state.error) {
            return (
                <CrashMessageComponent
                    onBack={this.handleBack}
                />
            );
        }
        return this.props.children;
    }
}
ErrorBoundary.propTypes = {
    children: PropTypes.node,
    componentName: PropTypes.string
};

module.exports = ErrorBoundary;
