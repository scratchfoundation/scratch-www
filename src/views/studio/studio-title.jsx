/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioTitle, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {mutateStudioTitle, selectIsMutatingTitle, selectTitleMutationError} from '../../redux/studio-mutations';
import classNames from 'classnames';

const StudioTitle = ({
    titleError, isFetching, isMutating, title, canEditInfo, handleUpdate
}) => {
    const fieldClassName = classNames('studio-title', {
        'mod-fetching': isFetching,
        'mod-mutating': isMutating
    });
    return (
        <React.Fragment>
            <textarea
                className={fieldClassName}
                disabled={isMutating || !canEditInfo || isFetching}
                defaultValue={title}
                onBlur={e => e.target.value !== title &&
                    handleUpdate(e.target.value)}
            />
            {titleError && <div>Error mutating title: {titleError}</div>}
        </React.Fragment>
    );
};

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
