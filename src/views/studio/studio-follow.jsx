/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectIsFollowing, selectIsLoadingRoles} from '../../redux/studio';
import {selectCanFollowStudio} from '../../redux/studio-permissions';
import {
    mutateFollowingStudio, selectIsMutatingFollowing, selectFollowingMutationError
} from '../../redux/studio-mutations';


const StudioFollow = ({
    canFollow,
    isLoading,
    isFollowing,
    isMutating,
    followingError,
    handleFollow
}) => (
    <div>
        <h3>Following</h3>
        <div>
            <button
                disabled={isLoading || isMutating || !canFollow}
                onClick={() => handleFollow(!isFollowing)}
            >
                {isLoading ? (
                    'Loading...'
                ) : (
                    isFollowing ? 'Unfollow' : 'Follow'
                )}
            </button>
            {followingError && <div>Error mutating following: {followingError}</div>}
            {!canFollow && <div>Must be logged in to follow</div>}
        </div>
    </div>
);

StudioFollow.propTypes = {
    canFollow: PropTypes.bool,
    isLoading: PropTypes.bool,
    isFollowing: PropTypes.bool,
    isMutating: PropTypes.bool,
    followingError: PropTypes.string,
    handleFollow: PropTypes.func
};

export default connect(
    state => ({
        canFollow: selectCanFollowStudio(state),
        isLoading: selectIsLoadingRoles(state),
        isMutating: selectIsMutatingFollowing(state),
        isFollowing: selectIsFollowing(state),
        followingError: selectFollowingMutationError(state)
    }),
    {
        handleFollow: mutateFollowingStudio
    }
)(StudioFollow);
