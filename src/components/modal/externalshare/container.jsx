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
            'handleClickCopyEmbed',
            'setEmbedTextarea'
        ]);
    }
    // componentDidMount () {
    //     if (this.embedTextarea) this.embedTextarea.select();
    // }
    componentDidUpdate () {
        if (this.embedTextarea) {
            console.log('selecting');
            this.embedTextarea.select();
        } else {
            console.log('NOT selecting');
        }
    }
    handleClickCopyEmbed () {
        if (this.embedTextarea) this.embedTextarea.select();
        clipboardCopy(this.embedTextarea.value);
    }
    setEmbedTextarea (textarea) {
        this.embedTextarea = textarea;
    }
    render () {
        const projectId = this.props.projectId;
        return (
            <ExternalShareModalPresentation
                fbUrl={externalShare.facebookIntentLink(projectId)}
                googUrl={externalShare.googleClassroomIntentLink(projectId)}
                isOpen={this.props.isOpen}
                setEmbedTextarea={this.setEmbedTextarea}
                twitterUrl={externalShare.twitterIntentLink(projectId)}
                onClickCopyEmbed={this.handleClickCopyEmbed}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

ExternalShareModal.propTypes = {
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    projectId: PropTypes.string
};

module.exports = ExternalShareModal;
