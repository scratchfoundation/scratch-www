const {isDateInRange, isUserEligible} = require('./user-eligibility');

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

const hasGivenFeedback = feedbackQuestionId =>
    localStorageAvailable && localStorage.getItem(feedbackQuestionId) !== 'true';

const canShowFeedbackWidget = feedbackUserRate => {
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
            hasGivenFeedback(feedbackQuestionId)
    );

const isFeedbackDisplayed = feedbacksDisplayed =>
    !Object.entries(feedbacksDisplayed).some(feedback =>
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
    isFeedbackDisplayed(feedbacksDisplayed)
);
