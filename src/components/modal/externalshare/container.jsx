const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const ExternalShareModalPresentation = require('./presentation.jsx');

class ExternalShareModal extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <ExternalShareModalPresentation
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                onSubmit={this.props.onRequestClose}
            />
        );
    }
}

ExternalShareModal.propTypes = {
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func
};

module.exports = ExternalShareModal;
