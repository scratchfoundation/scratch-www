import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {hideQualitativeFeedback} from '../../../redux/qualitative-feedback.js';
import {
    QUALITATIVE_FEEDBACK_DATA,
    QUALITATIVE_FEEDBACK_QUESTION_ID
} from './qualitative-feedback-data.js';
import {QualitativeFeedback} from './qualitative-feedback.jsx';
import {connect} from 'react-redux';

const StarterProjectsFeedback = ({hideFeedback, isOpen}) => {
    const onHideFeedback = useCallback(
        () => hideFeedback(QUALITATIVE_FEEDBACK_QUESTION_ID.starterProjects),
        [hideFeedback]
    );

    return (
        <QualitativeFeedback
            feedbackData={QUALITATIVE_FEEDBACK_DATA.starterProjects}
            hideFeedback={onHideFeedback}
            isOpen={isOpen}
        />
    );
};

StarterProjectsFeedback.propTypes = {
    isOpen: PropTypes.bool,
    hideFeedback: PropTypes.func
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
