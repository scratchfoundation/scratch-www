import {onboardingEligibilityCheck} from '../../../src/lib/onboarding';

describe('unit test lib/onboarding.js', () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    let user;
    let permissions;

    beforeEach(() => {
        process.env.ONBOARDING_TESTING_TOGGLED = true;
        process.env.ONBOARDING_TESTING_STARTING_DATE = startDate.toJSON().split('T')[0];
        process.env.ONBOARDING_TESTING_ENDING_DATE = endDate.toJSON().split('T')[0];

        user = {id: 2, dateJoined: startDate.toJSON(), banned: false};
        permissions = {admin: false, mute_status: {}, new_scratcher: true};
    });

    describe('#onboardingEligibilityCheck', () => {
        describe('when user is eligible to view onboarding journeys', () => {
            describe('when there is time frame for A/B testing', () => {
                test('returns true', () => {
                    expect(onboardingEligibilityCheck(user, permissions)).toBeTruthy();
                });
            });
        });

        describe('when user is not eligible to view onboarding journeys', () => {
            describe('when feature flag is toggled off', () => {
                beforeEach(() => {
                    process.env.ONBOARDING_TESTING_TOGGLED = false;
                });

                test('returns false', () => {
                    expect(onboardingEligibilityCheck(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is in other testing group', () => {
                beforeEach(() => {
                    user.id = 1;
                });

                test('returns false', () => {
                    expect(onboardingEligibilityCheck(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is registered outside of time frame', () => {
                beforeEach(() => {
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() - 1);
                    user.dateJoined = currentDate.toJSON();
                });

                test('returns false', () => {
                    expect(onboardingEligibilityCheck(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is admin', () => {
                beforeEach(() => {
                    permissions.admin = true;
                });

                test('returns false', () => {
                    expect(onboardingEligibilityCheck(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is muted', () => {
                beforeEach(() => {
                    permissions.mute_status = {showWarning: true};
                });

                test('returns false', () => {
                    expect(onboardingEligibilityCheck(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is banned', () => {
                beforeEach(() => {
                    user.banned = true;
                });

                test('returns false', () => {
                    expect(onboardingEligibilityCheck(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is empty', () => {
                beforeEach(() => {
                    user = {};
                });

                test('returns false', () => {
                    expect(onboardingEligibilityCheck(user, permissions)).toBeFalsy();
                });
            });

            describe('when permissions is empty', () => {
                beforeEach(() => {
                    permissions = {};
                });

                test('returns false', () => {
                    expect(onboardingEligibilityCheck(user, permissions)).toBeFalsy();
                });
            });
        });
    });
});
