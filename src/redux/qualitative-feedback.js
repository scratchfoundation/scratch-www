import {QUALITATIVE_FEEDBACK_QUESTION_ID} from '../components/modal/feedback/qualitative-feedback-data';

const initialState = {
    [QUALITATIVE_FEEDBACK_QUESTION_ID.ideasGenerator]: false,
    [QUALITATIVE_FEEDBACK_QUESTION_ID.starterProjects]: false,
    [QUALITATIVE_FEEDBACK_QUESTION_ID.tutorials]: false,
    [QUALITATIVE_FEEDBACK_QUESTION_ID.debugging]: false
};

export const feedbackReducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case 'DISPLAY_FEEDBACK':
        return {
            ...state,
            [action.qualitativeFeedbackId]: true
        };
    case 'HIDE_FEEDBACK':
        return {
            ...state,
            [action.qualitativeFeedbackId]: false
        };
    default:
        return state;
    }
};

export const displayQualitativeFeedback = function (qualitativeFeedbackId) {
    return {
        type: 'DISPLAY_FEEDBACK',
        qualitativeFeedbackId: qualitativeFeedbackId
    };
};

export const hideQualitativeFeedback = function (qualitativeFeedbackId) {
    return {
        type: 'HIDE_FEEDBACK',
        qualitativeFeedbackId: qualitativeFeedbackId
    };
};
