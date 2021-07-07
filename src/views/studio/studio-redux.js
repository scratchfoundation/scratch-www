import {
    projects,
    curators,
    managers,
    activity,
    userProjects
} from './lib/redux-modules';

const {getInitialState, studioReducer} = require('../../redux/studio');
const {studioReportReducer} = require('../../redux/studio-report');
const {commentsReducer} = require('../../redux/comments');
const {studioMutationsReducer} = require('../../redux/studio-mutations');


const reducers = {
    [projects.key]: projects.reducer,
    [curators.key]: curators.reducer,
    [managers.key]: managers.reducer,
    [activity.key]: activity.reducer,
    [userProjects.key]: userProjects.reducer,
    comments: commentsReducer,
    studio: studioReducer,
    studioMutations: studioMutationsReducer,
    studioReport: studioReportReducer
};

const initialState = {
    studio: {
        ...getInitialState(),
        // Include the studio id in the initial state to allow us
        // to stop passing around the studio id in components
        // when it is only needed for data fetching, not for rendering.
        id: window.location.pathname.split('/')[2]
    }
};

export {reducers, initialState};
