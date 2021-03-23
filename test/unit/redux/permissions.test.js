import {
    selectIsAdmin, selectIsSocial, permissionsReducer, setPermissions
} from '../../../src/redux/permissions';

describe('permission selectors', () => {
    test('all permissions are initially false', () => {
        const state = {
            permissions: {}
        };
        expect(selectIsAdmin(state)).toBe(false);
        expect(selectIsSocial(state)).toBe(false);
    });

    test('selectIsAdmin', () => {
        let state = {
            permissions: {}
        };
        const newPermissions = {admin: true};
        state.permissions = permissionsReducer(state.session, setPermissions(newPermissions));
        expect(selectIsAdmin(state)).toBe(true);
    });

    test('isSocial', () => {
        let state = {
            permissions: {}
        };
        const newPermissions = {social: true};
        state.permissions = permissionsReducer(state.session, setPermissions(newPermissions));
        expect(selectIsSocial(state)).toBe(true);
    });
});
