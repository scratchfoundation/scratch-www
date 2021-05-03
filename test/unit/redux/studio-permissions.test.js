import {
    selectCanEditInfo,
    selectCanAddProjects,
    selectShowCommentComposer,
    selectCanDeleteComment,
    selectCanDeleteCommentWithoutConfirm,
    selectCanReportComment,
    selectCanRestoreComment,
    selectCanFollowStudio,
    selectCanEditCommentsAllowed,
    selectCanEditOpenToAll,
    selectShowCuratorInvite,
    selectCanInviteCurators,
    selectCanRemoveCurators,
    selectCanRemoveManager,
    selectCanPromoteCurators,
    selectCanRemoveProjects
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
    case 'invited':
        state.studio = studios.isInvited;
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
    describe('can remove projects', () => {
        test.each([
            ['admin', true],
            ['curator', true],
            ['manager', true],
            ['creator', true],
            ['logged in', false],
            ['unconfirmed', false],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            // TODO this permission is wrong, curators can only remove projects they added
            expect(selectCanRemoveProjects(state)).toBe(expected);
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

    describe('can set "comments allowed" on a studio', () => {
        test.each([
            ['admin', true],
            ['curator', false],
            ['manager', false],
            ['creator', true],
            ['logged in', false],
            ['unconfirmed', false],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            expect(selectCanEditCommentsAllowed(state)).toBe(expected);
        });
    });

    describe('can set "open to all" on a studio', () => {
        test.each([
            ['admin', false],
            ['curator', false],
            ['manager', true],
            ['creator', true],
            ['logged in', false],
            ['unconfirmed', false],
            ['logged out', false]
        ])('%s: %s', (role, expected) => {
            setStateByRole(role);
            expect(selectCanEditOpenToAll(state)).toBe(expected);
        });
    });
    describe('studio members', () => {
        describe('can accept invitation', () => {
            test.each([
                ['admin', false],
                ['curator', false],
                ['manager', false],
                ['creator', false],
                ['invited', true],
                ['logged in', false],
                ['unconfirmed', false],
                ['logged out', false]
            ])('%s: %s', (role, expected) => {
                setStateByRole(role);
                expect(selectShowCuratorInvite(state)).toBe(expected);
            });
        });
        describe('can promote curators', () => {
            test.each([
                ['admin', false],
                ['curator', false],
                ['manager', true],
                ['creator', true],
                ['logged in', false],
                ['unconfirmed', false],
                ['logged out', false]
            ])('%s: %s', (role, expected) => {
                setStateByRole(role);
                expect(selectCanPromoteCurators(state)).toBe(expected);
            });
        });
        describe('can remove curators', () => {
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
                expect(selectCanRemoveCurators(state)).toBe(expected);
            });
        });
        describe('can remove managers', () => {
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
                expect(selectCanRemoveManager(state, '123')).toBe(expected);
            });
            describe('nobody can remove the studio creator', () => {
                test.each([
                    ['admin', false],
                    ['curator', false],
                    ['manager', false],
                    ['creator', false],
                    ['logged in', false],
                    ['unconfirmed', false],
                    ['logged out', false]
                ])('%s: %s', (role, expected) => {
                    setStateByRole(role);
                    state.studio.owner = 'the creator';
                    expect(selectCanRemoveManager(state, 'the creator')).toBe(expected);
                });
            });
        });
        describe('can invite curators', () => {
            test.each([
                ['admin', false],
                ['curator', false],
                ['manager', true],
                ['creator', false],
                ['logged in', false],
                ['unconfirmed', false],
                ['logged out', false]
            ])('%s: %s', (role, expected) => {
                setStateByRole(role);
                expect(selectCanInviteCurators(state)).toBe(expected);
            });
        });
    });
});
