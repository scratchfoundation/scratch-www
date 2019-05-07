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
        this.linkTextarea = {};
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
            'setEmbedTextarea',
            'setLinkTextarea'
        ]);
    }
    componentWillUnmount () {
        this.clearEmbedCopyResultTimeout();
        this.clearLinkCopyResultTimeout();
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
        if (this.linkTextarea) {
            this.linkTextarea.select();
            clipboardCopy(this.linkTextarea.value);
            if (this.state.showLinkResult === false && this.linkCopyTimeoutId === null) {
                this.setState({showLinkResult: true}, () => {
                    this.linkCopyTimeoutId = setTimeout(
                        this.hideLinkResult,
                        this.showCopyResultTimeout
                    );
                });
            }
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
    setLinkTextarea (textarea) {
        this.linkTextarea = textarea;
        return textarea;
    }
    clearEmbedCopyResultTimeout () {
        if (this.embedCopyTimeoutId !== null) {
            clearTimeout(this.embedCopyTimeoutId);
            this.embedCopyTimeoutId = null;
        }
    }
    clearLinkCopyResultTimeout () {
        if (this.linkCopyTimeoutId !== null) {
            clearTimeout(this.linkCopyTimeoutId);
            this.linkCopyTimeoutId = null;
        }
    }
    render () {
        const projectId = this.props.projectId;
        return (
            <SocialModalPresentation
                embedHtml={social.embedHtml(projectId)}
                isOpen={this.props.isOpen}
                projectUrl={social.projectUrl(projectId)}
                setEmbedTextarea={this.setEmbedTextarea}
                setLinkTextarea={this.setLinkTextarea}
                showEmbedResult={this.state.showEmbedResult}
                showLinkResult={this.state.showLinkResult}
                onCopyEmbed={this.handleCopyEmbed}
                onCopyProjectLink={this.handleCopyProjectLink}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

SocialModal.propTypes = {
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

module.exports = SocialModal;
