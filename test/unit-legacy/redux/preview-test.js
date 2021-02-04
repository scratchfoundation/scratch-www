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
