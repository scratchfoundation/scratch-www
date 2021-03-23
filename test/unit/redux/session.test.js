import {
    getInitialState, selectUserId, sessionReducer, setSession
} from '../../../src/redux/session';

describe('session selectors', () => {
    describe('selectUserId', () => {

        test('is initially undefined', () => {
            const state = {session: getInitialState()};
            expect(selectUserId(state)).toBeUndefined();
        });
        test('returns the user id when it is available', () => {
            let state = {session: getInitialState()};
            const newSession = {
                user: {
                    id: 123
                }
            };
            state.session = sessionReducer(state.session, setSession(newSession));
            expect(selectUserId(state)).toBe(123);
        });
    });
});
