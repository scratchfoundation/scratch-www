import {
    Errors,
    loadProjects,
    addProject,
    removeProject
} from '../../../src/views/studio/lib/studio-project-actions';
import {projects} from '../../../src/views/studio/lib/redux-modules';
import {reducers, initialState} from '../../../src/views/studio/studio-redux';
import configureStore from '../../../src/lib/configure-store';

jest.mock('../../../src/lib/api');
import api from '../../../src/lib/api';

let store;

beforeEach(() => {
    api.mockClear();
});

describe('loadProjects', () => {
    test('it populates the projects list', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
        api.mockImplementation((opts, callback) => {
            const body = [{id: 1}, {id: 2}, {id: 3}];
            callback(null, body, {statusCode: 200});
        });
        store.dispatch(loadProjects());
        let items = projects.selector(store.getState()).items;
        expect(api.mock.calls[0][0].uri).toBe('/studios/123123/projects/');
        expect(api.mock.calls[0][0].params.offset).toBe(0);
        expect(items.length).toBe(3);
        expect(items[0].id).toBe(1);

        // Include the new offset next time it is called
        store.dispatch(loadProjects());
        expect(api.mock.calls[1][0].params.offset).toBe(3);
        items = projects.selector(store.getState()).items;
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
            expect(opts.uri).toBe('/admin/studios/123123/projects/');
            expect(opts.authentication).toBe('a-token');
        });
        store.dispatch(loadProjects());
    });

    test('errors are set on the projects state', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
        api.mockImplementation((opts, callback) => {
            callback(null, null, {statusCode: 500});
        });
        store.dispatch(loadProjects());
        expect(projects.selector(store.getState()).error).toBe(Errors.SERVER);
    });
});

describe('addProject', () => {
    beforeEach(() => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
    });
    test('makes a POST and a GET and then combines the result and puts it in redux', async () => {
        const postResponse = {
            projectId: '111',
            actorId: 'actor-id'
        };
        const getResponse = {
            title: 'project-title',
            image: 'project-image',
            author: {
                id: 'author-id',
                username: 'author-username',
                profile: {images: [1, 2, 3]}
            }
        };
        api.mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/studios/123123/project/111');
            expect(opts.method).toBe('POST');
            callback(null, postResponse, {statusCode: 200});
        }).mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/projects/111');
            callback(null, getResponse, {statusCode: 200});
        });
        await store.dispatch(addProject('scratch.mit.edu/projects/111'));
        const {items} = projects.selector(store.getState());
        expect(items.length).toBe(1);
        // Item in redux is a combination of get/post that matches the shape of the studio projects endpoint
        expect(items[0]).toMatchObject({
            id: 111,
            actor_id: 'actor-id',
            title: 'project-title',
            image: 'project-image',
            creator_id: 'author-id',
            username: 'author-username',
            avatar: [1, 2, 3]
        });
    });
    test('submitting an invalid returns error without network requests', async () => {
        await expect(store.dispatch(addProject('abc')))
            .rejects.toBe(Errors.UNKNOWN_PROJECT);
        expect(api.mock.calls.length).toBe(0);
    });
    test('submitting an existing project returns error without network requests', async () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123},
            projects: {items: [{id: 999}]}
        });
        await expect(store.dispatch(addProject('localhost:800/projects/999')))
            .rejects.toBe(Errors.DUPLICATE);
        expect(api.mock.calls.length).toBe(0);
    });
    test('rate limit server response', async () => {
        api.mockImplementationOnce((opts, callback) => {
            callback(null, null, {statusCode: 429});
        });
        await expect(store.dispatch(addProject('localhost:800/projects/999')))
            .rejects.toBe(Errors.RATE_LIMIT);
    });
    test('unknown project server response', async () => {

        api.mockImplementationOnce((opts, callback) => {
            callback(null, null, {statusCode: 404});
        });
        await expect(store.dispatch(addProject('localhost:800/projects/999')))
            .rejects.toBe(Errors.UNKNOWN_PROJECT);
    });
    test('not allowed server response', async () => {
        api.mockImplementationOnce((opts, callback) => {
            callback(null, null, {statusCode: 403});
        });
        await expect(store.dispatch(addProject('localhost:800/projects/999')))
            .rejects.toBe(Errors.PERMISSION);
    });
    test('muted server response', async () => {
        api.mockImplementationOnce((opts, callback) => {
            callback(null, {mute_status: {}}, {statusCode: 403});
        });
        await expect(store.dispatch(addProject('localhost:800/projects/999')))
            .rejects.toBe(Errors.USER_MUTED);
    });
});

describe('removeProject', () => {
    beforeEach(() => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123},
            projects: {items: [{id: 999}]}
        });
    });
    test('makes a DELETE and removes the item from redux', async () => {
        api.mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/studios/123123/project/999');
            expect(opts.method).toBe('DELETE');
            callback(null, {}, {statusCode: 200});
        });
        await store.dispatch(removeProject(999));
        const {items} = projects.selector(store.getState());
        expect(items.length).toBe(0);
    });

    test('errors are set on the projects state', async () => {
        api.mockImplementationOnce((opts, callback) => {
            callback(null, {}, {statusCode: 500});
        });
        await expect(store.dispatch(removeProject(999)))
            .rejects.toBe(Errors.SERVER);
    });
});
