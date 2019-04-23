const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;

const Button = require('../../forms/button.jsx');
const Modal = require('../base/modal.jsx');
// const Form = require('../../forms/form.jsx');
// const Button = require('../../forms/button.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');
// const Input = require('../../forms/input.jsx');
// const TextArea = require('../../forms/textarea.jsx');

require('../../forms/button.scss');
require('./modal.scss');

const ExternalShareModalPresentation = ({
    embedHtml,
    fbUrl,
    googUrl,
    intl,
    isOpen,
    onCopyEmbed,
    onCopyProjectLink,
    onRequestClose,
    setEmbedTextarea,
    twitterUrl
}) => {
    const title = intl.formatMessage({id: 'externalshare.title'});

    return (
        <Modal
            useStandardSizes
            className="mod-externalShare"
            contentLabel={title}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <div className="externalShare-modal-header modal-header">
                <div className="externalShare-content-label content-label">
                    <FormattedMessage id="externalShare.title" />
                </div>
            </div>
            <div className="externalShare-modal-content modal-content">

                <div className="externalShare-label">
                    {intl.formatMessage({id: 'externalShare.embedHtmlLabel'})}
                </div>
                <FlexRow className="externalShare-embed-row">
                    <textarea
                        readOnly
                        className="externalShare-embed-textarea"
                        name="embed"
                        ref={textarea => setEmbedTextarea(textarea)}
                        value={embedHtml}
                        onClick={onCopyEmbed}
                    />
                    <div
                        className="externalShare-copy-icon"
                        onClick={onCopyEmbed}
                    />
                </FlexRow>

                <FlexRow className="externalShare-embed-row">
                    <div>
                        <div className="externalShare-label">
                            {intl.formatMessage({id: 'externalShare.embedHtmlLabel'})}
                        </div>
                        <FlexRow className="externalShare-embed-row">
                            <a
                                href={twitterUrl}
                                target="_blank"
                            >
                                Tweet
                            </a>
                            <a
                                href={fbUrl}
                                target="_blank"
                            >
                                FB Post
                            </a>
                            <a
                                href={googUrl}
                                target="_blank"
                            >
                                G classroom
                            </a>
                        </FlexRow>
                    </div>

                    <div>
                        <div className="externalShare-label">
                            {intl.formatMessage({id: 'externalShare.linkLabel'})}
                        </div>
                        <FlexRow className="externalShare-embed-row">
                            <Button
                                className="action-button copy-link-button"
                                onClick={onCopyProjectLink}
                            >
                                <FormattedMessage id="general.copyLink" />
                            </Button>
                        </FlexRow>
                    </div>
                </FlexRow>

            </div>
        </Modal>
    );
}

ExternalShareModalPresentation.propTypes = {
    embedHtml: PropTypes.string,
    fbUrl: PropTypes.string,
    googUrl: PropTypes.string,
    intl: intlShape,
    isOpen: PropTypes.bool,
    onCopyEmbed: PropTypes.func,
    onCopyProjectLink: PropTypes.func,
    onRequestClose: PropTypes.func,
    setEmbedTextarea: PropTypes.func,
    twitterUrl: PropTypes.string
};

module.exports = injectIntl(ExternalShareModalPresentation);
