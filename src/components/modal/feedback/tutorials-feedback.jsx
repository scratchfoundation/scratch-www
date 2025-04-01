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

const TutorialsFeedback = ({hideFeedback, isOpen}) => {
    const onHideFeedback = useCallback(
        () => hideFeedback(QUALITATIVE_FEEDBACK_QUESTION_ID.tutorials),
        [hideFeedback]
    );

    const sendGAEvent = useCallback(
        data =>
            triggerAnalyticsEvent({
                event: 'qualitative-feedback',
                feedbackName: 'Tutorials Feedback',
                feedbackResponse: data
            }),
        []
    );

    return (
        <QualitativeFeedback
            feedbackData={QUALITATIVE_FEEDBACK_DATA.tutorials}
            hideFeedback={onHideFeedback}
            isOpen={isOpen}
            sendGAEvent={sendGAEvent}
        />
    );
};

TutorialsFeedback.propTypes = {
    isOpen: PropTypes.bool,
    hideFeedback: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    hideFeedback: qualitativeFeedbackId => {
        dispatch(hideQualitativeFeedback(qualitativeFeedbackId));
    }
});

const ConnectedTutorialsFeedback = connect(
    null,
    mapDispatchToProps
)(TutorialsFeedback);

export {ConnectedTutorialsFeedback as TutorialsFeedback};
