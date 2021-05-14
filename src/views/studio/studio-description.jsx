/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import {selectStudioDescription, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {
    Errors, mutateStudioDescription, selectIsMutatingDescription, selectDescriptionMutationError
} from '../../redux/studio-mutations';

import ValidationMessage from '../../components/forms/validation-message.jsx';

const errorToMessageId = error => {
    switch (error) {
    case Errors.INAPPROPRIATE: return 'studio.updateErrors.inappropriate';
    case Errors.TEXT_TOO_LONG: return 'studio.updateErrors.textTooLong';
    case Errors.REQUIRED_FIELD: return 'studio.updateErrors.requiredField';
    default: return 'studio.updateErrors.generic';
    }
};

const StudioDescription = ({
    descriptionError, isFetching, isMutating, description, canEditInfo, handleUpdate
}) => {
    const fieldClassName = classNames('studio-description', {
        'mod-fetching': isFetching,
        'mod-mutating': isMutating,
        'mod-form-error': !!descriptionError
    });
    return (
        <div className="studio-info-section">
            <textarea
                rows="20"
                className={fieldClassName}
                disabled={isMutating || !canEditInfo || isFetching}
                defaultValue={description}
                onBlur={e => e.target.value !== description &&
                    handleUpdate(e.target.value)}
            />
            {descriptionError && <ValidationMessage
                mode="error"
                message={<FormattedMessage id={errorToMessageId(descriptionError)} />}
            />}
        </div>
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
