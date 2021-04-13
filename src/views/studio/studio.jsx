import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useRouteMatch
} from 'react-router-dom';

import Page from '../../components/page/www/page.jsx';
import render from '../../lib/render.jsx';

import StudioTabNav from './studio-tab-nav.jsx';
import StudioProjects from './studio-projects.jsx';
import StudioInfo from './studio-info.jsx';
import StudioCurators from './studio-curators.jsx';
import StudioComments from './studio-comments.jsx';
import StudioActivity from './studio-activity.jsx';

import {
    projects,
    curators,
    managers,
    activity
} from './lib/redux-modules';

const {getInitialState, studioReducer} = require('../../redux/studio');
const {studioReportReducer} = require('../../redux/studio-report');
const {commentsReducer} = require('../../redux/comments');
const {studioMutationsReducer} = require('../../redux/studio-mutations');

const StudioShell = () => {
    const match = useRouteMatch();

    return (
        <div style={{maxWidth: '960px', margin: 'auto'}}>
            <StudioInfo />
            <hr />
            <StudioTabNav />
            <div>
                <Switch>
                    <Route path={`${match.path}/curators`}>
                        <StudioCurators />
                    </Route>
                    <Route path={`${match.path}/comments`}>
                        <StudioComments />
                    </Route>
                    <Route path={`${match.path}/activity`}>
                        <StudioActivity />
                    </Route>
                    <Route path={`${match.path}/projects`}>
                        {/* We can force /projects back to / this way */}
                        <Redirect to={match.url} />
                    </Route>
                    <Route path={match.path}>
                        <StudioProjects />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

render(
    <Page>
        <Router>
            <Switch>
                {/* Use variable studioPath to support /studio-playground/ or future route */}
                <Route path="/:studioPath/:studioId">
                    <StudioShell />
                </Route>
            </Switch>
        </Router>
    </Page>,
    document.getElementById('app'),
    {
        [projects.key]: projects.reducer,
        [curators.key]: curators.reducer,
        [managers.key]: managers.reducer,
        [activity.key]: activity.reducer,
        comments: commentsReducer,
        studio: studioReducer,
        studioMutations: studioMutationsReducer,
        studioReport: studioReportReducer
    },
    {
        studio: {
            ...getInitialState(),
            // Include the studio id in the initial state to allow us
            // to stop passing around the studio id in components
            // when it is only needed for data fetching, not for rendering.
            id: window.location.pathname.split('/')[2]
        }
    }
);
