/**
 * @typedef ReduxModule
 * A redux "module" for reusable functionality. The module exports
 * a reducer function, a set of action creators and a selector
 * that are all scoped to the given "key". This allows us to reuse
 * this reducer multiple times in the same redux store.
 *
 * @property {string} key The key to use when registering this
 *      modules reducer in the redux state tree.
 * @property {function} selector Function called with the full
 *      state tree to select only this modules slice of the state.
 * @property {object} actions An object of action creator functions
 *      to call to make changes to the data in this reducer.
 * @property {function} reducer A redux reducer that takes an action
 *      from the action creators and the current state and returns
 *      the next state.
 */

/**
 * @typedef {function} InfiniteListFetcher
 * A function to call that returns more data for the InfiniteList
 * loadMore action. It must resolve to {items: [], moreToLoad} or
 * reject with the error {statusCode}.
 * @returns {Promise<{items:[], moreToLoad:boolean}>}
 */

/**
 * A redux module to create a list of items where more items can be loaded
 * using an API. Additionally, there are actions for prepending items
 * to the list, removing items and handling load errors.
 *
 * @param {string} key - used to scope action names and the selector
 *      This key must be unique among other instances of this module.
 * @returns {ReduxModule} the redux module
 */
const InfiniteList = key => {
    
    const initialState = {
        items: [],
        offset: 0,
        error: null,
        loading: true,
        moreToLoad: false
    };

    const reducer = (state, action) => {
        if (typeof state === 'undefined') {
            state = initialState;
        }

        switch (action.type) {
        case `${key}_LOADING`:
            return {
                ...state,
                error: null,
                loading: true
            };
        case `${key}_APPEND`:
            return {
                ...state,
                items: state.items.concat(action.items),
                loading: false,
                error: null,
                moreToLoad: action.moreToLoad
            };
        case `${key}_REPLACE`:
            return {
                ...state,
                items: state.items.map((item, i) => {
                    if (i === action.index) return action.item;
                    return item;
                })
            };
        case `${key}_REMOVE`:
            return {
                ...state,
                items: state.items.filter((_, i) => i !== action.index)
            };
        case `${key}_PREPEND`:
            return {
                ...state,
                items: [action.item].concat(state.items)
            };
        case `${key}_ERROR`:
            return {
                ...state,
                error: action.error,
                loading: false,
                moreToLoad: false
            };
        default:
            return state;
        }
    };

    const actions = {
        create: item => ({type: `${key}_PREPEND`, item}),
        remove: index => ({type: `${key}_REMOVE`, index}),
        replace: (index, item) => ({type: `${key}_REPLACE`, index, item}),
        error: error => ({type: `${key}_ERROR`, error}),
        loading: () => ({type: `${key}_LOADING`}),
        append: (items, moreToLoad) => ({type: `${key}_APPEND`, items, moreToLoad}),

        /**
         * Load more action returns a thunk. It takes a function to call to get more items.
         * It will call the LOADING action before calling the fetcher, and call
         * APPEND with the results or call ERROR.
         * @param {InfiniteListFetcher} fetcher - function that returns a promise
         *  which must resolve to {items: [], moreToLoad}.
         * @returns {function} a thunk that sequences the load and dispatches
         */
        loadMore: fetcher => (dispatch => {
            dispatch(actions.loading());
            return fetcher()
                .then(({items, moreToLoad}) => dispatch(actions.append(items, moreToLoad)))
                .catch(error => dispatch(actions.error(error)));
        })
    };

    const selector = state => state[key];
    
    return {
        key, actions, reducer, selector
    };
};

export default InfiniteList;
