import React, {Suspense} from 'react';
import {
    Switch,
    Route,
    Redirect,
    useRouteMatch
} from 'react-router-dom';


import StudioTabNav from './studio-tab-nav.jsx';
const StudioMembers = React.lazy(() => import(/* webpackChunkName: "studio-members" */'./studio-members.jsx'));
const StudioActivity = React.lazy(() => import(/* webpackChunkName: "studio-activity" */'./studio-activity.jsx'));
const StudioComments = React.lazy(() => import(/* webpackChunkName: "studio-comments" */'./studio-comments.jsx'));
const StudioProjects = React.lazy(() => import(/* webpackChunkName: "studio-projects" */'./studio-projects.jsx'));

const StudioTabArea = () => {
    const match = useRouteMatch();

    return (
        <div className="studio-tabs">
            <StudioTabNav />
            <div>
                <Suspense fallback={<div className="studio-tab-area-loader" />}>

                    <Switch>
                        <Route path={`${match.path}/curators`}>
                            <StudioMembers />
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
                </Suspense>
            </div>
        </div>
    );
};


export default StudioTabArea;
