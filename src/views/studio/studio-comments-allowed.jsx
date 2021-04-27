/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioCommentsAllowed, selectIsFetchingInfo} from '../../redux/studio';
import {
    mutateStudioCommentsAllowed, selectIsMutatingCommentsAllowed, selectCommentsAllowedMutationError
} from '../../redux/studio-mutations';

const StudioCommentsAllowed = ({
    commentsAllowedError, isFetching, isMutating, commentsAllowed, handleUpdate
}) => (
    <div>
        {isFetching ? (
            <h4>Fetching...</h4>
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
    isFetching: PropTypes.bool,
    isMutating: PropTypes.bool,
    commentsAllowed: PropTypes.bool,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        commentsAllowed: selectStudioCommentsAllowed(state),
        isFetching: selectIsFetchingInfo(state),
        isMutating: selectIsMutatingCommentsAllowed(state),
        commentsAllowedError: selectCommentsAllowedMutationError(state)
    }),
    {
        handleUpdate: mutateStudioCommentsAllowed
    }
)(StudioCommentsAllowed);
