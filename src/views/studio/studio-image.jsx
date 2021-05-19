/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import {selectStudioImage, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {
    Errors, mutateStudioImage, selectIsMutatingImage, selectImageMutationError
} from '../../redux/studio-mutations';

import ValidationMessage from '../../components/forms/validation-message.jsx';

const errorToMessageId = error => {
    switch (error) {
    case Errors.THUMBNAIL_INVALID: return 'studio.updateErrors.thumbnailInvalid';
    case Errors.THUMBNAIL_TOO_LARGE: return 'studio.updateErrors.thumbnailTooLarge';
    default: return 'studio.updateErrors.generic';
    }
};

const blankImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const StudioImage = ({
    imageError, isFetching, isMutating, image, canEditInfo, handleUpdate
}) => {
    const [uploadPreview, setUploadPreview] = React.useState(null);
    const fieldClassName = classNames('studio-info-section', {
        'mod-fetching': isFetching,
        'mod-mutating': isMutating
    });
    let src = image || blankImage;
    if (uploadPreview && !imageError) src = uploadPreview;
    return (
        <div className={fieldClassName}>
            <img
                className="studio-image"
                src={src}
            />
            {canEditInfo && !isFetching &&
                <React.Fragment>
                    <input
                        disabled={isMutating}
                        type="file"
                        accept="image/*"
                        onChange={e => {
                            handleUpdate(e.target)
                                .then(dataUrl => setUploadPreview(dataUrl));
                            e.target.value = '';
                        }}
                    />
                    {imageError && <ValidationMessage
                        mode="error"
                        message={<FormattedMessage id={errorToMessageId(imageError)} />}
                    />}
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
