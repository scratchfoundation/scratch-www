import {
    getInitialState as getInitialStudioState,
    selectCanEditInfo,
    selectCanAddProjects
} from '../../../src/redux/studio';

import {
    getInitialState as getInitialSessionState
} from '../../../src/redux/session';

const fixtures = {
    permissions: {
        isAdmin: {admin: true},
        isSocial: {social: true}
    },
    studio: {
        isManager: {manager: true},
        isCurator: {curator: true},
        creator1: {owner: 1},
        openToAll: {openToAll: true}
    },
    session: {
        user1: {
            session: {user: {id: 1}}
        }
    }
};

describe('studio selectors', () => {
    let state;

    beforeEach(() => {
        state = {
            permissions: {},
            session: getInitialSessionState(),
            studio: getInitialStudioState()
        };
    });

    describe('studio info', () => {
        test('is editable by admin', () => {
            state.permissions = fixtures.permissions.isAdmin;
            expect(selectCanEditInfo(state)).toBe(true);
        });
        test('is editable by managers and studio creator', () => {
            state.studio = fixtures.studio.isManager;
            expect(selectCanEditInfo(state)).toBe(true);

            state.studio = fixtures.studio.creator1;
            state.session = fixtures.session.user1;
            expect(selectCanEditInfo(state)).toBe(true);
        });
        test('is not editable by curators', () => {
            state.studio = fixtures.studio.isCurator;
            state.session = fixtures.session.user1;
            expect(selectCanEditInfo(state)).toBe(false);
        });
        test('is not editable by other logged in users', () => {
            state.session = fixtures.session.user1;
            expect(selectCanEditInfo(state)).toBe(false);
        });
        test('is not editable by logged out users', () => {
            expect(selectCanEditInfo(state)).toBe(false);
        });
    });

    describe('studio projects', () => {
        test('cannot be added by admin', () => {
            state.permissions = fixtures.permissions.isAdmin;
            state.session = fixtures.session.user1;
            expect(selectCanAddProjects(state)).toBe(false);
        });
        test('can be added by managers and studio creator', () => {
            state.studio = fixtures.studio.isManager;
            expect(selectCanAddProjects(state)).toBe(true);

            state.studio = fixtures.studio.creator1;
            state.session = fixtures.session.user1;
            expect(selectCanAddProjects(state)).toBe(true);
        });
        test('can be added by curators', () => {
            state.studio = fixtures.studio.isCurator;
            state.session = fixtures.session.user1;
            expect(selectCanAddProjects(state)).toBe(true);
        });
        test('can be added by social users if studio is openToAll', () => {
            state.studio = fixtures.studio.openToAll;
            state.permissions = fixtures.permissions.isSocial;
            state.session = fixtures.session.user1;
            expect(selectCanAddProjects(state)).toBe(true);
        });
        test('cannot be added by social users if not openToAll', () => {
            state.permissions = fixtures.permissions.isSocial;
            state.session = fixtures.session.user1;
            expect(selectCanAddProjects(state)).toBe(false);
        });
    });
});
