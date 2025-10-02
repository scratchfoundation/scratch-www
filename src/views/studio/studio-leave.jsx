/* eslint-disable react/jsx-no-bind */
import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import useOnClickOutside from 'use-onclickoutside';

import {selectIsLeaving} from '../../redux/studio'; 
import {selectCanLeaveStudio} from '../../redux/studio-permissions';
import {
    mutateLeavingStudio, selectIsMutatingLeaving, selectLeavingMutationError, Errors
} from '../../redux/studio-mutations';

import classNames from 'classnames';
import ValidationMessage from '../../components/forms/validation-message.jsx';

const errorToMessageId = (error) => {
    switch (error) {
    case Errors.PERMISSION: 
        return 'studio.leaveErrors.permissionDenied'; 
    default: 
        return 'studio.leaveErrors.generic'; 
    }
};

const StudioLeave = ({
    canLeave,
    isLeaving,
    isMutating,
    leavingError,
    handleLeaving
}) => {
    const fieldClassName = classNames('button', 'mod-error', 'studio-leave-button', {
        'mod-mutating': isMutating
    });
    const [hideValidationMessage, setHideValidationMessage] = useState(false);

    const ref = useRef(null);

    useOnClickOutside(ref, () => {
        setHideValidationMessage(true);
    });

    if (!canLeave) return null; 

    return (
        <div
            className="studio-info-section"
            ref={ref}
        >
            <button
                className={fieldClassName}
                disabled={isMutating}
                onClick={() => {
                    setHideValidationMessage(false);
                    // One-way action call with no arguments
                    handleLeaving(); 
                }}
            >
                {isMutating ? '...' : (
                    // Simplified button text
                    <FormattedMessage id="studio.leaveStudio" />
                )}
            </button>
            {leavingError && !hideValidationMessage && <ValidationMessage
                mode="error"
                // NO 'withParentEmail' argument passed here
                message={<FormattedMessage id={errorToMessageId(leavingError)} />} 
            />}
        </div>
    );
};

StudioLeave.propTypes = {
    canLeave: PropTypes.bool,
    isLeaving: PropTypes.bool,
    isMutating: PropTypes.bool,
    leavingError: PropTypes.string, 
    handleLeaving: PropTypes.func
};

export default connect(
    state => ({
        // Corrected typo here
        canLeave: selectCanLeaveStudio(state),
        isMutating: selectIsMutatingLeaving(state),
        isLeaving: selectIsLeaving(state),
        // Corrected capitalization here
        leavingError: selectLeavingMutationError(state) 
    }),
    {
        handleLeaving: mutateLeavingStudio
    }
)(StudioLeave);
