const calculateAgeGroup = (birthYear, birthMonth) => {
    const today = new Date();
    let age = today.getFullYear() - parseInt(birthYear, 10);
    const monthDiff = (today.getMonth() + 1) - birthMonth;
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

// add logic when implementing the eligibility check in [UEPR-71]
const onboardingTestGroup = () => 'Displayed Onboarding Journeys';

export const triggerAnalyticsEvent = eventVaribles => {
    window.dataLayer = window.dataLayer || [];
    
    window.dataLayer.push({
        ...eventVaribles
    });
};

export const sendUserProperties = user => {
    window.dataLayer = window.dataLayer || [];

    const {gender, birthYear, birthMonth} = user;
    
    window.dataLayer.push({
        testGroup: onboardingTestGroup(),
        ageGroup: calculateAgeGroup(birthYear, birthMonth),
        gender: gender
    });
};
