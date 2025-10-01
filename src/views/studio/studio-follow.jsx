/* eslint-disable react/jsx-no-bind */
import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import useOnClickOutside from 'use-onclickoutside';

import {selectIsFollowing} from '../../redux/studio';
import {selectCanFollowStudio} from '../../redux/studio-permissions';
import {
    mutateFollowingStudio, selectIsMutatingFollowing, selectFollowingMutationError, Errors
} from '../../redux/studio-mutations';
import classNames from 'classnames';
import ValidationMessage from '../../components/forms/validation-message.jsx';

const errorToMessageId = (error, userUsesParentEmail) => {
    switch (error) {
    case Errors.PERMISSION: return userUsesParentEmail ?
        'studio.followErrors.confirmAccount' :
        'studio.followErrors.confirmEmail';

    default: return 'studio.followErrors.generic';
    }
};

const StudioFollow = ({
    canFollow,
    isFollowing,
    isMutating,
    followingError,
    handleFollow,
    withParentEmail
}) => {
    const fieldClassName = classNames('button', 'studio-follow-button', {
        'mod-mutating': isMutating
    });
    const [hideValidationMessage, setHideValidationMessage] = useState(false);

    const ref = useRef(null);

    useOnClickOutside(ref, () => {
        setHideValidationMessage(true);
    });

    if (!canFollow) return null;

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
                    handleFollow(!isFollowing);
                }}
            >
                {isMutating ? '...' : (
                    isFollowing ?
                        <FormattedMessage id="studio.unfollowStudio" /> :
                        <FormattedMessage id="studio.followStudio" />
                )}
            </button>
            {followingError && !hideValidationMessage && <ValidationMessage
                mode="error"
                message={<FormattedMessage id={errorToMessageId(followingError, withParentEmail)} />}
            />}
        </div>
    );
};

StudioFollow.propTypes = {
    canFollow: PropTypes.bool,
    isFollowing: PropTypes.bool,
    isMutating: PropTypes.bool,
    followingError: PropTypes.string,
    handleFollow: PropTypes.func,
    withParentEmail: PropTypes.bool
};

export default connect(
    state => ({
        canFollow: selectCanFollowStudio(state),
        isMutating: selectIsMutatingFollowing(state),
        isFollowing: selectIsFollowing(state),
        followingError: selectFollowingMutationError(state),
        withParentEmail: state.session.session.flags && state.session.session.flags.with_parent_email
    }),
    {
        handleFollow: mutateFollowingStudio
    }
)(StudioFollow);
