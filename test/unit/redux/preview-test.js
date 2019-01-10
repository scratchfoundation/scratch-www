const tap = require('tap');
const Preview = require('../../../src/redux/preview');
const initialState = Preview.getInitialState();
const reducer = Preview.previewReducer;

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

tap.test('resetProject', t => {
    state = reducer({some: 'garbage'}, Preview.resetProject());
    t.deepEqual(state, initialState);
    t.end();
});

tap.test('setProjectInfo', t => {
    // Initial values
    t.equal(initialState.projectNotAvailable, false);
    t.deepEqual(initialState.projectInfo, {});

    // setProjectInfo action with an `info` value sets the projectInfo
    state = reducer(initialState, Preview.setProjectInfo('a value'));
    t.equal(state.projectInfo, 'a value');
    t.equal(state.projectNotAvailable, false);

    // setProjectInfo action with null info sets projectNotAvailable to true
    // and resets the project info back to default state
    state = reducer(initialState, Preview.setProjectInfo(null));
    t.deepEqual(state.projectInfo, initialState.projectInfo);
    t.equal(state.projectNotAvailable, true);
    t.end();
});

tap.test('updateProjectInfo', t => {
    const info = {a: 'value a', b: 'value b'};
    state = reducer({projectInfo: info}, Preview.updateProjectInfo({
        b: 'new value b',
        c: 'new value c'
    }));
    t.deepEqual(state.projectInfo, {
        a: 'value a',
        b: 'new value b',
        c: 'new value c'
    });
    t.end();
});

tap.test('setComments', t => {
    // Initial value
    t.deepEqual(initialState.comments, []);

    state = reducer(initialState, Preview.setComments([{id: 1}, {id: 2}]));
    state = reducer(state, Preview.setComments([{id: 3}, {id: 4}]));
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
    state = reducer(commentState, Preview.setComments([{id: 'id1'}]));
    // Does not increase the number of comments, still 3
    t.equal(state.comments.length, 3);
    t.end();
});

tap.test('setCommentDeleted, top level comment', t => {
    state = reducer(commentState, Preview.setCommentDeleted('id2'));
    t.equal(state.comments[1].visibility, 'deleted');
    t.end();
});

tap.test('setCommentDeleted, reply comment', t => {
    state = reducer(commentState, Preview.setCommentDeleted('id4', 'id1'));
    t.equal(state.replies.id1[0].visibility, 'deleted');
    t.end();
});

tap.test('setRepliesDeleted/Restored', t => {
    state = reducer(commentState, Preview.setRepliesDeleted('id1'));
    t.equal(state.replies.id1[0].visibility, 'deleted');
    t.equal(state.replies.id1[1].visibility, 'deleted');

    state = reducer(state, Preview.setRepliesRestored('id1'));
    t.equal(state.replies.id1[0].visibility, 'visible');
    t.equal(state.replies.id1[1].visibility, 'visible');
    t.end();
});

tap.test('setCommentReported, top level comment', t => {
    state = reducer(commentState, Preview.setCommentReported('id2'));
    t.equal(state.comments[1].visibility, 'reported');
    t.end();
});

tap.test('setCommentReported, reply comment', t => {
    state = reducer(commentState, Preview.setCommentReported('id4', 'id1'));
    t.equal(state.replies.id1[0].visibility, 'reported');
    t.end();
});

tap.test('addNewComment, top level comment', t => {
    state = reducer(commentState, Preview.addNewComment({id: 'new comment'}));
    // Adds comment to beginning of list
    t.equal(state.comments[0].id, 'new comment');
    t.end();
});

tap.test('addNewComment, reply comment', t => {
    state = reducer(commentState, Preview.addNewComment({id: 'new comment'}, 'id1'));
    // Adds replies to the end of the replies list
    t.equal(state.replies.id1[2].id, 'new comment');
    t.end();
});

tap.test('setReplies', t => {
    // setReplies should append new replies
    state = reducer(commentState, Preview.setReplies({
        id1: {id: 'id6'}
    }));
    t.equal(state.replies.id1[2].id, 'id6');
    t.equal(state.comments[0].moreRepliesToLoad, false);

    // setReplies should ignore duplicates, do the same as above again
    t.equal(state.replies.id1.length, 3);
    state = reducer(state, Preview.setReplies({id1: {id: 'id6'}}));
    t.equal(state.replies.id1.length, 3);

    // setReplies can add replies to a comment that didn't have any
    state = reducer(state, Preview.setReplies({
        id2: {id: 'id7'}
    }));
    t.equal(state.replies.id1.length, 3);
    t.equal(state.replies.id2.length, 1);
    t.equal(state.replies.id2[0].id, 'id7');
    t.equal(state.comments[0].moreRepliesToLoad, false);
    t.equal(state.comments[1].moreRepliesToLoad, false);

    // Getting 20 (COMMENT_LIMIT) replies sets moreRepliesToLoad to true
    state = reducer(state, Preview.setReplies({
        id3: (new Array(20)).map((_, i) => ({id: `id${i + 1}`}))
    }));
    t.equal(state.comments[0].moreRepliesToLoad, false);
    t.equal(state.comments[1].moreRepliesToLoad, false);
    t.equal(state.comments[2].moreRepliesToLoad, true);

    // Getting one more reply sets moreRepliesToLoad back to false
    state = reducer(state, Preview.setReplies({
        id3: {id: 'id21'}
    }));
    t.equal(state.comments[2].moreRepliesToLoad, false);
    t.end();
});
