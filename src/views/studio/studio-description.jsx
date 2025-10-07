/* eslint-disable react/jsx-no-bind */
import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import useOnClickOutside from 'use-onclickoutside';

import {selectStudioDescription, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo, selectShowEditMuteError} from '../../redux/studio-permissions';
import {
    Errors, mutateStudioDescription, selectIsMutatingDescription, selectDescriptionMutationError
} from '../../redux/studio-mutations';

import '../../components/forms/inplace-input.scss';
import ValidationMessage from '../../components/forms/validation-message.jsx';
import decorateText from '../../lib/decorate-text.jsx';
import StudioMuteEditMessage from './studio-mute-edit-message.jsx';

const errorToMessageId = error => {
    switch (error) {
    case Errors.INAPPROPRIATE: return 'studio.updateErrors.inappropriate';
    case Errors.TEXT_TOO_LONG: return 'studio.updateErrors.textTooLong';
    case Errors.REQUIRED_FIELD: return 'studio.updateErrors.requiredField';
    case Errors.USER_MUTED: return 'studio.mutedError';
    default: return 'studio.updateErrors.generic';
    }
};

const StudioDescription = ({
    descriptionError, isFetching, isMutating, isMutedEditor, description, canEditInfo, handleUpdate
}) => {
    const [showMuteMessage, setShowMuteMessage] = useState(false);
    const [hideValidationMessage, setHideValidationMessage] = useState(false);

    const ref = useRef(null);

    useOnClickOutside(ref, () => {
        setHideValidationMessage(true);
    });

    const fieldClassName = classNames('studio-description', {
        'mod-fetching': isFetching,
        'mod-mutating': isMutating,
        'mod-form-error': !!descriptionError,
        'muted-editor': showMuteMessage
    });

    return (
        <div
            className="studio-info-section"
            onMouseEnter={() => isMutedEditor && setShowMuteMessage(true)}
            onMouseLeave={() => isMutedEditor && setShowMuteMessage(false)}
            ref={ref}
        >
            {canEditInfo || isMutedEditor ? (
                <React.Fragment>
                    <textarea
                        rows="20"
                        className={classNames('inplace-textarea', fieldClassName)}
                        disabled={isMutating || isFetching || isMutedEditor}
                        defaultValue={description}
                        onBlur={e => {
                            if (e.target.value !== description) handleUpdate(e.target.value);
                            setHideValidationMessage(false);
                        }}
                    />
                    {descriptionError && !hideValidationMessage && <ValidationMessage
                        mode="error"
                        message={<FormattedMessage id={errorToMessageId(descriptionError)} />}
                    />}
                    {showMuteMessage && <StudioMuteEditMessage />}
                </React.Fragment>
            ) : (
                <div className={classNames('uneditable', fieldClassName)}>
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
    isMutedEditor: PropTypes.bool,
    description: PropTypes.string,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        description: selectStudioDescription(state),
        canEditInfo: selectCanEditInfo(state),
        isFetching: selectIsFetchingInfo(state),
        isMutating: selectIsMutatingDescription(state),
        isMutedEditor: selectShowEditMuteError(state),
        descriptionError: selectDescriptionMutationError(state)
    }),
    {
        handleUpdate: mutateStudioDescription
    }
)(StudioDescription);
