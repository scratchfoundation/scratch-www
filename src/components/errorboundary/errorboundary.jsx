const PropTypes = require('prop-types');
const React = require('react');

const CrashMessageComponent = require('../crashmessage/crashmessage.jsx');
import log from '../../lib/log.js';

class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch (error, info) {
        // Display fallback UI
        this.setState({hasError: true});
        log.error(`Unhandled Error: ${error}, info: ${info}`);
    }

    handleBack () {
        window.history.back();
    }

    render () {
        if (this.state.hasError) {
            return <CrashMessageComponent onBack={this.handleBack} />;
        }
        return this.props.children;
    }
}
ErrorBoundary.propTypes = {
    children: PropTypes.node
};

module.exports = ErrorBoundary;
