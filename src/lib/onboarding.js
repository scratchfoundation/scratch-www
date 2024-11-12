const ONBOARDING_TESTING_GROUP_A_NAME = 'Displayed Onboarding Journeys';
const ONBOARDING_TESTING_GROUP_B_NAME = 'Not Displayed Onboarding Journeys';

const isBanned = user => user.banned;

const isAdmin = permissions => permissions.admin;

const isMuted = permissions => !!Object.keys(permissions.mute_status).length;

const isDateInOnboardingRange = date => {
    const dateToCompare = Date.parse(date);
    const startDate = Date.parse(process.env.ONBOARDING_TESTING_STARTING_DATE);
    const endDate = Date.parse(process.env.ONBOARDING_TESTING_ENDING_DATE);

    return dateToCompare >= startDate && dateToCompare <= endDate;
};

const isRegisteredInRange = user => {
    const dateOfJoin = user.dateJoined.split('T')[0];

    return isDateInOnboardingRange(dateOfJoin);
};

const isCurrentDayInRange = () => {
    const currentDate = new Date().toJSON()
        .split('T')[0];

    return isDateInOnboardingRange(currentDate);
};

const isUserEligible = (user, permissions) =>
    Object.keys(user).length !== 0 &&
    Object.keys(permissions).length !== 0 &&
    JSON.parse(process.env.ONBOARDING_TEST_ACTIVE) &&
    isRegisteredInRange(user) &&
    isCurrentDayInRange() &&
    !isAdmin(permissions) &&
    !isMuted(permissions) &&
    !isBanned(user);

const calculateAgeGroup = (birthYear, birthMonth) => {
    if (!birthMonth || !birthYear) {
        return '[unset]';
    }

    const today = new Date();
    let age = today.getFullYear() - birthYear;
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

export const shouldDisplayOnboarding = (user, permissions) =>
    user.id % 2 === 0 && isUserEligible(user, permissions);

export const triggerAnalyticsEvent = eventVaribles => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        ...eventVaribles
    });
};

export const sendUserProperties = (user, permissions) => {
    window.dataLayer = window.dataLayer || [];

    if (!isUserEligible(user, permissions)) {
        window.dataLayer.push({
            testGroup: null,
            ageGroup: null,
            gender: null
        });
        return;
    }

    const {gender, birthYear, birthMonth} = user;

    window.dataLayer.push({
        testGroup: onboardingTestGroup(user),
        ageGroup: calculateAgeGroup(birthYear, birthMonth),
        gender: gender
    });
};
