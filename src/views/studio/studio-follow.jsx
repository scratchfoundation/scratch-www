/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectIsFollowing} from '../../redux/studio';
import {selectCanFollowStudio} from '../../redux/studio-permissions';
import {
    mutateFollowingStudio, selectIsMutatingFollowing, selectFollowingMutationError
} from '../../redux/studio-mutations';
import classNames from 'classnames';

const StudioFollow = ({
    canFollow,
    isFollowing,
    isMutating,
    followingError,
    handleFollow
}) => {
    if (!canFollow) return null;
    const fieldClassName = classNames('button', {
        'mod-mutating': isMutating
    });
    return (
        <React.Fragment>
            <button
                className={fieldClassName}
                disabled={isMutating}
                onClick={() => handleFollow(!isFollowing)}
            >
                {isMutating ? '...' : (
                    isFollowing ? 'Unfollow Studio' : 'Follow Studio'
                )}
            </button>
            {followingError && <div>Error mutating following: {followingError}</div>}
        </React.Fragment >
    );
};

StudioFollow.propTypes = {
    canFollow: PropTypes.bool,
    isFollowing: PropTypes.bool,
    isMutating: PropTypes.bool,
    followingError: PropTypes.string,
    handleFollow: PropTypes.func
};

export default connect(
    state => ({
        canFollow: selectCanFollowStudio(state),
        isMutating: selectIsMutatingFollowing(state),
        isFollowing: selectIsFollowing(state),
        followingError: selectFollowingMutationError(state)
    }),
    {
        handleFollow: mutateFollowingStudio
    }
)(StudioFollow);
