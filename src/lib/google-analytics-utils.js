import {calculateAgeGroup} from './user-eligibility';

export const triggerAnalyticsEvent = eventVaribles => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        ...eventVaribles
    });
};

export const sendUserProperties = (user, permissions, eligibilityCheck, userProperties) => {
    window.dataLayer = window.dataLayer || [];
    
    if (!eligibilityCheck(user, permissions)) {
        const nulledUserProperties = Object.keys(userProperties).reduce(
            (acc, current) => {
                acc[current] = null;
                return acc;
            },
            {}
        );

        window.dataLayer.push({
            testGroup: null,
            ageGroup: null,
            ...nulledUserProperties
        });
        return;
    }
    
    const {gender, birthYear, birthMonth} = user;
    
    window.dataLayer.push({
        ageGroup: calculateAgeGroup(birthYear, birthMonth),
        gender: gender,
        ...userProperties
    });
};
