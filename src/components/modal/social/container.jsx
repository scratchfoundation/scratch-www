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
        this.embedCopyTimeoutId = null;
        this.linkCopyTimeoutId = null;
        this.showCopyResultTimeout = 2000;
        this.state = {
            showEmbedResult: false,
            showLinkResult: false
        };
        bindAll(this, [
            'handleCopyEmbed',
            'handleCopyProjectLink',
            'hideEmbedResult',
            'hideLinkResult',
            'setEmbedTextarea'
        ]);
    }
    componentWillUnmount () {
        this.clearEmbedCopyResultTimeout();
    }
    handleCopyEmbed () {
        if (this.embedTextarea) {
            this.embedTextarea.select();
            clipboardCopy(this.embedTextarea.value);
            if (this.state.showEmbedResult === false && this.embedCopyTimeoutId === null) {
                this.setState({showEmbedResult: true}, () => {
                    this.embedCopyTimeoutId = setTimeout(
                        this.hideEmbedResult,
                        this.showCopyResultTimeout
                    );
                });
            }
        }
    }
    handleCopyProjectLink () {
        this.props.onCopyProjectLink();
        if (this.state.showLinkResult === false && this.linkCopyTimeoutId === null) {
            this.setState({showLinkResult: true}, () => {
                this.linkCopyTimeoutId = setTimeout(
                    this.hideLinkResult,
                    this.showCopyResultTimeout
                );
            });
        }
    }
    hideEmbedResult () {
        this.setState({showEmbedResult: false});
        this.embedCopyTimeoutId = null;
    }
    hideLinkResult () {
        this.setState({showLinkResult: false});
        this.linkCopyTimeoutId = null;
    }
    setEmbedTextarea (textarea) {
        this.embedTextarea = textarea;
        return textarea;
    }
    clearEmbedCopyResultTimeout () {
        if (this.embedCopyTimeoutId !== null) {
            clearTimeout(this.embedCopyTimeoutId);
            this.embedCopyTimeoutId = null;
        }
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
                showEmbedResult={this.state.showEmbedResult}
                showLinkResult={this.state.showLinkResult}
                twitterUrl={social.twitterIntentLink(projectId)}
                weChatUrl={social.weChatIntentLink(projectId)}
                onCopyEmbed={this.handleCopyEmbed}
                onCopyProjectLink={this.handleCopyProjectLink}
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
