import {sendUserProperties} from './google-analytics-utils';
import {
    isDateInRange,
    isUserEligible
} from './user-eligibility';

const ONBOARDING_TESTING_GROUP_A_NAME = 'Displayed Onboarding Journeys';
const ONBOARDING_TESTING_GROUP_B_NAME = 'Not Displayed Onboarding Journeys';

const isRegisteredInRange = user => {
    const dateOfJoin = user.dateJoined.split('T')[0];

    return isDateInRange(
        dateOfJoin,
        process.env.ONBOARDING_TESTING_STARTING_DATE,
        process.env.ONBOARDING_TESTING_ENDING_DATE
    );
};

const isCurrentDayInRange = () => {
    const currentDate = new Date().toJSON()
        .split('T')[0];

    return isDateInRange(
        currentDate,
        process.env.ONBOARDING_TESTING_STARTING_DATE,
        process.env.ONBOARDING_TESTING_ENDING_DATE
    );
};

const isUserEligibleForOnboarding = (user, permissions) =>
    isUserEligible(
        user,
        permissions,
        () =>
            JSON.parse(process.env.ONBOARDING_TEST_ACTIVE) &&
            isRegisteredInRange(user) &&
            isCurrentDayInRange()
    );

const onboardingTestGroup = user =>
    (user.id % 2 === 0 ?
        ONBOARDING_TESTING_GROUP_A_NAME :
        ONBOARDING_TESTING_GROUP_B_NAME);

export const shouldDisplayOnboarding = (user, permissions) =>
    user.id % 2 === 0 && isUserEligibleForOnboarding(user, permissions);

export const sendUserPropertiesForOnboarding = (user, permissions) => {
    sendUserProperties(
        user,
        isUserEligibleForOnboarding(user, permissions),
        {testGroup: onboardingTestGroup(user)}
    );
};
