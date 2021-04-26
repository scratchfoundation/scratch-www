/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioCommentsAllowed, selectIsLoadingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {
    mutateStudioCommentsAllowed, selectIsMutatingCommentsAllowed, selectCommentsAllowedMutationError
} from '../../redux/studio-mutations';

const StudioCommentsAllowed = ({
    commentsAllowedError, isLoading, isMutating, commentsAllowed, canEditInfo, handleUpdate
}) => (
    <div>
        {isLoading ? (
            <h4>Loading...</h4>
        ) : (
            <div>
                <label>
                    <input
                        disabled={isMutating || !canEditInfo}
                        type="checkbox"
                        checked={commentsAllowed}
                        onChange={e => handleUpdate(e.target.checked)}
                    />
                    <h4>{commentsAllowed ? 'Comments allowed' : 'Comments not allowed'}</h4>
                    {commentsAllowedError && <div>Error mutating commentsAllowed: {commentsAllowedError}</div>}
                </label>
            </div>
        )}
    </div>
);

StudioCommentsAllowed.propTypes = {
    commentsAllowedError: PropTypes.string,
    canEditInfo: PropTypes.bool,
    isLoading: PropTypes.bool,
    isMutating: PropTypes.bool,
    commentsAllowed: PropTypes.bool,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        commentsAllowed: selectStudioCommentsAllowed(state),
        canEditInfo: selectCanEditInfo(state),
        isLoading: selectIsLoadingInfo(state),
        isMutating: selectIsMutatingCommentsAllowed(state),
        commentsAllowedError: selectCommentsAllowedMutationError(state)
    }),
    {
        handleUpdate: mutateStudioCommentsAllowed
    }
)(StudioCommentsAllowed);
