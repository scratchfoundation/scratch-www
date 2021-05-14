/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';

import {selectStudioCommentsAllowed, selectIsFetchingInfo} from '../../redux/studio';
import {
    mutateStudioCommentsAllowed, selectIsMutatingCommentsAllowed, selectCommentsAllowedMutationError
} from '../../redux/studio-mutations';

import ToggleSlider from '../../components/forms/toggle-slider.jsx';

const StudioCommentsAllowed = ({
    commentsAllowedError, isFetching, isMutating, commentsAllowed, handleUpdate
}) => (
    <div>
        {isFetching ? (
            <h4>Fetching...</h4>
        ) : (
            <div>
                {commentsAllowed ? (
                    <FormattedMessage id="studio.comments.toggleOn" />
                ) : (
                    <FormattedMessage id="studio.comments.toggleOff" />
                )}
                <ToggleSlider
                    disabled={isMutating}
                    checked={commentsAllowed}
                    className={classNames('comments-allowed-input', {
                        'mod-mutating': isMutating
                    })}
                    onChange={e => handleUpdate(e.target.checked)}
                />
                {commentsAllowedError && <div>Error mutating commentsAllowed: {commentsAllowedError}</div>}
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
