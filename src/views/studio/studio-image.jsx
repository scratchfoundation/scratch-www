/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioImage, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {
    mutateStudioImage, selectIsMutatingImage, selectImageMutationError
} from '../../redux/studio-mutations';
import classNames from 'classnames';

const blankImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const StudioImage = ({
    imageError, isFetching, isMutating, image, canEditInfo, handleUpdate
}) => {
    const fieldClassName = classNames('studio-image', {
        'mod-fetching': isFetching,
        'mod-mutating': isMutating
    });
    const src = isMutating ? blankImage : (image || blankImage);
    return (
        <div className={fieldClassName}>
            <img
                style={{width: '300px', height: '225px', objectFit: 'cover'}}
                src={src}
            />
            {canEditInfo && !isFetching &&
                <React.Fragment>
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
                </React.Fragment>
            }
        </div>
    );
};

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
