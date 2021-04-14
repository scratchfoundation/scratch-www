/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioTitle, selectIsLoadingInfo, selectCanEditInfo} from '../../redux/studio';
import {mutateStudioTitle, selectIsMutatingTitle, selectTitleMutationError} from '../../redux/studio-mutations';

const StudioTitle = ({
    titleError, isLoading, isMutating, title, canEditInfo, handleUpdate
}) => (
    <div>
        <h3>Title</h3>
        {isLoading ? (
            <h4>Loading...</h4>
        ) : (canEditInfo ? (
            <label>
                <input
                    disabled={isMutating}
                    defaultValue={title}
                    onBlur={e => e.target.value !== title &&
                        handleUpdate(e.target.value)}
                />
                {titleError && <div>Error mutating title: {titleError}</div>}
            </label>
        ) : (
            <div>{title}</div>
        ))}
    </div>
);

StudioTitle.propTypes = {
    titleError: PropTypes.string,
    canEditInfo: PropTypes.bool,
    isLoading: PropTypes.bool,
    isMutating: PropTypes.bool,
    title: PropTypes.string,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        title: selectStudioTitle(state),
        canEditInfo: selectCanEditInfo(state),
        isLoading: selectIsLoadingInfo(state),
        isMutating: selectIsMutatingTitle(state),
        titleError: selectTitleMutationError(state)
    }),
    {
        handleUpdate: mutateStudioTitle
    }
)(StudioTitle);
