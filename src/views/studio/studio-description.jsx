/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioDescription, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {
    mutateStudioDescription, selectIsMutatingDescription, selectDescriptionMutationError
} from '../../redux/studio-mutations';

const StudioDescription = ({
    descriptionError, isFetching, isMutating, description, canEditInfo, handleUpdate
}) => (
    <div>
        <h3>Description</h3>
        {isFetching ? (
            <h4>Fetching...</h4>
        ) : (canEditInfo ? (
            <label>
                <textarea
                    rows="5"
                    cols="100"
                    disabled={isMutating}
                    defaultValue={description}
                    onBlur={e => e.target.value !== description &&
                        handleUpdate(e.target.value)}
                />
                {descriptionError && <div>Error mutating description: {descriptionError}</div>}
            </label>
        ) : (
            <div>{description}</div>
        ))}
    </div>
);

StudioDescription.propTypes = {
    descriptionError: PropTypes.string,
    canEditInfo: PropTypes.bool,
    isFetching: PropTypes.bool,
    isMutating: PropTypes.bool,
    description: PropTypes.string,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        description: selectStudioDescription(state),
        canEditInfo: selectCanEditInfo(state),
        isFetching: selectIsFetchingInfo(state),
        isMutating: selectIsMutatingDescription(state),
        descriptionError: selectDescriptionMutationError(state)
    }),
    {
        handleUpdate: mutateStudioDescription
    }
)(StudioDescription);
