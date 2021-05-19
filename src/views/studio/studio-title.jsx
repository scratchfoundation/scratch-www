/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import {selectStudioTitle, selectIsFetchingInfo} from '../../redux/studio';
import {selectCanEditInfo} from '../../redux/studio-permissions';
import {Errors, mutateStudioTitle, selectIsMutatingTitle, selectTitleMutationError} from '../../redux/studio-mutations';
import ValidationMessage from '../../components/forms/validation-message.jsx';

const errorToMessageId = error => {
    switch (error) {
    case Errors.INAPPROPRIATE: return 'studio.updateErrors.inappropriate';
    case Errors.TEXT_TOO_LONG: return 'studio.updateErrors.textTooLong';
    case Errors.REQUIRED_FIELD: return 'studio.updateErrors.requiredField';
    default: return 'studio.updateErrors.generic';
    }
};

const StudioTitle = ({
    titleError, isFetching, isMutating, title, canEditInfo, handleUpdate
}) => {
    const fieldClassName = classNames('studio-title', {
        'mod-fetching': isFetching,
        'mod-mutating': isMutating,
        'mod-form-error': !!titleError
    });
    return (
        <div className="studio-info-section">
            {canEditInfo ? (
                <React.Fragment>
                    <textarea
                        className={fieldClassName}
                        disabled={isMutating || !canEditInfo || isFetching}
                        defaultValue={title}
                        onKeyDown={e => e.key === 'Enter' && e.target.blur()}
                        onBlur={e => e.target.value !== title &&
                            handleUpdate(e.target.value)}
                    />
                    {titleError && <ValidationMessage
                        mode="error"
                        message={<FormattedMessage id={errorToMessageId(titleError)} />}
                    />}
                </React.Fragment>
            ) : (
                <div className={fieldClassName}>{title}</div>
            )}
        </div>
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
