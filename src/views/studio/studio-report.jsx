/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    Fields,
    actions,
    selectors
} from '../../redux/studio-report';

const StudioReport = ({
    canReport,
    error,
    field,
    isOpen,
    isSubmitting,
    previouslyReported,
    handleSetField,
    handleOpen,
    handleClose,
    handleSubmit
}) => (
    <div>
        <h3>Reporting</h3>
        {canReport && (
            <button onClick={handleOpen}>Report</button>
        )}
        {isOpen && (
            <div style={{padding: '1rem', margin: '1rem', border: '1px solid green'}}>
                <div>Report Studio Modal</div>
                {previouslyReported ? (
                    <React.Fragment>
                        <div>Submitted the report!</div>
                        <button onClick={handleClose}>Close</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <select
                            value={field}
                            onChange={e => handleSetField(e.target.value)}
                        >
                            <option value={Fields.TITLE}>Title</option>
                            <option value={Fields.DESCRIPTION}>Description</option>
                            <option value={Fields.THUMBNAIL}>Thumbnail</option>
                        </select>
                        {error && (
                            <div>
                                <div>There was an error. Try again later?</div>
                                <div><code><pre>{error}</pre></code></div>
                            </div>
                        )}
                        <button
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                        >
                                Submit
                        </button>
                        <button onClick={handleClose}>Cancel</button>
                    </React.Fragment>
                )}
            </div>
        )}
    </div>
);

StudioReport.propTypes = {
    canReport: PropTypes.bool,
    error: PropTypes.string,
    field: PropTypes.string,
    isOpen: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    previouslyReported: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    handleSetField: PropTypes.func,
    handleSubmit: PropTypes.func
};

export default connect(
    state => ({
        canReport: selectors.selectCanReportStudio(state),
        error: selectors.selectStudioReportError(state),
        field: selectors.selectStudioReportField(state),
        isOpen: selectors.selectStudioReportOpen(state),
        isSubmitting: selectors.selectStudioReportSubmitting(state),
        previouslyReported: selectors.selectStudioReportSubmitted(state)
    }),
    {
        handleOpen: actions.openStudioReport,
        handleClose: actions.closeStudioReport,
        handleSetField: actions.setStudioReportField,
        handleSubmit: actions.submitStudioReport
    }
)(StudioReport);
