/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';

import intlShape from '../../../lib/intl-shape';
import {selectStudioTitle, selectStudioDescription, selectStudioImage} from '../../../redux/studio';

import Modal from '../../../components/modal/base/modal.jsx';
import ModalTitle from '../../../components/modal/base/modal-title.jsx';
import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';
import StudioReportTile from './studio-report-tile.jsx';

import './studio-report-modal.scss';

import {
    Fields,
    actions,
    selectors
} from '../../../redux/studio-report';

const StudioReportModal = ({
    description,
    error,
    field,
    image,
    intl,
    isSubmitting,
    previouslyReported,
    title,
    handleSetField,
    handleClose,
    handleSubmit
}) => {
    const handleChange = event => handleSetField(event.target.value);
    return (
        <div>
            {error && (
                <div>
                    <div>There was an error. Try again later?</div>
                    <div><code><pre>{error}</pre></code></div>
                </div>
            )}
            {previouslyReported ? (
                <Modal
                    isOpen
                    className="studio-report-modal"
                    onRequestClose={handleClose}
                    useStandardSizes
                >
                    <ModalTitle
                        className="studio-report-title"
                    />
                    <div
                        className="studio-report-thanks-content"
                    >
                        <img
                            src="/svgs/studio/report-thanks.svg"
                            className="studio-report-thanks-image"
                        />
                        <ModalInnerContent
                            className="studio-report-inner"
                        >
                            <h2><FormattedMessage id="studio.reportThanksForLettingUsKnow" /></h2>
                            <p><FormattedMessage id="studio.reportYourFeedback" /></p>
                        </ModalInnerContent>
                    </div>
                </Modal>
            ) : (
                <Modal
                    isOpen
                    className="studio-report-modal"
                    onRequestClose={handleClose}
                >
                    <ModalTitle
                        className="studio-report-title"
                        title={intl.formatMessage({id: 'studio.reportThisStudio'})}
                    />
                    <ModalInnerContent
                        className="studio-report-inner"
                    >
                        <h3><FormattedMessage id="studio.reportThisStudio" /></h3>
                        <p><FormattedMessage id="studio.reportPleaseExplain" /></p>
                        <div className="studio-report-tile-container">
                            <StudioReportTile
                                handleChange={handleChange}
                                heading={intl.formatMessage({id: 'studio.title'})}
                                selected={field === Fields.TITLE}
                                title={title}
                                value={Fields.TITLE}
                            />
                            <StudioReportTile
                                handleChange={handleChange}
                                heading={intl.formatMessage({id: 'studio.description'})}
                                selected={field === Fields.DESCRIPTION}
                                description={description}
                                value={Fields.DESCRIPTION}
                            />
                            <StudioReportTile
                                handleChange={handleChange}
                                heading={intl.formatMessage({id: 'studio.thumbnail'})}
                                selected={field === Fields.THUMBNAIL}
                                image={image}
                                value={Fields.THUMBNAIL}
                            />
                        </div>
                        <p><FormattedMessage id="studio.reportAreThereComments" /></p>
                        <div
                            className="studio-report-button-row"
                        >
                            <button
                                className="button"
                                disabled={field === null || isSubmitting}
                                onClick={handleSubmit}
                            >
                                {isSubmitting && <FormattedMessage id="report.sending" />}
                                {!isSubmitting && <FormattedMessage id="report.send" />}
                            </button>
                        </div>
                    </ModalInnerContent>
                </Modal>
            )}
        </div>
    );
};

StudioReportModal.propTypes = {
    description: PropTypes.string,
    error: PropTypes.string,
    field: PropTypes.string,
    intl: intlShape,
    isSubmitting: PropTypes.bool,
    previouslyReported: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSetField: PropTypes.func,
    handleSubmit: PropTypes.func,
    image: PropTypes.string,
    title: PropTypes.string
};

export default connect(
    state => ({
        description: selectStudioDescription(state),
        error: selectors.selectStudioReportError(state),
        field: selectors.selectStudioReportField(state),
        image: selectStudioImage(state),
        isOpen: selectors.selectStudioReportOpen(state),
        isSubmitting: selectors.selectStudioReportSubmitting(state),
        previouslyReported: selectors.selectStudioReportSubmitted(state),
        title: selectStudioTitle(state)
    }),
    {
        handleOpen: actions.openStudioReport,
        handleClose: actions.closeStudioReport,
        handleSetField: actions.setStudioReportField,
        handleSubmit: actions.submitStudioReport
    }
)(injectIntl(StudioReportModal));
