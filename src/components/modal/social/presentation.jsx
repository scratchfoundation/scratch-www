const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const classNames = require('classnames');

const Button = require('../../forms/button.jsx');
const Modal = require('../base/modal.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');

require('../../forms/button.scss');
require('./modal.scss');

const SocialModalPresentation = ({
    embedHtml,
    intl,
    isOpen,
    linkUrl,
    onClickEmbedText,
    onCopyEmbed,
    onCopyProjectLink,
    onRequestClose,
    setEmbedTextarea,
    setLinkTextarea,
    showEmbedResult,
    showLinkResult
}) => {
    const title = intl.formatMessage({id: 'social.title'});

    return (
        <Modal
            useStandardSizes
            className="mod-social"
            contentLabel={title}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <div className="social-modal-header modal-header">
                <div className="social-content-label content-label">
                    <FormattedMessage id="social.title" />
                </div>
            </div>
            <div className="modal-content social-modal-content">

                {/* top row: link */}
                <div className="link-section">
                    <FlexRow className="social-row social-spaced-row">
                        <FlexRow className="social-label-row">
                            <div className="social-label-title">
                                {intl.formatMessage({id: 'social.linkLabel'})}
                            </div>
                            <FlexRow className="social-spaced-row social-row-right">
                                <div
                                    className={classNames(
                                        'social-label-item',
                                        'social-label-result',
                                        {'social-hidden': !showLinkResult}
                                    )}
                                >
                                    {intl.formatMessage({id: 'social.embedCopiedResultText'})}
                                </div>
                                <div className="social-label-item">
                                    <a
                                        onClick={onCopyProjectLink}
                                    >
                                        {intl.formatMessage({id: 'general.copyLink'})}
                                    </a>
                                </div>
                            </FlexRow>
                        </FlexRow>
                        <textarea
                            readOnly
                            className="social-link-textarea"
                            name="link"
                            ref={textarea => setLinkTextarea(textarea)}
                            value={linkUrl}
                            onClick={onClickProjectLinkText}
                        />
                    </FlexRow>
                </div>

                {/* bottom row: embed */}
                <div className="embed-section">
                    <FlexRow className="social-row social-spaced-row">
                        <FlexRow className="social-label-row">
                            <div className="social-label-title">
                                {intl.formatMessage({id: 'social.embedHtmlLabel'})}
                            </div>
                            <FlexRow className="social-spaced-row social-row-right">
                                <div
                                    className={classNames(
                                        'social-label-item',
                                        'social-label-result',
                                        {'social-hidden': !showEmbedResult}
                                    )}
                                >
                                    {intl.formatMessage({id: 'social.embedCopiedResultText'})}
                                </div>
                                <div className="social-label-item">
                                    <a
                                        onClick={onCopyEmbed}
                                    >
                                        {intl.formatMessage({id: 'social.copyEmbedLinkText'})}
                                    </a>
                                </div>
                            </FlexRow>
                        </FlexRow>
                        <textarea
                            readOnly
                            className="social-embed-textarea"
                            name="embed"
                            ref={textarea => setEmbedTextarea(textarea)}
                            value={embedHtml}
                            onClick={onClickEmbedText}
                        />
                    </FlexRow>
                </div>

            </div>
        </Modal>
    );
};

SocialModalPresentation.propTypes = {
    embedHtml: PropTypes.string,
    intl: intlShape,
    isOpen: PropTypes.bool,
    linkUrl: PropTypes.string,
    onClickEmbedText: PropTypes.func,
    onCopyEmbed: PropTypes.func,
    onCopyProjectLink: PropTypes.func,
    onRequestClose: PropTypes.func,
    setEmbedTextarea: PropTypes.func,
    setLinkTextarea: PropTypes.func,
    showEmbedResult: PropTypes.bool,
    showLinkResult: PropTypes.bool
};

module.exports = injectIntl(SocialModalPresentation);
