/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import ValidationMessage from '../../components/forms/validation-message.jsx';
import {selectMuteStatus} from '../../redux/session';
import {formatRelativeTime} from '../../lib/format-time.js';

const StudioMuteEditMessage = ({
    className,
    messageId,
    muteExpiresAtMs
}) => (
    <ValidationMessage
        className={className}
        mode="info"
        message={<FormattedMessage
            id={messageId}
            values={{
                inDuration: formatRelativeTime(muteExpiresAtMs, window._locale)
            }}
        />}
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
