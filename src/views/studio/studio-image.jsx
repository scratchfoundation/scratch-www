/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioImage, selectIsLoadingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {
    mutateStudioImage, selectIsMutatingImage, selectImageMutationError
} from '../../redux/studio-mutations';
import Spinner from '../../components/spinner/spinner.jsx';

const StudioImage = ({
    imageError, isLoading, isMutating, image, canEditInfo, handleUpdate
}) => (
    <div>
        <h3>Image</h3>
        {isLoading ? (
            <h4>Loading...</h4>
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
    isLoading: PropTypes.bool,
    isMutating: PropTypes.bool,
    image: PropTypes.string,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        image: selectStudioImage(state),
        canEditInfo: selectCanEditInfo(state),
        isLoading: selectIsLoadingInfo(state),
        isMutating: selectIsMutatingImage(state),
        imageError: selectImageMutationError(state)
    }),
    {
        handleUpdate: mutateStudioImage
    }
)(StudioImage);
