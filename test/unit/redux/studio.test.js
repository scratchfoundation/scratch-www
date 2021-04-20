import {
    getInitialState as getInitialStudioState,
    selectCanEditInfo,
    selectCanAddProjects,
    selectShowCommentComposer
} from '../../../src/redux/studio';

import {
    getInitialState as getInitialSessionState
} from '../../../src/redux/session';

import {sessions, studios} from '../../helpers/state-fixtures.json';

describe('studio selectors', () => {
    let state;

    beforeEach(() => {
        state = {
            session: getInitialSessionState(),
            studio: getInitialStudioState()
        };
    });

    describe('studio info', () => {
        test('is editable by admin', () => {
            state.session = sessions.user1Admin;
            expect(selectCanEditInfo(state)).toBe(true);
        });
        test('is editable by managers and studio creator', () => {
            state.studio = studios.isManager;
            expect(selectCanEditInfo(state)).toBe(true);

            state.studio = studios.creator1;
            state.session = sessions.user1;
            expect(selectCanEditInfo(state)).toBe(true);
        });
        test('is not editable by curators', () => {
            state.studio = studios.isCurator;
            state.session = sessions.user1;
            expect(selectCanEditInfo(state)).toBe(false);
        });
        test('is not editable by other logged in users', () => {
            state.session = sessions.user1;
            expect(selectCanEditInfo(state)).toBe(false);
        });
        test('is not editable by logged out users', () => {
            expect(selectCanEditInfo(state)).toBe(false);
        });
    });

    describe('studio projects', () => {
        test('cannot be added by admin', () => {
            state.session = sessions.user1Admin;
            expect(selectCanAddProjects(state)).toBe(false);
        });
        test('can be added by managers and studio creator', () => {
            state.studio = studios.isManager;
            expect(selectCanAddProjects(state)).toBe(true);

            state.studio = studios.creator1;
            state.session = sessions.user1;
            expect(selectCanAddProjects(state)).toBe(true);
        });
        test('can be added by curators', () => {
            state.studio = studios.isCurator;
            state.session = sessions.user1;
            expect(selectCanAddProjects(state)).toBe(true);
        });
        test('can be added by social users if studio is openToAll', () => {
            state.studio = studios.openToAll;
            state.session = sessions.user1Social;
            expect(selectCanAddProjects(state)).toBe(true);
        });
        test('cannot be added by social users if not openToAll', () => {
            state.session = sessions.user1Social;
            expect(selectCanAddProjects(state)).toBe(false);
        });
    });

    describe('studio comments', () => {
        test('show comment composer only for social users', () => {
            expect(selectShowCommentComposer(state)).toBe(false);
            state.session = sessions.user1;
            expect(selectShowCommentComposer(state)).toBe(false);
            state.session = sessions.user1Social;
            expect(selectShowCommentComposer(state)).toBe(true);
        });
    });
});
