import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useRouteMatch
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import Page from '../../components/page/www/page.jsx';
import render from '../../lib/render.jsx';
import NotAvailable from '../../components/not-available/not-available.jsx';


import StudioTabNav from './studio-tab-nav.jsx';
import StudioProjects from './studio-projects.jsx';
import StudioInfo from './studio-info.jsx';
import StudioManagers from './studio-managers.jsx';
import StudioCurators from './studio-curators.jsx';
import StudioComments from './studio-comments.jsx';
import StudioActivity from './studio-activity.jsx';
import StudioCuratorInvite from './studio-curator-invite.jsx';
import StudioMeta from './studio-meta.jsx';
import StudioAdminPanel from './studio-admin-panel.jsx';
import StudioDeleted from './studio-deleted.jsx';

import {reducers, initialState} from './studio-redux.js';
import {selectStudioLoadFailed, getInfo} from '../../redux/studio';

import './studio.scss';
import {selectIsAdmin, selectMuteStatus} from '../../redux/session.js';
import FormatTimeHOC from '../../lib/format-time-hoc.jsx';
import CommentingStatus from '../../components/commenting-status/commenting-status.jsx';
import {FormattedMessage} from 'react-intl';
import {selectShowCuratorMuteError} from '../../redux/studio-permissions.js';

const StudioShell = ({isAdmin, showCuratorMuteError, muteExpiresAtMs, studioLoadFailed, onLoadInfo}) => {
    const match = useRouteMatch();

    useEffect(() => {
        onLoadInfo();
    }, [isAdmin]); // Reload any time isAdmin changes to allow admins to view deleted studios

    return (
        studioLoadFailed ?
            <NotAvailable /> :
            <div className="studio-shell">
                <StudioDeleted />
                <StudioMeta />
                <div className="studio-info">
                    <StudioInfo />
                </div>
                <div className="studio-tabs">
                    <StudioTabNav />
                    <div>
                        <Switch>
                            <Route path={`${match.path}/curators`}>
                                <StudioCuratorInvite />
                                {showCuratorMuteError &&
                                    <CommentingStatus>
                                        <p>
                                            <div>
                                                <FormatTimeHOC>{formatRelativeTime =>
                                                    (<FormattedMessage
                                                        id="studio.mutedCurators"
                                                        values={{
                                                            inDuration: formatRelativeTime(muteExpiresAtMs, window._locale)
                                                        }}
                                                    />)}
                                                </FormatTimeHOC>
                                            </div>
                                            <div><FormattedMessage id="studio.mutedPaused" /></div>
                                        </p>
                                    </CommentingStatus>
                                }
                                <StudioManagers />
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
            </div>
    );
};

StudioShell.propTypes = {
    isAdmin: PropTypes.bool,
    showCuratorMuteError: PropTypes.bool,
    muteExpiresAtMs: PropTypes.number,
    studioLoadFailed: PropTypes.bool,
    onLoadInfo: PropTypes.func
};

const ConnectedStudioShell = connect(
    state => ({
        showCuratorMuteError: selectShowCuratorMuteError(state),
        studioLoadFailed: selectStudioLoadFailed(state),
        muteExpiresAtMs: (selectMuteStatus(state).muteExpiresAt * 1000 || 0),
        isAdmin: selectIsAdmin(state)
    }),
    {
        onLoadInfo: getInfo
    }
)(StudioShell);

render(
    <Page className="studio-page">
        <StudioAdminPanel />
        <Router>
            <Switch>
                {/* Use variable studioPath to support /studio-playground/ or future route */}
                <Route path="/:studioPath/:studioId">
                    <ConnectedStudioShell />
                </Route>
            </Switch>
        </Router>
    </Page>,
    document.getElementById('app'),
    reducers,
    initialState
);
