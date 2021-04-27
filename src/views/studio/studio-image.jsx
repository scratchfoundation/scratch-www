/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioImage, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {
    mutateStudioImage, selectIsMutatingImage, selectImageMutationError
} from '../../redux/studio-mutations';
import Spinner from '../../components/spinner/spinner.jsx';

const StudioImage = ({
    imageError, isFetching, isMutating, image, canEditInfo, handleUpdate
}) => (
    <div>
        <h3>Image</h3>
        {isFetching ? (
            <h4>Fetching...</h4>
        ) : (
            <div>
                <div style={{width: '200px', height: '150px', border: '1px solid green'}}>
                    {isMutating ?
                        <Spinner color="blue" /> :
                        <img
                            style={{objectFit: 'contain'}}
                            src={image}
                        />}
                </div>
                {canEditInfo &&
                    <label>
                        <input
                            disabled={isMutating}
                            type="file"
                            accept="image/*"
                            onChange={e => {
                                handleUpdate(e.target);
                                e.target.value = '';
                            }}
                        />
                        {imageError && <div>Error mutating image: {imageError}</div>}
                    </label>
                }
            </div>
        )}
    </div>
);

StudioImage.propTypes = {
    imageError: PropTypes.string,
    canEditInfo: PropTypes.bool,
    isFetching: PropTypes.bool,
    isMutating: PropTypes.bool,
    image: PropTypes.string,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        image: selectStudioImage(state),
        canEditInfo: selectCanEditInfo(state),
        isFetching: selectIsFetchingInfo(state),
        isMutating: selectIsMutatingImage(state),
        imageError: selectImageMutationError(state)
    }),
    {
        handleUpdate: mutateStudioImage
    }
)(StudioImage);
