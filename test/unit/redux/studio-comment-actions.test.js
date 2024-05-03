import actions from '../../../src/redux/studio-comment-actions';
import {reducers, initialState} from '../../../src/views/studio/studio-redux';
import configureStore from '../../../src/lib/configure-store';

jest.mock('../../../src/lib/api');
import api from '../../../src/lib/api';

let store;

beforeEach(() => {
    api.mockClear();
});

describe('getTopLevelComments', () => {
    test('replies are only loaded for comments with a reply_count > 0', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
        api.mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/studios/123123/comments');
            const body = [
                {id: 1, reply_count: 0},
                {id: 50, reply_count: 1},
                {id: 60, reply_count: 0},
                {id: 70, reply_count: 1}
            ];
            callback(null, body, {statusCode: 200});
        })
            .mockImplementationOnce((opts, callback) => {
                expect(opts.uri).toBe('/studios/123123/comments/50/replies');
                const body = [{id: 4, parent_id: 50}];
                callback(null, body, {statusCode: 200});
            })
            .mockImplementationOnce((opts, callback) => {
                expect(opts.uri).toBe('/studios/123123/comments/70/replies');
                const body = [{id: 5, parent_id: 70}];
                callback(null, body, {statusCode: 200});
            });
        store.dispatch(actions.getTopLevelComments());
        const state = store.getState();
        expect(state.comments.comments.length).toBe(4);
        expect(state.comments.replies[50].length).toBe(1);
        expect(state.comments.replies[70].length).toBe(1);
        expect(state.comments.replies[1]).toBeUndefined();
        expect(state.comments.replies[60]).toBeUndefined();
    });
    test('admin route is used when the session shows the user is an admin', () => {
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
        api.mockImplementationOnce(opts => {
            expect(opts.uri).toBe('/admin/studios/123123/comments');
            expect(opts.authentication).toBe('a-token');
        });
        store.dispatch(actions.getTopLevelComments());
    });
});

describe('getCommentById', () => {
    test('getting a top level comment will not load replies if there arent any', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
        api.mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/studios/123123/comments/111');
            const body = {id: 111, parent_id: null, reply_count: 0};
            callback(null, body, {statusCode: 200});
        });
        store.dispatch(actions.getCommentById(111));
        const state = store.getState();
        expect(state.comments.comments.length).toBe(1);
        expect(state.comments.replies[111]).toBeUndefined();
    });

    test('getting a top level comment will load replies', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
        api.mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/studios/123123/comments/111');
            const body = {id: 111, parent_id: null, reply_count: 2};
            callback(null, body, {statusCode: 200});
        }).mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/studios/123123/comments/111/replies');
            const body = [{id: 1, parent_id: 111}];
            callback(null, body, {statusCode: 200});
        });
        store.dispatch(actions.getCommentById(111));
        const state = store.getState();
        expect(state.comments.comments.length).toBe(1);
        expect(state.comments.replies[111].length).toBe(1);
    });

    test('getting a reply comment will load the parent comment and its other replies', () => {
        store = configureStore(reducers, {
            ...initialState,
            studio: {id: 123123}
        });
        // Expect 3 requests. First 111, which is a reply comment, maybe linked to from messages
        // Second is for 111's parent, which is 555.
        // Third is for 555's replies, which returns 111 and 112
        api.mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/studios/123123/comments/111');
            const body = {id: 111, parent_id: 555};
            callback(null, body, {statusCode: 200});
        })
            .mockImplementationOnce((opts, callback) => {
                expect(opts.uri).toBe('/studios/123123/comments/555');
                const body = {id: 555, reply_count: 2};
                callback(null, body, {statusCode: 200});
            })
            .mockImplementationOnce((opts, callback) => {
                expect(opts.uri).toBe('/studios/123123/comments/555/replies');
                const body = [{id: 111, parent_id: 555}, {id: 112, parent_id: 555}];
                callback(null, body, {statusCode: 200});
            });
        store.dispatch(actions.getCommentById(111));
        const state = store.getState();
        expect(state.comments.comments.length).toBe(1);
        expect(state.comments.replies[555].length).toBe(2);
    });
});

describe.skip('addNewComment', () => { });
describe.skip('deleteComment', () => { });
describe.skip('reportComment', () => { });
describe.skip('resetComments', () => { });
describe.skip('getReplies', () => { });
