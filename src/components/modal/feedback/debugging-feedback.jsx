import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {hideQualitativeFeedback} from '../../../redux/qualitative-feedback.js';
import {
    QUALITATIVE_FEEDBACK_DATA,
    QUALITATIVE_FEEDBACK_QUESTION_ID
} from './qualitative-feedback-data.js';
import {QualitativeFeedback} from './qualitative-feedback.jsx';
import {connect} from 'react-redux';
import {triggerAnalyticsEvent} from '../../../lib/google-analytics-utils.js';

const DebuggingFeedback = ({hideFeedback, isOpen}) => {
    const onHideFeedback = useCallback(
        () => hideFeedback(QUALITATIVE_FEEDBACK_QUESTION_ID.debugging),
        [hideFeedback]
    );

    const sendGAEvent = useCallback(
        data =>
            triggerAnalyticsEvent({
                event: 'qualitative-feedback',
                feedbackName: 'Debugging Feedback',
                feedbackResponse: data
            }),
        []
    );

    return (
        <QualitativeFeedback
            feedbackData={QUALITATIVE_FEEDBACK_DATA.debugging}
            hideFeedback={onHideFeedback}
            isOpen={isOpen}
            sendGAEvent={sendGAEvent}
        />
    );
};

DebuggingFeedback.propTypes = {
    isOpen: PropTypes.bool,
    hideFeedback: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    hideFeedback: qualitativeFeedbackId => {
        dispatch(hideQualitativeFeedback(qualitativeFeedbackId));
    }
});

const ConnectedDebuggingFeedback = connect(
    null,
    mapDispatchToProps
)(DebuggingFeedback);

export {ConnectedDebuggingFeedback as DebuggingFeedback};
