const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const AddToStudioModalPresentation = require('./presentation.jsx');

class AddToStudioModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleRequestClose',
            'handleSubmit',
            'handleToggleStudio'
        ]);

        this.state = {
            waitingToClose: false
        };
    }

    UNSAFE_componentWillUpdate () {
        this.closeIfFinishedUpdating();
    }

    hasOutstandingUpdates () {
        return (this.props.studios.some(studio => (studio.hasRequestOutstanding === true)));
    }

    closeIfFinishedUpdating () {
        if (this.state.waitingToClose === true && this.hasOutstandingUpdates() === false) {
            this.closeAndStopWaiting();
        }
    }

    // before closing, set waitingToClose to false. That way, if user reopens
    // modal, it won't unexpectedly close.
    closeAndStopWaiting () {
        this.setState({waitingToClose: false}, () => {
            this.props.onRequestClose();
        });
    }

    handleRequestClose () {
        this.closeAndStopWaiting();
    }

    handleSubmit () {
        this.setState({waitingToClose: true}, () => {
            this.closeIfFinishedUpdating();
        });
    }

    handleToggleStudio (id) {
        const studioId = parseInt(id, 10);
        if (isNaN(studioId)) { // sanity check in case event had no integer data-id
            return;
        }
        this.props.onToggleStudio(this.props.studios.find(studio => studio.id === studioId));
    }

    render () {
        return (
            <AddToStudioModalPresentation
                isOpen={this.props.isOpen}
                studios={this.props.studios}
                waitingToClose={this.state.waitingToClose}
                onRequestClose={this.handleRequestClose}
                onSubmit={this.handleSubmit}
                onToggleStudio={this.handleToggleStudio}
            />
        );
    }
}

AddToStudioModal.propTypes = {
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onToggleStudio: PropTypes.func,
    studios: PropTypes.arrayOf(PropTypes.object)
};

module.exports = AddToStudioModal;
