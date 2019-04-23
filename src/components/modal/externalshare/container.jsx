const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const ExternalShareModalPresentation = require('./presentation.jsx');
const clipboardCopy = require('clipboard-copy');
const externalShare = require('../../../lib/external-share');

class ExternalShareModal extends React.Component {
    constructor (props) {
        super(props);
        this.embedTextarea = {};
        bindAll(this, [
            'handleCopyEmbed',
            'setEmbedTextarea'
        ]);
    }
    // componentDidMount () {
    //     if (this.embedTextarea) {
    //         console.log('selecting on mount');
    //         this.embedTextarea.select();
    //     }
    // }
    componentDidUpdate () {
        if (this.embedTextarea) {
            console.log('selecting');
            this.embedTextarea.select();
        } else {
            console.log('NOT selecting');
        }
    }
    handleCopyEmbed () {
        if (this.embedTextarea) this.embedTextarea.select();
        clipboardCopy(this.embedTextarea.value);
    }
    setEmbedTextarea (textarea) {
        this.embedTextarea = textarea;
        return textarea;
    }
    render () {
        const projectId = this.props.projectId;
        return (
            <ExternalShareModalPresentation
                embedHtml={externalShare.embedHtml(projectId)}
                fbUrl={externalShare.facebookIntentLink(projectId)}
                googUrl={externalShare.googleClassroomIntentLink(projectId)}
                isOpen={this.props.isOpen}
                setEmbedTextarea={this.setEmbedTextarea}
                twitterUrl={externalShare.twitterIntentLink(projectId)}
                onCopyEmbed={this.handleCopyEmbed}
                onCopyProjectLink={this.props.onCopyProjectLink}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

ExternalShareModal.propTypes = {
    isOpen: PropTypes.bool,
    onCopyProjectLink: PropTypes.func,
    onRequestClose: PropTypes.func,
    projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

module.exports = ExternalShareModal;
