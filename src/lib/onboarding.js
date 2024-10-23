const ONBOARDING_TESTING_GROUP_A_NAME = 'Displayed Onboarding Journeys';
const ONBOARDING_TESTING_GROUP_B_NAME = 'Not Displayed Onboarding Journeys';

const isBanned = user => user.banned;

const isAdmin = permissions => permissions.admin;

const isMuted = permissions => !!Object.keys(permissions.mute_status).length;

const isDateInRange = (date, startingDate, endingDate) => {
    const dateToCompare = Date.parse(date);
    const startDate = Date.parse(startingDate);
    const endDate = Date.parse(endingDate);

    if (dateToCompare >= startDate && dateToCompare <= endDate) {
        return true;
    }
    return false;
};

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

const isOnboardingTestingToggledOn = () =>
    JSON.parse(process.env.ONBOARDING_TESTING_TOGGLED);

const isUserEligible = user =>
    user.id % 2 === 0 && isRegisteredInRange(user) && isCurrentDayInRange();

const calculateAgeGroup = (birthYear, birthMonth) => {
    const today = new Date();
    let age = today.getFullYear() - parseInt(birthYear, 10);
    const monthDiff = today.getMonth() + 1 - birthMonth;
    if (monthDiff < 0) {
        age--;
    }

    if (age <= 10) {
        return '[00-10]';
    } else if (age <= 16) {
        return '[11-16]';
    }
    return '[17+]';
};

const onboardingTestGroup = user =>
    (user.id % 2 === 0 ?
        ONBOARDING_TESTING_GROUP_A_NAME :
        ONBOARDING_TESTING_GROUP_B_NAME);

export const onboardingEligibilityCheck = (user, permissions) =>
    Object.keys(user).length !== 0 &&
    Object.keys(permissions).length !== 0 &&
    isOnboardingTestingToggledOn() &&
    isUserEligible(user) &&
    !isAdmin(permissions) &&
    !isMuted(permissions) &&
    !isBanned(user);

export const triggerAnalyticsEvent = eventVaribles => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        ...eventVaribles
    });
};

export const sendUserProperties = user => {
    if (
        !isOnboardingTestingToggledOn() ||
        !isRegisteredInRange(user) ||
        !isCurrentDayInRange()
    ) {
        window.dataLayer.push({
            testGroup: null,
            ageGroup: null,
            gender: null
        });
        return;
    }

    window.dataLayer = window.dataLayer || [];

    const {gender, birthYear, birthMonth} = user;

    window.dataLayer.push({
        testGroup: onboardingTestGroup(user),
        ageGroup: calculateAgeGroup(birthYear, birthMonth),
        gender: gender
    });
};
