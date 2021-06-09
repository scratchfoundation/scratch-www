/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage, intlShape, injectIntl} from 'react-intl';

import {Errors, addProject} from './lib/studio-project-actions';
import UserProjectsModal from './modals/user-projects-modal.jsx';
import ValidationMessage from '../../components/forms/validation-message.jsx';
import {useAlertContext} from '../../components/alert/alert-context';

const errorToMessageId = error => {
    switch (error) {
    case Errors.NETWORK: return 'studio.projectErrors.generic';
    case Errors.SERVER: return 'studio.projectErrors.generic';
    case Errors.PERMISSION: return 'studio.projectErrors.permission';
    case Errors.DUPLICATE: return 'studio.projectErrors.duplicate';
    case Errors.RATE_LIMIT: return 'studio.projectErrors.tooFast';
    case Errors.UNKNOWN_PROJECT: return 'studio.projectErrors.checkUrl';
    case Errors.USER_MUTED: return 'studio.mutedError';
    default: return 'studio.projectErrors.generic';
    }
};

const StudioProjectAdder = ({intl, onSubmit}) => {
    const [value, setValue] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const {successAlert} = useAlertContext();
    const submit = () => {
        setSubmitting(true);
        setError(null);
        onSubmit(value)
            .then(() => {
                successAlert({
                    id: 'studio.alertProjectAdded',
                    values: {title: value}
                });
                setValue('');
            })
            .catch(e => {
                // Duplicate project will show success alert
                if (e === Errors.DUPLICATE) {
                    successAlert({id: 'studio.alertProjectAlreadyAdded'});
                    setValue('');
                } else {
                    // Other errors are displayed by this component
                    setError(e);
                }
            })
            .then(() => setSubmitting(false));
    };
    return (
        <div className="studio-adder-section">
            <h3><FormattedMessage id="studio.addProjectsHeader" /></h3>
            <div className="studio-adder-row">
                {error && <div className="studio-adder-error">
                    <ValidationMessage
                        mode="error"
                        className="validation-left"
                        message={<FormattedMessage id={errorToMessageId(error)} />}
                    />
                </div>}
                <input
                    className={classNames({'mod-form-error': error})}
                    disabled={submitting}
                    type="text"
                    placeholder={intl.formatMessage({id: 'studio.addProjectPlaceholder'})}
                    value={value}
                    onKeyDown={e => e.key === 'Enter' && submit()}
                    onChange={e => setValue(e.target.value)}
                />
                <button
                    className={classNames('button', {
                        'mod-mutating': submitting
                    })}
                    disabled={submitting || value === ''}
                    onClick={submit}
                ><FormattedMessage id="studio.addProject" /></button>
                <div className="studio-adder-vertical-divider" />
                <button
                    className="button"
                    onClick={() => setModalOpen(true)}
                >
                    <FormattedMessage id="studio.browseProjects" />
                </button>
                {modalOpen && <UserProjectsModal onRequestClose={() => setModalOpen(false)} />}
            </div>
        </div>
    );
};

StudioProjectAdder.propTypes = {
    onSubmit: PropTypes.func,
    intl: intlShape
};

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
    onSubmit: addProject
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(StudioProjectAdder));
