const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const SocialModalPresentation = require('./presentation.jsx');
const clipboardCopy = require('clipboard-copy');
const social = require('../../../lib/social');

class SocialModal extends React.Component {
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
            <SocialModalPresentation
                embedHtml={social.embedHtml(projectId)}
                fbUrl={social.facebookIntentLink(projectId)}
                googleClassroomUrl={social.googleClassroomIntentLink(projectId)}
                isOpen={this.props.isOpen}
                setEmbedTextarea={this.setEmbedTextarea}
                twitterUrl={social.twitterIntentLink(projectId)}
                weChatUrl={social.weChatIntentLink(projectId)}
                onCopyEmbed={this.handleCopyEmbed}
                onCopyProjectLink={this.props.onCopyProjectLink}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

SocialModal.propTypes = {
    isOpen: PropTypes.bool,
    onCopyProjectLink: PropTypes.func,
    onRequestClose: PropTypes.func,
    projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

module.exports = SocialModal;
