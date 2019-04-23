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

const ExternalShareModalPresentation = ({
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
                            {intl.formatMessage({id: 'externalShare.socialMediaLabel'})}
                        </div>
                        <FlexRow className="externalShare-embed-row">
                            <a
                                alt="Google Classroom"
                                href={googleClassroomUrl}
                                target="_blank"
                            >
                                <div
                                    className={classNames(
                                        'externalShare-social-icon',
                                        'externalShare-google-classroom-icon'
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
                                        'externalShare-social-icon',
                                        'externalShare-wechat-icon'
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
                                        'externalShare-social-icon',
                                        'externalShare-facebook-icon'
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
                                        'externalShare-social-icon',
                                        'externalShare-twitter-icon'
                                    )}
                                />
                            </a>
                        </FlexRow>
                    </div>

                    <div className="externalShare-link-section">
                        <div className="externalShare-label">
                            {intl.formatMessage({id: 'externalShare.linkLabel'})}
                        </div>
                        <FlexRow className="externalShare-embed-row">
                            <Button
                                className="externalShare-copy-link-button"
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

ExternalShareModalPresentation.propTypes = {
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

module.exports = injectIntl(ExternalShareModalPresentation);
