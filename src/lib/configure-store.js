const redux = require('redux');
const thunk = require('redux-thunk').default;

const reducer = require('../redux/reducer.js');

const configureStore = (reducers, initialState, enhancer) => {
    const allReducers = reducer(reducers);

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
    const enhancers = enhancer ?
        composeEnhancers(
            redux.applyMiddleware(thunk),
            enhancer
        ) :
        composeEnhancers(
            redux.applyMiddleware(thunk)
        );
    const store = redux.createStore(
        allReducers,
        initialState || {},
        enhancers
    );
    return store;
};

module.exports = configureStore;
