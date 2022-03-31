const SET_TIME_TRAVEL = 'scratch-www/time-travel/SET_TIME_TRAVEL';
const initialState = {
    year: 'NOW'
};

const NOW = 'NOW';
const YEAR_1920 = '1920';

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_TIME_TRAVEL:
        return Object.assign({}, state, {
            year: action.year
        });
    default:
        return state;
    }
};

const isTimeTravel1920 = function (state) {
    return state.timeTravel.year === YEAR_1920;
};

const setTimeTravel1920 = function () {
    return {
        type: SET_TIME_TRAVEL,
        year: YEAR_1920
    };
};

const setTimeTravelNow = function () {
    return {
        type: SET_TIME_TRAVEL,
        year: NOW
    };
};

const setTimeTravel = function (mode) {
    return {
        type: SET_TIME_TRAVEL,
        year: mode
    };
};

export {
    reducer as default,
    initialState as timeTravelInitialState,
    isTimeTravel1920,
    setTimeTravel1920,
    setTimeTravelNow,
    setTimeTravel
};
