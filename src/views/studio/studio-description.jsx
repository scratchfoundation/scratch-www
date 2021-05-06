/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioDescription, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {
    mutateStudioDescription, selectIsMutatingDescription, selectDescriptionMutationError
} from '../../redux/studio-mutations';
import classNames from 'classnames';

const StudioDescription = ({
    descriptionError, isFetching, isMutating, description, canEditInfo, handleUpdate
}) => {
    const fieldClassName = classNames('studio-description', {
        'mod-fetching': isFetching,
        'mod-mutating': isMutating
    });
    return (
        <React.Fragment>
            <textarea
                rows="20"
                className={fieldClassName}
                disabled={isMutating || !canEditInfo || isFetching}
                defaultValue={description}
                onBlur={e => e.target.value !== description &&
                    handleUpdate(e.target.value)}
            />
            {descriptionError && <div>Error mutating description: {descriptionError}</div>}
        </React.Fragment>
    );
};

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
