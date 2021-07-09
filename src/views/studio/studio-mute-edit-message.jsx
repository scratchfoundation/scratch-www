/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import ValidationMessage from '../../components/forms/validation-message.jsx';
import {selectMuteStatus} from '../../redux/session';
import FormatTimeHOC from '../../lib/format-time-hoc.jsx';

const StudioMuteEditMessage = ({
    className,
    messageId,
    muteExpiresAtMs
}) => (
    <ValidationMessage
        className={className}
        mode="info"
        message={<FormatTimeHOC>{formatRelativeTime =>
            (<FormattedMessage
                id={messageId}
                values={{
                    inDuration: formatRelativeTime(muteExpiresAtMs, window._locale)
                }}
            />)}
        </FormatTimeHOC>}
    />
);


StudioMuteEditMessage.propTypes = {
    className: PropTypes.string,
    messageId: PropTypes.string,
    muteExpiresAtMs: PropTypes.number
};

StudioMuteEditMessage.defaultProps = {
    messageId: 'studio.mutedEdit'
};

export default connect(
    state => ({
        muteExpiresAtMs: (selectMuteStatus(state).muteExpiresAt * 1000 || 0)
    })
)(StudioMuteEditMessage);
