const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const log = require('../../../lib/log.js');
const AddToStudioModalPresentation = require('./presentation.jsx');
const previewActions = require('../../../redux/preview.js');

class AddToStudioModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'closeAndStopWaiting',
            'handleSubmit'
        ]);

        this.state = {
            waitingToClose: false
        };
    }

    componentWillUpdate (prevProps) {
        this.checkIfFinishedUpdating();
    }

    hasOutstandingUpdates () {
        return (this.props.studios.some(studio => (studio.hasRequestOutstanding === true)));
    }

    checkIfFinishedUpdating () {
        if (this.state.waitingToClose === true && this.hasOutstandingUpdates() === false) {
            this.closeAndStopWaiting();
        }
    }

    // need to register here that we are no longer waiting for the modal to close.
    // Otherwise, user may reopen modal only to have it immediately close.
    closeAndStopWaiting () {
        this.setState({waitingToClose: false}, () => {
            this.props.onRequestClose();
        });
    }

    handleSubmit (formData) {
        this.setState({waitingToClose: true}, () => {
            this.checkIfFinishedUpdating();
        });
    }

    render () {
        return (
          <AddToStudioModalPresentation
              studios={this.props.studios}
              isOpen={this.props.isOpen}
              waitingToClose={this.state.waitingToClose}
              onRequestClose={this.closeAndStopWaiting}
              onToggleStudio={this.props.onToggleStudio}
              onSubmit={this.handleSubmit}
          />
        );
    }
}

AddToStudioModal.propTypes = {
    isOpen: PropTypes.bool,
    studios: PropTypes.arrayOf(PropTypes.object),
    onToggleStudio: PropTypes.func,
    onRequestClose: PropTypes.func
};

module.exports = AddToStudioModal;
