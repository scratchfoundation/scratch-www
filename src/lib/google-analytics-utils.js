import {calculateAgeGroup} from './user-eligibility';

export const triggerAnalyticsEvent = eventVaribles => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        ...eventVaribles
    });
};

export const sendUserProperties = (user, eligibilityCheck, userProperties) => {
    window.dataLayer = window.dataLayer || [];
    
    if (!eligibilityCheck) {
        const nulledUserProperties = Object.keys(userProperties).reduce(
            (acc, current) => {
                acc[current] = null;
                return acc;
            },
            {}
        );

        window.dataLayer.push({
            gender: null,
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
