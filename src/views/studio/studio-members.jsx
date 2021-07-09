import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import StudioManagers from './studio-managers.jsx';
import StudioCurators from './studio-curators.jsx';
import StudioCuratorInvite from './studio-curator-invite.jsx';

import {selectMuteStatus} from '../../redux/session.js';
import FormatTimeHOC from '../../lib/format-time-hoc.jsx';
import CommentingStatus from '../../components/commenting-status/commenting-status.jsx';
import {FormattedMessage} from 'react-intl';
import {selectShowCuratorMuteError} from '../../redux/studio-permissions.js';

const StudioMembers = ({showCuratorMuteError, muteExpiresAtMs}) => (<React.Fragment>
    <StudioCuratorInvite />
    {
        showCuratorMuteError &&
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
</React.Fragment>);


StudioMembers.propTypes = {
    showCuratorMuteError: PropTypes.bool,
    muteExpiresAtMs: PropTypes.number
};

export default connect(
    state => ({
        showCuratorMuteError: selectShowCuratorMuteError(state),
        muteExpiresAtMs: (selectMuteStatus(state).muteExpiresAt * 1000 || 0)
    })
)(StudioMembers);
