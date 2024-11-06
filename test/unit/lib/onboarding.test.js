import {shouldDisplayOnboarding} from '../../../src/lib/onboarding';

describe('unit test lib/onboarding.js', () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    let user;
    let permissions;

    beforeEach(() => {
        process.env.ONBOARDING_TEST_ACTIVE = 'true';
        process.env.ONBOARDING_TESTING_STARTING_DATE = startDate.toJSON().split('T')[0];
        process.env.ONBOARDING_TESTING_ENDING_DATE = endDate.toJSON().split('T')[0];

        user = {id: 2, dateJoined: startDate.toJSON(), banned: false};
        permissions = {admin: false, mute_status: {}, new_scratcher: true};
    });

    describe('#shouldDisplayOnboarding', () => {
        describe('when user is eligible to view onboarding journeys', () => {
            describe('when there is time frame for A/B testing', () => {
                test('returns true', () => {
                    expect(shouldDisplayOnboarding(user, permissions)).toBeTruthy();
                });
            });
        });

        describe('when user is not eligible to view onboarding journeys', () => {
            describe('when feature flag is toggled off', () => {
                test('returns false', () => {
                    process.env.ONBOARDING_TEST_ACTIVE = 'false';
                    expect(shouldDisplayOnboarding(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is in other testing group', () => {
                test('returns false', () => {
                    user.id = 1;
                    expect(shouldDisplayOnboarding(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is registered outside of time frame', () => {
                test('returns false', () => {
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() - 1);
                    user.dateJoined = currentDate.toJSON();
                    expect(shouldDisplayOnboarding(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is admin', () => {
                test('returns false', () => {
                    permissions.admin = true;
                    expect(shouldDisplayOnboarding(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is muted', () => {
                test('returns false', () => {
                    permissions.mute_status = {showWarning: true};
                    expect(shouldDisplayOnboarding(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is banned', () => {
                test('returns false', () => {
                    user.banned = true;
                    expect(shouldDisplayOnboarding(user, permissions)).toBeFalsy();
                });
            });

            describe('when user is empty', () => {
                test('returns false', () => {
                    user = {};
                    expect(shouldDisplayOnboarding(user, permissions)).toBeFalsy();
                });
            });

            describe('when permissions is empty', () => {
                test('returns false', () => {
                    permissions = {};
                    expect(shouldDisplayOnboarding(user, permissions)).toBeFalsy();
                });
            });
        });
    });
});
