const {
    handleToggleAccountNav,
    navigationReducer,
    setAccountNavOpen,
    setCanceledDeletionOpen,
    setLoginError,
    setLoginOpen,
    setRegistrationOpen,
    setSearchTerm,
    toggleLoginOpen,
    handleRegistrationRequested
} = require('../../../src/redux/navigation');


describe('unit test lib/validate.js', () => {
    beforeEach(() => {
        // mock window navigation
        global.window.location.assign = jest.fn();
    });

    test('initialState', () => {
        let defaultState;
        /* navigationReducer(state, action) */
        expect(navigationReducer(defaultState, {type: 'anything'})).toBeDefined();
        expect(navigationReducer(defaultState, {type: 'anything'}).accountNavOpen).toBe(false);
        expect(navigationReducer(defaultState, {type: 'anything'}).canceledDeletionOpen).toBe(false);
        expect(navigationReducer(defaultState, {type: 'anything'}).loginError).toBe(null);
        expect(navigationReducer(defaultState, {type: 'anything'}).loginOpen).toBe(false);
        expect(navigationReducer(defaultState, {type: 'anything'}).registrationOpen).toBe(false);
        expect(navigationReducer(defaultState, {type: 'anything'}).searchTerm).toBe('');
        expect(navigationReducer(defaultState, {type: 'anything'}).useScratch3Registration).toBe(true);
    });

    // handleToggleAccountNav

    test('handleToggleAccountNav can toggle on', () => {
        const initialState = {
            accountNavOpen: false
        };
        const action = handleToggleAccountNav();
        const resultState = navigationReducer(initialState, action);
        expect(resultState.accountNavOpen).toBe(true);
    });

    test('handleToggleAccountNav can toggle off', () => {
        const initialState = {
            accountNavOpen: true
        };
        const action = handleToggleAccountNav();
        const resultState = navigationReducer(initialState, action);
        expect(resultState.accountNavOpen).toBe(false);
    });

    // setAccountNavOpen

    test('setAccountNavOpen opens account nav, if it is closed', () => {
        const initialState = {
            accountNavOpen: false
        };
        const action = setAccountNavOpen(true);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.accountNavOpen).toBe(true);
    });

    test('setAccountNavOpen leaves account nav open, if it is already open', () => {
        const initialState = {
            accountNavOpen: true
        };
        const action = setAccountNavOpen(true);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.accountNavOpen).toBe(true);
    });

    test('setAccountNavOpen closes account nav, if it is open', () => {
        const initialState = {
            accountNavOpen: true
        };
        const action = setAccountNavOpen(false);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.accountNavOpen).toBe(false);
    });

    test('setAccountNavOpen leaves account nav closed, if it is already closed', () => {
        const initialState = {
            accountNavOpen: false
        };
        const action = setAccountNavOpen(false);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.accountNavOpen).toBe(false);
    });

    // setCanceledDeletionOpen

    test('setCanceledDeletionOpen opens account nav, if it is closed', () => {
        const initialState = {
            canceledDeletionOpen: false
        };
        const action = setCanceledDeletionOpen(true);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.canceledDeletionOpen).toBe(true);
    });

    test('setCanceledDeletionOpen leaves account nav open, if it is already open', () => {
        const initialState = {
            canceledDeletionOpen: true
        };
        const action = setCanceledDeletionOpen(true);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.canceledDeletionOpen).toBe(true);
    });

    test('setCanceledDeletionOpen closes account nav, if it is open', () => {
        const initialState = {
            canceledDeletionOpen: true
        };
        const action = setCanceledDeletionOpen(false);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.canceledDeletionOpen).toBe(false);
    });

    test('setCanceledDeletionOpen leaves account nav closed, if it is already closed', () => {
        const initialState = {
            canceledDeletionOpen: false
        };
        const action = setCanceledDeletionOpen(false);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.canceledDeletionOpen).toBe(false);
    });

    // setLoginError

    test('setLoginError sets login error', () => {
        const initialState = {
            loginError: null
        };
        const action = setLoginError('Danger! Error! Mistake!');
        const resultState = navigationReducer(initialState, action);
        expect(resultState.loginError).toBe('Danger! Error! Mistake!');
    });

    // setLoginOpen

    test('setLoginOpen opens account nav, if it is closed', () => {
        const initialState = {
            loginOpen: false
        };
        const action = setLoginOpen(true);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.loginOpen).toBe(true);
    });

    test('setLoginOpen leaves account nav open, if it is already open', () => {
        const initialState = {
            loginOpen: true
        };
        const action = setLoginOpen(true);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.loginOpen).toBe(true);
    });

    test('setLoginOpen closes account nav, if it is open', () => {
        const initialState = {
            loginOpen: true
        };
        const action = setLoginOpen(false);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.loginOpen).toBe(false);
    });

    test('setLoginOpen leaves account nav closed, if it is already closed', () => {
        const initialState = {
            loginOpen: false
        };
        const action = setLoginOpen(false);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.loginOpen).toBe(false);
    });

    // setRegistrationOpen

    test('setRegistrationOpen opens account nav, if it is closed', () => {
        const initialState = {
            registrationOpen: false
        };
        const action = setRegistrationOpen(true);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.registrationOpen).toBe(true);
    });

    test('setRegistrationOpen leaves account nav open, if it is already open', () => {
        const initialState = {
            registrationOpen: true
        };
        const action = setRegistrationOpen(true);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.registrationOpen).toBe(true);
    });

    test('setRegistrationOpen closes account nav, if it is open', () => {
        const initialState = {
            registrationOpen: true
        };
        const action = setRegistrationOpen(false);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.registrationOpen).toBe(false);
    });

    test('setRegistrationOpen leaves account nav closed, if it is already closed', () => {
        const initialState = {
            registrationOpen: false
        };
        const action = setRegistrationOpen(false);
        const resultState = navigationReducer(initialState, action);
        expect(resultState.registrationOpen).toBe(false);
    });

    // setSearchTerm

    test('setSearchTerm sets search term', () => {
        const initialState = {
            searchTerm: null
        };
        const action = setSearchTerm('outer space');
        const resultState = navigationReducer(initialState, action);
        expect(resultState.searchTerm).toBe('outer space');
    });

    // toggleLoginOpen

    test('toggleLoginOpen can toggle on', () => {
        const initialState = {
            loginOpen: false
        };
        const action = toggleLoginOpen();
        const resultState = navigationReducer(initialState, action);
        expect(resultState.loginOpen).toBe(true);
    });

    test('toggleLoginOpen can toggle off', () => {
        const initialState = {
            loginOpen: true
        };
        const action = toggleLoginOpen();
        const resultState = navigationReducer(initialState, action);
        expect(resultState.loginOpen).toBe(false);
    });

    test('handleRegistrationRequested with useScratch3Registration true navigates user to /join, ' +
        'and does NOT open scratch 2 registration', () => {
        const initialState = {
            registrationOpen: false,
            useScratch3Registration: true
        };
        const action = handleRegistrationRequested();
        const resultState = navigationReducer(initialState, action);
        expect(resultState.registrationOpen).toBe(false);
        expect(global.window.location.assign).toHaveBeenCalledWith('/join');
    });

    test('handleRegistrationRequested with useScratch3Registration false does NOT navigate user away, ' +
        'DOES open scratch 2 registration', () => {
        const initialState = {
            registrationOpen: false,
            useScratch3Registration: false
        };
        const action = handleRegistrationRequested();
        const resultState = navigationReducer(initialState, action);
        expect(resultState.registrationOpen).toBe(true);
        expect(global.window.location.assign).not.toHaveBeenCalled();
    });
});
