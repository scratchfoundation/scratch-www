/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioTitle, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {mutateStudioTitle, selectIsMutatingTitle, selectTitleMutationError} from '../../redux/studio-mutations';

const StudioTitle = ({
    titleError, isFetching, isMutating, title, canEditInfo, handleUpdate
}) => (
    <div>
        <h3>Title</h3>
        {isFetching ? (
            <h4>Fetching...</h4>
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
    isFetching: PropTypes.bool,
    isMutating: PropTypes.bool,
    title: PropTypes.string,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        title: selectStudioTitle(state),
        canEditInfo: selectCanEditInfo(state),
        isFetching: selectIsFetchingInfo(state),
        isMutating: selectIsMutatingTitle(state),
        titleError: selectTitleMutationError(state)
    }),
    {
        handleUpdate: mutateStudioTitle
    }
)(StudioTitle);
