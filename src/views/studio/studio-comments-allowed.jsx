/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioCommentsAllowed, selectIsLoadingInfo} from '../../redux/studio';
import {
    mutateStudioCommentsAllowed, selectIsMutatingCommentsAllowed, selectCommentsAllowedMutationError
} from '../../redux/studio-mutations';

const StudioCommentsAllowed = ({
    commentsAllowedError, isLoading, isMutating, commentsAllowed, handleUpdate
}) => (
    <div>
        {isLoading ? (
            <h4>Loading...</h4>
        ) : (
            <div>
                <label>
                    <input
                        disabled={isMutating}
                        type="checkbox"
                        checked={commentsAllowed}
                        onChange={e => handleUpdate(e.target.checked)}
                    />
                    <span>{commentsAllowed ? 'Comments allowed' : 'Comments not allowed'}</span>
                    {commentsAllowedError && <div>Error mutating commentsAllowed: {commentsAllowedError}</div>}
                </label>
            </div>
        )}
    </div>
);

StudioCommentsAllowed.propTypes = {
    commentsAllowedError: PropTypes.string,
    isLoading: PropTypes.bool,
    isMutating: PropTypes.bool,
    commentsAllowed: PropTypes.bool,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        commentsAllowed: selectStudioCommentsAllowed(state),
        isLoading: selectIsLoadingInfo(state),
        isMutating: selectIsMutatingCommentsAllowed(state),
        commentsAllowedError: selectCommentsAllowedMutationError(state)
    }),
    {
        handleUpdate: mutateStudioCommentsAllowed
    }
)(StudioCommentsAllowed);
