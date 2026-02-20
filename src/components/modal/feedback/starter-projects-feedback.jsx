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

const StarterProjectsFeedback = ({hideFeedback, isOpen, projectName}) => {
    const onHideFeedback = useCallback(
        () => hideFeedback(QUALITATIVE_FEEDBACK_QUESTION_ID.starterProjects),
        [hideFeedback]
    );

    const sendGAEvent = useCallback(
        data =>
            triggerAnalyticsEvent({
                event: 'qualitative-feedback',
                feedbackName: 'Starter Projects Feedback',
                projectName: projectName,
                feedbackResponse: data
            }),
        [projectName]
    );

    return (
        <QualitativeFeedback
            feedbackData={QUALITATIVE_FEEDBACK_DATA.starterProjects}
            hideFeedback={onHideFeedback}
            isOpen={isOpen}
            sendGAEvent={sendGAEvent}
        />
    );
};

StarterProjectsFeedback.propTypes = {
    isOpen: PropTypes.bool,
    hideFeedback: PropTypes.func,
    projectName: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
    hideFeedback: qualitativeFeedbackId => {
        dispatch(hideQualitativeFeedback(qualitativeFeedbackId));
    }
});

const ConnectedStarterProjectsFeedback = connect(
    null,
    mapDispatchToProps
)(StarterProjectsFeedback);

export {ConnectedStarterProjectsFeedback as StarterProjectsFeedback};
