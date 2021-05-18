/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import StudioReportModal from './modals/studio-report-modal.jsx';

import {
    actions,
    selectors
} from '../../redux/studio-report';

const StudioReport = ({
    canReport,
    isOpen,
    handleOpen
}) => (
    <div>
        {canReport && (
            <button onClick={handleOpen}><FormattedMessage id="general.report" /></button>
        )}
        {isOpen && (
            <StudioReportModal />
        )}
    </div>
);

StudioReport.propTypes = {
    canReport: PropTypes.bool,
    isOpen: PropTypes.bool,
    handleOpen: PropTypes.func
};

export default connect(
    state => ({
        canReport: selectors.selectCanReportStudio(state),
        isOpen: selectors.selectStudioReportOpen(state)
    }),
    {
        handleOpen: actions.openStudioReport
    }
)(StudioReport);
