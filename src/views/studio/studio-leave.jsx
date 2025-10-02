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

const errorToMessageId = (error, userUsesParentEmail) => {
    switch (error) {
    // NOTE: You need to create a new switch for LEAVING errors, 
    // but for now, we'll use the generic fallback.
    case Errors.PERMISSION: return userUsesParentEmail ?
        'studio.leaveErrors.confirmAccount' : // Needs i18n update
        'studio.leaveErrors.confirmEmail'; // Needs i18n update

    default: return 'studio.leaveErrors.generic'; // Needs i18n update
    }
};

const StudioLeave = ({
    canLeave,
    isLeaving,
    isMutating,
    leavingError,
    handleLeaving,
    withParentEmail
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
                    handleLeaving(); 
                }}
            >
                {isMutating ? '...' : (
                    <FormattedMessage id="studio.leaveStudio" />
                )}
            </button>
            {leavingError && !hideValidationMessage && <ValidationMessage
                mode="error"
                message={<FormattedMessage id={errorToMessageId(leavingError, withParentEmail)} />}
            />}
        </div>
    );
};

StudioLeave.propTypes = {
    canLeave: PropTypes.bool,
    isLeaving: PropTypes.bool,
    isMutating: PropTypes.bool,
    leavingError: PropTypes.string, 
    handleLeaving: PropTypes.func, 
    withParentEmail: PropTypes.bool
};

export default connect(
    state => ({
        canLeave: selectCanLeaveStudio(state),
        isMutating: selectIsMutatingLeaving(state),
        isLeaving: selectIsLeaving(state),
        leavingError: selectLeavingMutationError(state), 
        withParentEmail: state.session.session.flags && state.session.session.flags.with_parent_email
    }),
    {
        handleLeaving: mutateLeavingStudio
    }
)(StudioLeave);
