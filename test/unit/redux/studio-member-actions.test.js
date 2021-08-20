import {selectStudioManagerCount} from '../../../src/redux/studio';
import {
    Errors,
    removeManager,
    loadManagers,
    loadCurators,
    removeCurator,
    inviteCurator,
    promoteCurator,
    acceptInvitation,
    transferHost
} from '../../../src/views/studio/lib/studio-member-actions';
import {managers, curators} from '../../../src/views/studio/lib/redux-modules';
import {reducers, initialState} from '../../../src/views/studio/studio-redux';
import configureStore from '../../../src/lib/configure-store';

jest.mock('../../../src/lib/api');
import api from '../../../src/lib/api';

let store;

beforeEach(() => {
    api.mockClear();
});

describe('loadManagers', () => {
    test('it populates the managers list', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
        api.mockImplementation((opts, callback) => {
            const body = [{username: 'user1'}, {username: 'user2'}, {username: 'user3'}];
            callback(null, body, {statusCode: 200});
        });
        store.dispatch(loadManagers());
        let items = managers.selector(store.getState()).items;
        expect(api.mock.calls[0][0].uri).toBe('/studios/123123/managers/');
        expect(api.mock.calls[0][0].params.offset).toBe(0);
        expect(items.length).toBe(3);
        expect(items[0].username).toBe('user1');

        // Include the new offset next time it is called
        store.dispatch(loadManagers());
        expect(api.mock.calls[1][0].params.offset).toBe(3);
        items = managers.selector(store.getState()).items;
        expect(items.length).toBe(6);
    });

    test('it correctly uses the admin route when possible', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123},
            session: {
                session: {
                    user: {token: 'a-token'},
                    permissions: {admin: true}
                }
            }
        });
        api.mockImplementation((opts) => {
            expect(opts.uri).toBe('/admin/studios/123123/managers/');
            expect(opts.authentication).toBe('a-token');
        });
        store.dispatch(loadManagers());
    });

    test('errors are set on the managers state', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
        api.mockImplementation((opts, callback) => {
            callback(null, null, {statusCode: 500});
        });
        store.dispatch(loadManagers());
        expect(managers.selector(store.getState()).error).toBe(Errors.SERVER);
    });
});


describe('loadCurators', () => {
    test('it populates the curators list', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
        api.mockImplementation((opts, callback) => {
            const body = [{username: 'user1'}, {username: 'user2'}, {username: 'user3'}];
            callback(null, body, {statusCode: 200});
        });
        store.dispatch(loadCurators());
        let items = curators.selector(store.getState()).items;
        expect(api.mock.calls[0][0].uri).toBe('/studios/123123/curators/');
        expect(api.mock.calls[0][0].params.offset).toBe(0);
        expect(items.length).toBe(3);
        expect(items[0].username).toBe('user1');

        // Include the new offset next time it is called
        store.dispatch(loadCurators());
        expect(api.mock.calls[1][0].params.offset).toBe(3);
        items = curators.selector(store.getState()).items;
        expect(items.length).toBe(6);
    });

    test('it correctly uses the admin route when possible', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123},
            session: {
                session: {
                    user: {token: 'a-token'},
                    permissions: {admin: true}
                }
            }
        });
        api.mockImplementation((opts) => {
            expect(opts.uri).toBe('/admin/studios/123123/curators/');
            expect(opts.authentication).toBe('a-token');
        });
        store.dispatch(loadCurators());
    });

    test('errors are set on the curators state', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
        api.mockImplementation((opts, callback) => {
            callback(null, null, {statusCode: 500});
        });
        store.dispatch(loadCurators());
        expect(curators.selector(store.getState()).error).toBe(Errors.SERVER);
    });
});

