const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;

const Modal = require('../base/modal.jsx');
// const Form = require('../../forms/form.jsx');
// const Button = require('../../forms/button.jsx');
const FlexRow = require('../../flex-row/flex-row.jsx');
// const Input = require('../../forms/input.jsx');
// const TextArea = require('../../forms/textarea.jsx');

require('../../forms/button.scss');
require('./modal.scss');

const ExternalShareModalPresentation = ({
    fbUrl,
    googUrl,
    intl,
    isOpen,
    onRequestClose,
    projectId,
    twitterUrl
}) => {
    const contentLabel = intl.formatMessage({id: 'externalshare.title'});

    return (
        <Modal
            useStandardSizes
            className="mod-externalShare"
            contentLabel={contentLabel}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <div className="externalShare-modal-header modal-header">
                <div className="externalShare-content-label content-label">
                    Send outside Scratch
                </div>
            </div>
            <div className="externalShare-modal-content modal-content">
            {/*
                <div className="external-target-outer-scrollbox">
                    <div className="external-target-inner-scrollbox">
                        <div className="external-target-container">
*/}
                <div className="username-label">
                    <b>
                        {this.props.intl.formatMessage({id: 'externalShare.embedHtmlContent'})}
                    </b>

                </div>
                <FlexRow className="externalShare-embed-row">
                    <textarea
                        readOnly
                        className="externalShare-embed-textarea"
                        name="embed"
                        ref={textarea => this.embedTextarea = textarea}
                        value={externalShare.embedHtml(projectId)}
                        onClick={this.onClickCopyEmbed}
                    />
                    <div
                        className="externalShare-copy-icon"
                        onClick={this.onClickCopyEmbed}
                    />
                </FlexRow>

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


                {/*
                        </div>
                    </div>
                </div>

                <Form
                    // className="external-share"
                    onSubmit={onSubmit}
                >
                    <FlexRow className="action-buttons">
                        <Button
                            className="action-button submit-button"
                            key="submitButton"
                            type="submit"
                        >
                            <div className="action-button-text">
                                <FormattedMessage id="general.done" />
                            </div>
                        </Button>
                    </FlexRow>
                </Form>
                */}
            </div>
        </Modal>
    );
}

ExternalShareModalPresentation.propTypes = {
    fbUrl: PropTypes.string,
    googUrl: PropTypes.string,
    intl: intlShape,
    isOpen: PropTypes.bool,
    onClickCopyEmbed: PropTypes.func,
    onRequestClose: PropTypes.func,
    projectId: PropTypes.string,
    setEmbedTextarea: PropTypes.string,
    twitterUrl: PropTypes.string,
};

module.exports = injectIntl(ExternalShareModalPresentation);

                                //
                                //     {/*
                                // <Form
                                //     className="externalShare-form"
                                //     ref={form => {
                                //         this.form = form;
                                //     }}
                                //     onSubmit={onSubmit}
                                //     onValidSubmit={this.handleValidSubmit}
                                // >
                                // */}
                                //     {/*
                                //         <FlexRow className="action-buttons">
                                //             <Button
                                //                 className="action-button close-button white"
                                //                 key="closeButton"
                                //                 name="closeButton"
                                //                 type="button"
                                //                 onClick={onRequestClose}
                                //             >
                                //                 <div className="action-button-text">
                                //                     <FormattedMessage id="general.close" />
                                //                 </div>
                                //             </Button>
                                //         </FlexRow>
                                //         */}
                                //
                                //
                                //         {/*
                                //         {this.props.usernameHelp ? (
                                //             <p className="help-text">{this.props.usernameHelp}</p>
                                //         ) : (
                                //             null
                                //         )}
                                //         */}
                                //
