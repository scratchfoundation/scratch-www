/* eslint-disable react/jsx-no-bind */
import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import useOnClickOutside from 'use-onclickoutside';

import {selectIsLeaving} from '../../redux/studio'; 
import {selectCanLeaveStudio, Errors} from '../../redux/studio-permissions';
import {leaveStudio} from './lib/studio-member-actions'; 

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
                    handleLeaving();
                }}
            >
                {isMutating ? '...' : (
                    <FormattedMessage id="studio.leaveStudio" />
                )}
            </button>
            {leavingError && !hideValidationMessage && <ValidationMessage
                mode="error"
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
        canLeave: selectCanLeaveStudio(state),
        isMutating: state.studio.isMutatingLeaving, 
        leavingError: state.studio.leavingError,
        isLeaving: selectIsLeaving(state)
    }),
    {
        handleLeaving: leaveStudio 
    }
)(StudioLeave);