describe('removeManager', () => {
    beforeEach(() => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {
                id: 123123,
                managers: 3,
                manager: true
            },
            managers: {
                items: [
                    {username: 'user1'},
                    {username: 'user2'},
                    {username: 'user3'}
                ]
            },
            session: {
                session: {
                    user: {username: 'user2'}
                }
            }
        });
    });

    test('removes the manager by username and decrements the count', async () => {
        api.mockImplementation((opts, callback) => {
            expect(opts.uri).toBe('/site-api/users/curators-in/123123/remove/');
            callback(null, {}, {statusCode: 200});
        });

        await store.dispatch(removeManager('user2'));
        const state = store.getState();

        // Ensure it removes the correct manager (index=1)
        expect(selectStudioManagerCount(state)).toBe(2);
        expect(managers.selector(state).items[0].username).toBe('user1');
        expect(managers.selector(state).items[1].username).toBe('user3');

        // Ensure roles change if you are removing yourself
        expect(state.studio.manager).toBe(false);
    });

    test('removing a manager that hasnt been loaded yet still works', async () => {
        // This covers an edge case the code allows where you can remove a manager
        // even if that manager hasn't been loaded into the paginated managers state yet.
        api.mockImplementation((opts, callback) => {
            callback(null, {}, {statusCode: 200}); // Server says that manager was removed
        });

        await store.dispatch(removeManager('user4'));
        const state = store.getState();

        // Manager count should still be updated
        expect(selectStudioManagerCount(state)).toBe(2);
        // The removed manager isn't the current user, so manager permission should be unchanged
        expect(state.studio.manager).toBe(true);
        // No change to the manager items list
        expect(managers.selector(state).items.length).toBe(3);
    });

    test('on error, promise rejects without any changing count or list', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, {}, {statusCode: 403});
        });

        await expect(store.dispatch(removeManager('user2')))
            .rejects.toBe(Errors.PERMISSION);

        const state = store.getState();
        const {items} = managers.selector(state);
        expect(selectStudioManagerCount(state)).toBe(3);
        expect(items.length).toBe(3);
    });
});

describe('removeCurator', () => {
    beforeEach(() => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123},
            curators: {
                items: [
                    {username: 'user1'},
                    {username: 'user2'},
                    {username: 'user3'}
                ]
            }
        });
    });

    test('removes the curator by username', async () => {
        api.mockImplementation((opts, callback) => {
            expect(opts.uri).toBe('/site-api/users/curators-in/123123/remove/');
            callback(null, {}, {statusCode: 200});
        });

        await store.dispatch(removeCurator('user2'));
        const state = store.getState();

        // Ensure it removes the correct curator (index=1)
        expect(curators.selector(state).items[0].username).toBe('user1');
        expect(curators.selector(state).items[1].username).toBe('user3');
    });

    test('on error, promise rejects without changing anything', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, {}, {statusCode: 500});
        });

        await expect(store.dispatch(removeCurator('user2')))
            .rejects.toBe(Errors.SERVER);
        
        const state = store.getState();
        const {items} = curators.selector(state);
        expect(items.length).toBe(3);
    });
});

describe('inviteCurator', () => {
    beforeEach(() => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
    });

    test('invites the curator on success', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, {}, {statusCode: 200});
        });

        const result = await store.dispatch(inviteCurator('user2'));
        expect(result).toBe('user2');
        expect(api.mock.calls[0][0].uri).toBe('/site-api/users/curators-in/123123/invite_curator/');
        expect(api.mock.calls[0][0].params.usernames).toBe('user2');
    });

    test('error because of unknown user', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, {}, {statusCode: 404});
        });
        await expect(store.dispatch(inviteCurator('user2')))
            .rejects.toBe(Errors.UNKNOWN_USERNAME);
    });
    test('error because of duplicate curator', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, {status: 'error', message: 'already a curator'}, {statusCode: 200});
        });
        await expect(store.dispatch(inviteCurator('user2')))
            .rejects.toBe(Errors.DUPLICATE);
    });
    test('error because of rate limit', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, null, {statusCode: 429});
        });
        await expect(store.dispatch(inviteCurator('user2')))
            .rejects.toBe(Errors.RATE_LIMIT);
    });
    test('unhandled error response', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, {status: 'error', message: 'xyz'}, {statusCode: 200});
        });
        await expect(store.dispatch(inviteCurator('user2')))
            .rejects.toBe(Errors.UNHANDLED);
    });
});

