import {
    getInitialState, selectIsAdmin, selectIsSocial, selectUserId,
    selectUsername, selectToken, sessionReducer, setSession
} from '../../../src/redux/session';

import {sessions} from '../../helpers/state-fixtures.json';

describe('session selectors', () => {
    test('logged out', () => {
        const state = {session: getInitialState()};
        expect(selectIsAdmin(state)).toBe(false);
        expect(selectIsSocial(state)).toBe(false);
        expect(selectUserId(state)).toBeNaN();
        expect(selectToken(state)).toBeNull();
        expect(selectUsername(state)).toBeNull();
    });

    test('user data', () => {
        let state = {session: getInitialState()};
        const newSession = sessions.user1.session;
        state.session = sessionReducer(state.session, setSession(newSession));
        expect(selectUserId(state)).toBe(1);
        expect(selectUsername(state)).toBe('user1-username');
        expect(selectToken(state)).toBe('user1-token');
    });

    describe('permissions', () => {
        test('selectIsAdmin', () => {
            let state = {session: getInitialState()};
            const newSession = sessions.user1Admin.session;
            state.session = sessionReducer(state.session, setSession(newSession));
            expect(selectIsAdmin(state)).toBe(true);
            // Confirm that admin/social are totally separate and just read directly from the state
            expect(selectIsSocial(state)).toBe(false);
        });

        test('selectIsSocial', () => {
            let state = {session: getInitialState()};
            const newSession = sessions.user1Social.session;
            state.session = sessionReducer(state.session, setSession(newSession));
            expect(selectIsSocial(state)).toBe(true);
            // Confirm that admin/social are totally separate and just read directly from the state
            expect(selectIsAdmin(state)).toBe(false);
        });
    });
});
