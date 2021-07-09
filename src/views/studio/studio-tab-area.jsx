import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    useRouteMatch
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import StudioTabNav from './studio-tab-nav.jsx';
import StudioProjects from './studio-projects.jsx';
import StudioManagers from './studio-managers.jsx';
import StudioCurators from './studio-curators.jsx';
import StudioComments from './studio-comments.jsx';
import StudioActivity from './studio-activity.jsx';
import StudioCuratorInvite from './studio-curator-invite.jsx';

import {selectMuteStatus} from '../../redux/session.js';
import FormatTimeHOC from '../../lib/format-time-hoc.jsx';
import CommentingStatus from '../../components/commenting-status/commenting-status.jsx';
import {FormattedMessage} from 'react-intl';
import {selectShowCuratorMuteError} from '../../redux/studio-permissions.js';

const StudioTabArea = ({showCuratorMuteError, muteExpiresAtMs}) => {
    const match = useRouteMatch();

    return (
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
    );
};


StudioTabArea.propTypes = {
    showCuratorMuteError: PropTypes.bool,
    muteExpiresAtMs: PropTypes.number
};

export default connect(
    state => ({
        showCuratorMuteError: selectShowCuratorMuteError(state),
        muteExpiresAtMs: (selectMuteStatus(state).muteExpiresAt * 1000 || 0)
    })
)(StudioTabArea);
