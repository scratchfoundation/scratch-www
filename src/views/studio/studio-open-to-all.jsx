/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioOpenToAll, selectIsLoadingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {
    mutateStudioOpenToAll, selectIsMutatingOpenToAll, selectOpenToAllMutationError
} from '../../redux/studio-mutations';

const StudioOpenToAll = ({
    openToAllError, isLoading, isMutating, openToAll, canEditInfo, handleUpdate
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
                        checked={openToAll}
                        onChange={e => handleUpdate(e.target.checked)}
                    />
                    <h4>{openToAll ? 'Open to all' : 'Not open to all'}</h4>
                    {openToAllError && <div>Error mutating openToAll: {openToAllError}</div>}
                </label>
            </div>
        )}
    </div>
);

StudioOpenToAll.propTypes = {
    openToAllError: PropTypes.string,
    canEditInfo: PropTypes.bool,
    isLoading: PropTypes.bool,
    isMutating: PropTypes.bool,
    openToAll: PropTypes.string,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        openToAll: selectStudioOpenToAll(state),
        canEditInfo: selectCanEditInfo(state),
        isLoading: selectIsLoadingInfo(state),
        isMutating: selectIsMutatingOpenToAll(state),
        openToAllError: selectOpenToAllMutationError(state)
    }),
    {
        handleUpdate: mutateStudioOpenToAll
    }
)(StudioOpenToAll);
