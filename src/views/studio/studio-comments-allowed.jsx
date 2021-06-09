/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';

import {selectStudioCommentsAllowed, selectIsFetchingInfo} from '../../redux/studio';
import {
    mutateStudioCommentsAllowed, selectIsMutatingCommentsAllowed
} from '../../redux/studio-mutations';

import ToggleSlider from '../../components/forms/toggle-slider.jsx';

const StudioCommentsAllowed = ({
    isFetching, isMutating, commentsAllowed, handleUpdate
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
            </div>
        )}
    </div>
);

StudioCommentsAllowed.propTypes = {
    isFetching: PropTypes.bool,
    isMutating: PropTypes.bool,
    commentsAllowed: PropTypes.bool,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        commentsAllowed: selectStudioCommentsAllowed(state),
        isFetching: selectIsFetchingInfo(state),
        isMutating: selectIsMutatingCommentsAllowed(state)
    }),
    {
        handleUpdate: mutateStudioCommentsAllowed
    }
)(StudioCommentsAllowed);
