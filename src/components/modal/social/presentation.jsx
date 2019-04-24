const bindAll = require('lodash.bindall');
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
            <div className="social-modal-content modal-content">

                <div className="social-label">
                    {intl.formatMessage({id: 'social.embedHtmlLabel'})}
                </div>
                <FlexRow className="social-embed-row">
                    <textarea
                        readOnly
                        className="social-embed-textarea"
                        name="embed"
                        ref={textarea => setEmbedTextarea(textarea)}
                        value={embedHtml}
                        onClick={onCopyEmbed}
                    />
                    <div
                        className="social-copy-icon"
                        onClick={onCopyEmbed}
                    />
                </FlexRow>

                <FlexRow className="social-embed-row">
                    <div>
                        <div className="social-label">
                            {intl.formatMessage({id: 'social.socialMediaLabel'})}
                        </div>
                        <FlexRow className="social-embed-row">
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
                        <div className="social-label">
                            {intl.formatMessage({id: 'social.linkLabel'})}
                        </div>
                        <FlexRow className="social-embed-row">
                            <Button
                                className="social-copy-link-button"
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
    twitterUrl: PropTypes.string,
    weChatUrl: PropTypes.string
};

module.exports = injectIntl(SocialModalPresentation);
