/* eslint-disable react/jsx-no-bind */
import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import useOnClickOutside from 'use-onclickoutside';

import '../../components/forms/inplace-input.scss';
import {selectStudioTitle, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo, selectShowEditMuteError} from '../../redux/studio-permissions';
import {Errors, mutateStudioTitle, selectIsMutatingTitle, selectTitleMutationError} from '../../redux/studio-mutations';
import ValidationMessage from '../../components/forms/validation-message.jsx';
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

const TITLE_MAX_LENGTH = 52;

const StudioTitle = ({
    titleError, isFetching, isMutating, isMutedEditor, title, canEditInfo, handleUpdate
}) => {
    const fieldClassName = classNames('studio-title', {
        'mod-fetching': isFetching,
        'mod-mutating': isMutating,
        'mod-form-error': !!titleError,
        'muted-editor': isMutedEditor
    });

    const [showMuteMessage, setShowMuteMessage] = useState(false);
    const [hideValidationMessage, setHideValidationMessage] = useState(false);

    const ref = useRef(null);

    useOnClickOutside(ref, () => {
        setHideValidationMessage(true);
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
                        className={classNames('inplace-textarea', fieldClassName)}
                        disabled={isMutating || !canEditInfo || isFetching}
                        defaultValue={title}
                        maxLength={TITLE_MAX_LENGTH}
                        onKeyDown={e => e.key === 'Enter' && e.target.blur()}
                        onBlur={e => {
                            if (e.target.value !== title) handleUpdate(e.target.value);
                            setHideValidationMessage(false);
                        }}
                    />
                    {titleError && !hideValidationMessage && <ValidationMessage
                        mode="error"
                        message={<FormattedMessage id={errorToMessageId(titleError)} />}
                    />}
                    {showMuteMessage && <StudioMuteEditMessage />}
                </React.Fragment>
            ) : (
                <div className={fieldClassName}>{title}</div>
            )}
        </div>
    );
};

StudioTitle.propTypes = {
    titleError: PropTypes.string,
    canEditInfo: PropTypes.bool,
    isFetching: PropTypes.bool,
    isMutating: PropTypes.bool,
    isMutedEditor: PropTypes.bool,
    title: PropTypes.string,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        title: selectStudioTitle(state),
        canEditInfo: selectCanEditInfo(state),
        isFetching: selectIsFetchingInfo(state),
        isMutating: selectIsMutatingTitle(state),
        isMutedEditor: selectShowEditMuteError(state),
        titleError: selectTitleMutationError(state)
    }),
    {
        handleUpdate: mutateStudioTitle
    }
)(StudioTitle);
