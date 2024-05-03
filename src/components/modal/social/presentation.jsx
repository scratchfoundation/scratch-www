const PropTypes = require('prop-types');
const React = require('react');
const injectIntl = require('react-intl').injectIntl;
const classNames = require('classnames');

const intlShape = require('../../../lib/intl-shape');
const Modal = require('../base/modal.jsx');
const ModalTitle = require('../base/modal-title.jsx');
const ModalInnerContent = require('../base/modal-inner-content.jsx');

const FlexRow = require('../../flex-row/flex-row.jsx');

require('../../forms/button.scss');
require('./modal.scss');

const SocialModalPresentation = ({
    embedHtml,
    intl,
    isOpen,
    onCopyEmbed,
    onCopyProjectLink,
    onRequestClose,
    projectUrl,
    setEmbedTextarea,
    setLinkTextarea,
    showEmbedResult,
    showLinkResult
}) => {
    const title = intl.formatMessage({id: 'general.copyLink'});

    return (
        <Modal
            useStandardSizes
            className="mod-social"
            contentLabel={title}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <div className="social-modal-header modal-header">
                <ModalTitle title={intl.formatMessage({id: 'general.copyLink'})} />
            </div>
            <ModalInnerContent className="social-modal-content">

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
                                        {intl.formatMessage({id: 'social.copyLinkLinkText'})}
                                    </a>
                                </div>
                            </FlexRow>
                        </FlexRow>
                        <input
                            readOnly
                            className="social-form social-input"
                            name="link"
                            ref={textarea => setLinkTextarea(textarea)}
                            value={projectUrl}
                        />
                    </FlexRow>
                </div>

                {/* bottom row: embed */}
                <div className="embed-section">
                    <FlexRow className="social-row social-spaced-row">
                        <FlexRow className="social-label-row">
                            <div className="social-label-title">
                                {intl.formatMessage({id: 'social.embedLabel'})}
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
                            className="social-form social-textarea"
                            name="embed"
                            ref={textarea => setEmbedTextarea(textarea)}
                            value={embedHtml}
                        />
                    </FlexRow>
                </div>

            </ModalInnerContent>
        </Modal>
    );
};

SocialModalPresentation.propTypes = {
    embedHtml: PropTypes.string,
    intl: intlShape,
    isOpen: PropTypes.bool,
    onCopyEmbed: PropTypes.func,
    onCopyProjectLink: PropTypes.func,
    onRequestClose: PropTypes.func,
    projectUrl: PropTypes.string,
    setEmbedTextarea: PropTypes.func,
    setLinkTextarea: PropTypes.func,
    showEmbedResult: PropTypes.bool,
    showLinkResult: PropTypes.bool
};

module.exports = injectIntl(SocialModalPresentation);