describe('promoteCurator', () => {
    beforeEach(() => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123, managers: 0},
            curators: {
                items: [{username: 'curatorName'}]
            }
        });
    });

    test('promotes the curator on success', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, {}, {statusCode: 200});
        });

        await store.dispatch(promoteCurator('curatorName'));
        const state = store.getState();
        const {items: curatorList} = curators.selector(state);
        const {items: managerList} = managers.selector(state);

        expect(api.mock.calls[0][0].uri).toBe('/site-api/users/curators-in/123123/promote/');
        expect(api.mock.calls[0][0].params.usernames).toBe('curatorName');
        expect(managerList.length).toBe(1);
        expect(managerList[0].username).toBe('curatorName');
        expect(curatorList.length).toBe(0);
        expect(selectStudioManagerCount(state)).toBe(1);
    });

    test('on error, promise rejects and nothing is modified', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, {}, {statusCode: 403});
        });
        await expect(store.dispatch(promoteCurator('curatorName')))
            .rejects.toBe(Errors.PERMISSION);
        const state = store.getState();
        const {items: curatorList} = curators.selector(state);
        const {items: managerList} = managers.selector(state);
        expect(managerList.length).toBe(0);
        expect(curatorList.length).toBe(1);
        expect(selectStudioManagerCount(state)).toBe(0);
    });

    test('error because of exceeding manager limit', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, {message: 'too many owners'}, {statusCode: 400});
        });
        await expect(store.dispatch(promoteCurator('curatorName')))
            .rejects.toBe(Errors.MANAGER_LIMIT);
    });
});

describe('acceptInvitation', () => {
    beforeEach(() => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123, invited: true, curator: false},
            session: {
                session: {
                    user: {
                        username: 'me'
                    }
                }
            }
        });
    });

    test('accepts the invitation on success', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, {username: 'me'}, {statusCode: 200});
        });
        jest.useFakeTimers();
        await store.dispatch(acceptInvitation());
        let state = store.getState();
        const {items: curatorList} = curators.selector(state);
        expect(api.mock.calls[0][0].uri).toBe('/site-api/users/curators-in/123123/add/');
        expect(api.mock.calls[0][0].params.usernames).toBe('me');
        expect(curatorList.length).toBe(1);
        expect(curatorList[0].username).toBe('me');
        expect(state.studio.invited).toBe(true); // Should remain true until timers run
        jest.runAllTimers(); // delay to show success alert before toggling invited back to false
        state = store.getState();
        expect(state.studio.invited).toBe(false);
        expect(state.studio.curator).toBe(true);
        jest.useRealTimers();
    });

    test('on error, promise rejects and nothing is modified', async () => {
        api.mockImplementation((opts, callback) => {
            callback(null, {}, {statusCode: 403});
        });
        await expect(store.dispatch(acceptInvitation()))
            .rejects.toBe(Errors.PERMISSION);
        const state = store.getState();
        const {items: curatorList} = curators.selector(state);
        expect(curatorList.length).toBe(0);
        expect(state.studio.invited).toBe(true);
        expect(state.studio.curator).toBe(false);
    });

    describe('transferHost', () => {
        beforeEach(() => {
            store = configureStore(reducers, {
                ...initialState,
                studio: {
                    id: 123123,
                    managers: 3
                }
            });
        });
    
        test('transfers the host on success', async () => {
            api.mockImplementation((opts, callback) => {
                callback(null, {}, {statusCode: 200});
            });
            await store.dispatch(transferHost('password', 'newHostName', 'newHostId'));
            const state = store.getState();
            expect(api.mock.calls[0][0].uri).toBe('/studios/123123/transfer/newHostName');
            expect(state.studio.owner).toBe('newHostId');
        });
    });
});
