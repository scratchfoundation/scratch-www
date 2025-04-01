import {sendUserProperties} from './google-analytics-utils';

const {isDateInRange, isUserEligible, getUserRoles} = require('./user-eligibility');

const localStorageAvailable =
  'localStorage' in window && window.localStorage !== null;

const isCurrentDayInRange = () => {
    const currentDate = new Date().toJSON()
        .split('T')[0];

    return isDateInRange(
        currentDate,
        process.env.QUALITATIVE_FEEDBACK_STARTING_DATE,
        process.env.QUALITATIVE_FEEDBACK_ENDING_DATE
    );
};

const notRespondedToFeedback = feedbackQuestionId =>
    localStorageAvailable && localStorage.getItem(feedbackQuestionId) !== 'true';

const canShowFeedbackWidget = feedbackUserRate => {
    // randomNumber will be in the range [0, feedbackUserRate - 1]
    // and we are assering against one number from the range
    // this way we simulate picking one from n users
    const randomNum = Math.floor(
        Math.random() * feedbackUserRate
    );

    return randomNum === 0;
};

const isUserEligibleForFeedback = (user, permissions, feedbackQuestionId, feedbackUserRate) =>
    isUserEligible(
        user,
        permissions,
        () =>
            JSON.parse(process.env.QUALITATIVE_FEEDBACK_ACTIVE) &&
            canShowFeedbackWidget(feedbackUserRate) &&
            isCurrentDayInRange() &&
            notRespondedToFeedback(feedbackQuestionId)
    );

const isFeedbackDisplayed = feedbacksDisplayed =>
    Object.entries(feedbacksDisplayed).some(feedback =>
        feedback.value
    );

export const shouldDisplayFeedbackWidget = (
    user,
    permissions,
    feedbackQuestionId,
    feedbackUserRate,
    feedbacksDisplayed
) => (
    isUserEligibleForFeedback(user, permissions, feedbackQuestionId, feedbackUserRate) &&
    !isFeedbackDisplayed(feedbacksDisplayed)
);

export const sendUserPropertiesForFeedback = (user, permissions, shouldDisplayFeedback) => {
    sendUserProperties(
        user,
        shouldDisplayFeedback,
        {userRoles: getUserRoles(permissions)}
    );
};
