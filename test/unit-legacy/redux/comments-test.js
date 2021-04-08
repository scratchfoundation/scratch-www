const tap = require('tap');
const Comments = require('../../../src/redux/comments');
const initialState = Comments.getInitialState();
const reducer = Comments.commentsReducer;

let state;

tap.tearDown(() => process.nextTick(process.exit));

tap.test('Reducer', t => {
    t.type(reducer, 'function');
    t.type(initialState, 'object');

    // Reducers should return their default state when called without state
    let undefinedState;
    t.deepEqual(initialState, reducer(undefinedState, {type: 'fake action'}));
    t.end();
});

tap.test('setFetchStatus', t => {
    // initial value
    t.equal(initialState.status.comments, Comments.Status.NOT_FETCHED);

    state = reducer(initialState, Comments.setFetchStatus('comments', Comments.Status.FETCHING));
    t.equal(state.status.comments, Comments.Status.FETCHING);

    state = reducer(state, Comments.setFetchStatus('comments', Comments.Status.FETCHED));
    t.equal(state.status.comments, Comments.Status.FETCHED);

    t.end();
});

tap.test('setComments', t => {
    // Initial value
    t.deepEqual(initialState.comments, []);

    state = reducer(initialState, Comments.setComments([{id: 1}, {id: 2}]));
    state = reducer(state, Comments.setComments([{id: 3}, {id: 4}]));
    t.deepEqual(state.comments, [{id: 1}, {id: 2}, {id: 3}, {id: 4}]);

    t.end();
});

const commentState = {
    comments: [
        {id: 'id1', visibility: 'visible'},
        {id: 'id2', visibility: 'visible'},
        {id: 'id3', visibility: 'visible'}
    ],
    replies: {
        id1: [
            {id: 'id4', visibility: 'visible'},
            {id: 'id5', visibility: 'visible'}
        ]
    }
};

tap.test('setComments, discards duplicates', t => {
    state = reducer(commentState, Comments.setComments([{id: 'id1'}]));
    // Does not increase the number of comments, still 3
    t.equal(state.comments.length, 3);
    t.end();
});

tap.test('setCommentDeleted, top level comment', t => {
    state = reducer(commentState, Comments.setCommentDeleted('id2'));
    t.equal(state.comments[1].visibility, 'deleted');
    t.end();
});

tap.test('setCommentDeleted, reply comment', t => {
    state = reducer(commentState, Comments.setCommentDeleted('id4', 'id1'));
    t.equal(state.replies.id1[0].visibility, 'deleted');
    t.end();
});

tap.test('setRepliesDeleted/Restored', t => {
    state = reducer(commentState, Comments.setRepliesDeleted('id1'));
    t.equal(state.replies.id1[0].visibility, 'deleted');
    t.equal(state.replies.id1[1].visibility, 'deleted');

    state = reducer(state, Comments.setRepliesRestored('id1'));
    t.equal(state.replies.id1[0].visibility, 'visible');
    t.equal(state.replies.id1[1].visibility, 'visible');
    t.end();
});

tap.test('setCommentReported, top level comment', t => {
    state = reducer(commentState, Comments.setCommentReported('id2'));
    t.equal(state.comments[1].visibility, 'reported');
    t.end();
});

tap.test('setCommentReported, reply comment', t => {
    state = reducer(commentState, Comments.setCommentReported('id4', 'id1'));
    t.equal(state.replies.id1[0].visibility, 'reported');
    t.end();
});

tap.test('addNewComment, top level comment', t => {
    state = reducer(commentState, Comments.addNewComment({id: 'new comment'}));
    // Adds comment to beginning of list
    t.equal(state.comments[0].id, 'new comment');
    t.end();
});

tap.test('addNewComment, reply comment', t => {
    state = reducer(commentState, Comments.addNewComment({id: 'new comment'}, 'id1'));
    // Adds replies to the end of the replies list
    t.equal(state.replies.id1[2].id, 'new comment');
    t.end();
});

tap.test('setReplies', t => {
    // setReplies should append new replies
    state = reducer(commentState, Comments.setReplies({
        id1: {id: 'id6'}
    }));
    t.equal(state.replies.id1[2].id, 'id6');
    t.equal(state.comments[0].moreRepliesToLoad, false);

    // setReplies should ignore duplicates, do the same as above again
    t.equal(state.replies.id1.length, 3);
    state = reducer(state, Comments.setReplies({id1: {id: 'id6'}}));
    t.equal(state.replies.id1.length, 3);

    // setReplies can add replies to a comment that didn't have any
    state = reducer(state, Comments.setReplies({
        id2: {id: 'id7'}
    }));
    t.equal(state.replies.id1.length, 3);
    t.equal(state.replies.id2.length, 1);
    t.equal(state.replies.id2[0].id, 'id7');
    t.equal(state.comments[0].moreRepliesToLoad, false);
    t.equal(state.comments[1].moreRepliesToLoad, false);

    // Getting 20 (COMMENT_LIMIT) replies sets moreRepliesToLoad to true
    state = reducer(state, Comments.setReplies({
        id3: (new Array(20)).map((_, i) => ({id: `id${i + 1}`}))
    }));
    t.equal(state.comments[0].moreRepliesToLoad, false);
    t.equal(state.comments[1].moreRepliesToLoad, false);
    t.equal(state.comments[2].moreRepliesToLoad, true);

    // Getting one more reply sets moreRepliesToLoad back to false
    state = reducer(state, Comments.setReplies({
        id3: {id: 'id21'}
    }));
    t.equal(state.comments[2].moreRepliesToLoad, false);
    t.end();
});
