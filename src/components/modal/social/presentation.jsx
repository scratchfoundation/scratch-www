const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const classNames = require('classnames');

const Button = require('../../forms/button.jsx');
const Modal = require('../base/modal.jsx');
// const Form = require('../../forms/form.jsx');
// const Button = require('../../forms/button.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');
// const Input = require('../../forms/input.jsx');
// const TextArea = require('../../forms/textarea.jsx');
// const InplaceInput = require('../../forms/inplace-input.jsx');

require('../../forms/button.scss');
require('./modal.scss');

const SocialModalPresentation = ({
    embedHtml,
    fbUrl,
    googleClassroomUrl,
    intl,
    isOpen,
    onCopyEmbed,
    onCopyProjectLink,
    onRequestClose,
    setEmbedTextarea,
    showEmbedResult,
    showLinkResult,
    twitterUrl,
    weChatUrl
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
                <FlexRow className="social-row social-spaced-row">
                    <div>
                        <FlexRow className="social-label-row">
                            {intl.formatMessage({id: 'social.socialMediaLabel'})}
                        </FlexRow>
                        <FlexRow className="social-spaced-row">
                            <a
                                alt="Google Classroom"
                                href={googleClassroomUrl}
                                target="_blank"
                            >
                                <div
                                    className={classNames(
                                        'social-social-icon',
                                        'social-google-classroom-icon'
                                    )}
                                />
                            </a>
                            <a
                                alt="WeChat"
                                href={weChatUrl}
                                target="_blank"
                            >
                                <div
                                    className={classNames(
                                        'social-social-icon',
                                        'social-wechat-icon'
                                    )}
                                />
                            </a>
                            <a
                                alt="Facebook"
                                href={fbUrl}
                                target="_blank"
                            >
                                <div
                                    className={classNames(
                                        'social-social-icon',
                                        'social-facebook-icon'
                                    )}
                                />
                            </a>
                            <a
                                alt="Twitter"
                                href={twitterUrl}
                                target="_blank"
                            >
                                <div
                                    className={classNames(
                                        'social-social-icon',
                                        'social-twitter-icon'
                                    )}
                                />
                            </a>
                        </FlexRow>
                    </div>

                    <div className="social-link-section">
                        <FlexRow className="social-label-row">
                            <div className="social-label">
                                {intl.formatMessage({id: 'social.linkLabel'})}
                            </div>
                            <div
                                className={classNames(
                                    'social-label',
                                    'social-label-result',
                                    {'social-hidden': !showLinkResult}
                                )}
                            >
                                {intl.formatMessage({id: 'social.embedCopiedResultText'})}
                            </div>
                        </FlexRow>
                        <FlexRow className="social-spaced-row">
                            <Button
                                className="social-copy-link-button social-copy-link-button-large"
                                onClick={onCopyProjectLink}
                            >
                                <FormattedMessage id="general.copyLink" />
                            </Button>
                        </FlexRow>
                    </div>
                </FlexRow>

                <div className="embed-section">
                    <FlexRow className="social-row social-spaced-row">
                        <FlexRow className="social-label-row">
                            <div className="social-label">
                                {intl.formatMessage({id: 'social.embedHtmlLabel'})}
                            </div>
                            <div className="social-label">
                                <a
                                    onClick={onCopyEmbed}
                                >
                                    {intl.formatMessage({id: 'social.copyEmbedLinkText'})}
                                </a>
                            </div>
                            <div
                                className={classNames(
                                    'social-label',
                                    'social-label-result',
                                    {'social-hidden': !showEmbedResult}
                                )}
                            >
                                {intl.formatMessage({id: 'social.embedCopiedResultText'})}
                            </div>
                        </FlexRow>
                        {/*
                        <InplaceInput
                            className={classNames('compose-input', 'compose-valid')}
                            name="embed"
                            type="textarea"
                            value={embedHtml}
                            onClick={onCopyEmbed}
                        />
                        */}

                        <textarea
                            readOnly
                            className="social-embed-textarea"
                            name="embed"
                            ref={textarea => setEmbedTextarea(textarea)}
                            value={embedHtml}
                            onClick={onCopyEmbed}
                        />
                    </FlexRow>
                </div>
            </div>
        </Modal>
    );
};

SocialModalPresentation.propTypes = {
    embedHtml: PropTypes.string,
    fbUrl: PropTypes.string,
    googleClassroomUrl: PropTypes.string,
    intl: intlShape,
    isOpen: PropTypes.bool,
    onCopyEmbed: PropTypes.func,
    onCopyProjectLink: PropTypes.func,
    onRequestClose: PropTypes.func,
    setEmbedTextarea: PropTypes.func,
    showEmbedResult: PropTypes.bool,
    showLinkResult: PropTypes.bool,
    twitterUrl: PropTypes.string,
    weChatUrl: PropTypes.string
};

module.exports = injectIntl(SocialModalPresentation);
