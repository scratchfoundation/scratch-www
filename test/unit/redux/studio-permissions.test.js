import {
    selectCanEditInfo,
    selectCanAddProjects,
    selectShowCommentComposer,
    selectCanDeleteComment,
    selectCanDeleteCommentWithoutConfirm,
    selectCanReportComment,
    selectCanRestoreComment,
    selectCanFollowStudio
} from '../../../src/redux/studio-permissions';

import {getInitialState as getInitialStudioState} from '../../../src/redux/studio';
import {getInitialState as getInitialSessionState} from '../../../src/redux/session';
import {sessions, studios} from '../../helpers/state-fixtures.json';

let state;

const setStateByRole = (role) => {
    switch (role) {
    case 'admin':
        state.session = sessions.user1Admin;
        break;
    case 'curator':
        state.studio = studios.isCurator;
        state.session = sessions.user1Social;
        break;
    case 'manager':
        state.studio = studios.isManager;
        state.session = sessions.user1Social;
        break;
    case 'creator':
        state.studio = studios.creator1;
        state.session = sessions.user1Social;
        break;
    case 'logged in':
        state.session = sessions.user1Social;
        break;
    case 'unconfirmed':
        state.session = sessions.user1;
        break;
    case 'logged out': // Default state set in beforeEach
        break;
    default:
        throw new Error('Unknown user role in test: ' + role);
    }
};

beforeEach(() => {
    state = {
        session: getInitialSessionState(),
        studio: getInitialStudioState()
    };
});

describe('studio info', () => {
    describe('can edit studio info', () => {
        test.each([
            ['admin', true],
            ['curator', false],
            ['manager', true],
            ['creator', true],
            ['logged in', false],
            ['unconfirmed', false],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            expect(selectCanEditInfo(state)).toBe(expected);
        });
    });
});

describe('studio projects', () => {
    describe('can add project, not open to all', () => {
        test.each([
            ['admin', false],
            ['curator', true],
            ['manager', true],
            ['creator', true],
            ['logged in', false],
            ['unconfirmed', false],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            expect(selectCanAddProjects(state)).toBe(expected);
        });
    });

    describe('can add project, open to all', () => {
        test.each([
            ['logged in', true],
            ['unconfirmed', false],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            state.studio.openToAll = true;
            expect(selectCanAddProjects(state)).toBe(expected);
        });
    });
});

describe('studio comments', () => {
    describe('showing comment composer', () => {
        test.each([
            ['logged in', true],
            ['unconfirmed', false],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            expect(selectShowCommentComposer(state)).toBe(expected);
        });
    });

    describe('can report comment', () => {
        test.each([
            ['logged in', true],
            ['unconfirmed', false],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            expect(selectCanReportComment(state)).toBe(expected);
        });
    });

    describe('can delete comment', () => {
        test.each([
            ['admin', true],
            ['curator', false],
            ['manager', false],
            ['creator', false],
            ['logged in', false],
            ['unconfirmed', false],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            expect(selectCanDeleteComment(state)).toBe(expected);
        });
    });

    describe('can delete comment without confirmation', () => {
        test.each([
            ['admin', true],
            ['curator', false],
            ['manager', false],
            ['creator', false],
            ['logged in', false],
            ['unconfirmed', false],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            expect(selectCanDeleteCommentWithoutConfirm(state)).toBe(expected);
        });
    });

    describe('can restore a comment', () => {
        test.each([
            ['admin', true],
            ['curator', false],
            ['manager', false],
            ['creator', false],
            ['logged in', false],
            ['unconfirmed', false],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            expect(selectCanRestoreComment(state)).toBe(expected);
        });
    });

    describe('can follow a studio', () => {
        test.each([
            ['logged in', true],
            ['unconfirmed', true],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            expect(selectCanFollowStudio(state)).toBe(expected);
        });
    });
});
