import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {hideQualitativeFeedback} from '../../../redux/qualitative-feedback.js';
import {
    QUALITATIVE_FEEDBACK_DATA,
    QUALITATIVE_FEEDBACK_QUESTION_ID
} from './qualitative_feedback_data.js';
import {QualitativeFeedback} from './qualitative_feedback.jsx';
import {connect} from 'react-redux';

const DebuggingFeedback = ({hideFeedback, isOpen}) => {
    const onHideFeedback = useCallback(
        () => hideFeedback(QUALITATIVE_FEEDBACK_QUESTION_ID.debugging),
        [hideFeedback]
    );

    return (
        <QualitativeFeedback
            feedbackData={QUALITATIVE_FEEDBACK_DATA.debuging}
            hideFeedback={onHideFeedback}
            isOpen={isOpen}
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
