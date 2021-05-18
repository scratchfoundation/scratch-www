/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import {selectStudioDescription, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {
    Errors, mutateStudioDescription, selectIsMutatingDescription, selectDescriptionMutationError
} from '../../redux/studio-mutations';

import ValidationMessage from '../../components/forms/validation-message.jsx';
import decorateText from '../../lib/decorate-text.jsx';
import {selectIsMuted} from '../../redux/session';
import StudioMuteEditMessage from './studio-mute-edit-message.jsx';

const errorToMessageId = error => {
    switch (error) {
    case Errors.INAPPROPRIATE: return 'studio.updateErrors.inappropriate';
    case Errors.TEXT_TOO_LONG: return 'studio.updateErrors.textTooLong';
    case Errors.REQUIRED_FIELD: return 'studio.updateErrors.requiredField';
    default: return 'studio.updateErrors.generic';
    }
};

const StudioDescription = ({
    descriptionError, isFetching, isMutating, isMuted, description, canEditInfo, handleUpdate
}) => {
    const fieldClassName = classNames('studio-description', {
        'mod-fetching': isFetching,
        'mod-mutating': isMutating,
        'mod-form-error': !!descriptionError,
        'muted': isMuted
    });

    const [showMuteMessage, setShowMuteMessage] = useState(false);

    return (
        <div
            className="studio-info-section"
            onMouseEnter={() => isMuted && setShowMuteMessage(true)}
            onMouseLeave={() => isMuted && setShowMuteMessage(false)}
        >
            {canEditInfo ? (
                <React.Fragment>
                    <textarea
                        rows="20"
                        className={fieldClassName}
                        disabled={isMutating || isFetching}
                        defaultValue={description}
                        onBlur={e => e.target.value !== description &&
                    handleUpdate(e.target.value)}
                    />
                    {descriptionError && <ValidationMessage
                        mode="error"
                        message={<FormattedMessage id={errorToMessageId(descriptionError)} />}
                    />}
                    {showMuteMessage && <StudioMuteEditMessage />}
                </React.Fragment>
            ) : (
                <div className={fieldClassName}>
                    {decorateText(description, {
                        usernames: true,
                        hashtags: false,
                        scratchLinks: true
                    })}
                </div>
            )}
        </div>
    );
};

StudioDescription.propTypes = {
    descriptionError: PropTypes.string,
    canEditInfo: PropTypes.bool,
    isFetching: PropTypes.bool,
    isMutating: PropTypes.bool,
    isMuted: PropTypes.bool,
    description: PropTypes.string,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        description: selectStudioDescription(state),
        canEditInfo: selectCanEditInfo(state),
        isFetching: selectIsFetchingInfo(state),
        isMutating: selectIsMutatingDescription(state),
        isMuted: selectIsMuted(state),
        descriptionError: selectDescriptionMutationError(state)
    }),
    {
        handleUpdate: mutateStudioDescription
    }
)(StudioDescription);
