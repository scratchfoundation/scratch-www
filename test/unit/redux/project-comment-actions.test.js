import actions from '../../../src/redux/project-comment-actions';
import configureStore from '../../../src/lib/configure-store';
import {commentsReducer} from '../../../src/redux/comments';

jest.mock('../../../src/lib/api');
import api from '../../../src/lib/api';

let store;

beforeEach(() => {
    api.mockClear();
    // TODO Ideally this would be the entire project page reducer list
    store = configureStore({comments: commentsReducer}, {});
});

describe('getTopLevelComments', () => {
    test('replies are only loaded for comments with a reply_count > 0', () => {
        api.mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/users/u/projects/123123/comments');
            const body = [
                {id: 1, reply_count: 0},
                {id: 50, reply_count: 1},
                {id: 60, reply_count: 0},
                {id: 70, reply_count: 1}
            ];
            callback(null, body, {statusCode: 200});
        })
            .mockImplementationOnce((opts, callback) => {
                expect(opts.uri).toBe('/users/u/projects/123123/comments/50/replies');
                const body = [{id: 4, parent_id: 50}];
                callback(null, body, {statusCode: 200});
            })
            .mockImplementationOnce((opts, callback) => {
                expect(opts.uri).toBe('/users/u/projects/123123/comments/70/replies');
                const body = [{id: 5, parent_id: 70}];
                callback(null, body, {statusCode: 200});
            });
        store.dispatch(actions.getTopLevelComments(123123, 0, 'u'));
        const state = store.getState();
        expect(state.comments.comments.length).toBe(4);
        expect(state.comments.replies[50].length).toBe(1);
        expect(state.comments.replies[70].length).toBe(1);
        expect(state.comments.replies[1]).toBeUndefined();
        expect(state.comments.replies[60]).toBeUndefined();
    });
    test('admin route is used correctly', () => {
        api.mockImplementationOnce(opts => {
            // NB: this route doesn't include the owner username
            expect(opts.uri).toBe('/admin/projects/123123/comments');
            expect(opts.authentication).toBe('a-token');
        });
        store.dispatch(actions.getTopLevelComments(123123, 0, 'u', true, 'a-token'));
    });
});

describe('getCommentById', () => {
    test('getting a top level comment will not load replies if there arent any', () => {
        api.mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/users/u/projects/123123/comments/111');
            const body = {id: 111, parent_id: null, reply_count: 0};
            callback(null, body, {statusCode: 200});
        });
        store.dispatch(actions.getCommentById(123123, 111, 'u'));
        const state = store.getState();
        expect(state.comments.comments.length).toBe(1);
        expect(state.comments.replies[111]).toBeUndefined();
    });

    test('admin route is used correctly', () => {
        api.mockImplementationOnce(opts => {
            // NB: this route doesn't include the owner username
            expect(opts.uri).toBe('/admin/projects/123123/comments/111');
            expect(opts.authentication).toBe('a-token');
        });
        store.dispatch(actions.getCommentById(123123, 111, 'u', true, 'a-token'));
    });

    test('getting a top level comment will load replies', () => {
        api.mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/users/u/projects/123123/comments/111');
            const body = {id: 111, parent_id: null, reply_count: 2};
            callback(null, body, {statusCode: 200});
        }).mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/users/u/projects/123123/comments/111/replies');
            const body = [{id: 1, parent_id: 111}];
            callback(null, body, {statusCode: 200});
        });
        store.dispatch(actions.getCommentById(123123, 111, 'u'));
        const state = store.getState();
        expect(state.comments.comments.length).toBe(1);
        expect(state.comments.replies[111].length).toBe(1);
    });

    test('getting a reply comment will load the parent comment and its other replies', () => {
        // Expect 3 requests. First 111, which is a reply comment, maybe linked to from messages
        // Second is for 111's parent, which is 555.
        // Third is for 555's replies, which returns 111 and 112
        api.mockImplementationOnce((opts, callback) => {
            expect(opts.uri).toBe('/users/u/projects/123123/comments/111');
            const body = {id: 111, parent_id: 555};
            callback(null, body, {statusCode: 200});
        })
            .mockImplementationOnce((opts, callback) => {
                expect(opts.uri).toBe('/users/u/projects/123123/comments/555');
                const body = {id: 555, reply_count: 2};
                callback(null, body, {statusCode: 200});
            })
            .mockImplementationOnce((opts, callback) => {
                expect(opts.uri).toBe('/users/u/projects/123123/comments/555/replies');
                const body = [{id: 111, parent_id: 555}, {id: 112, parent_id: 555}];
                callback(null, body, {statusCode: 200});
            });
        store.dispatch(actions.getCommentById(123123, 111, 'u'));
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
