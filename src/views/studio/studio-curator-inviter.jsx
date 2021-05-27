/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage, intlShape, injectIntl} from 'react-intl';

import {useAlertContext} from '../../components/alert/alert-context';
import {Errors, inviteCurator} from './lib/studio-member-actions';
import ValidationMessage from '../../components/forms/validation-message.jsx';

const errorToMessageId = error => {
    switch (error) {
    case Errors.NETWORK: return 'studio.curatorErrors.generic';
    case Errors.SERVER: return 'studio.curatorErrors.generic';
    case Errors.PERMISSION: return 'studio.curatorErrors.generic';
    case Errors.DUPLICATE: return 'studio.curatorErrors.alreadyCurator';
    case Errors.UNKNOWN_USERNAME: return 'studio.curatorErrors.unknownUsername';
    case Errors.RATE_LIMIT: return 'studio.curatorErrors.tooFast';
    default: return 'studio.curatorErrors.generic';
    }
};

const StudioCuratorInviter = ({intl, onSubmit}) => {
    const [value, setValue] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const {successAlert} = useAlertContext();

    const submit = () => {
        setSubmitting(true);
        setError(null);
        onSubmit(value)
            .then(() => {
                successAlert({
                    id: 'studio.alertCuratorInvited',
                    values: {name: value}
                });
                setValue('');
            })
            .catch(e => {
                if (e === Errors.DUPLICATE) {
                    successAlert({
                        id: 'studio.alertCuratorAlreadyInvited',
                        values: {name: value}
                    });
                    setValue('');
                } else {
                    setError(e);
                }
            })
            .then(() => setSubmitting(false));
    };
    return (
        <div className="studio-adder-section">
            <h3><FormattedMessage id="studio.inviteCuratorsHeader" /></h3>
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
                    placeholder={intl.formatMessage({id: 'studio.inviteCuratorPlaceholder'})}
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
                ><FormattedMessage id="studio.inviteCurator" /></button>
            </div>
        </div>
    );
};

StudioCuratorInviter.propTypes = {
    onSubmit: PropTypes.func,
    intl: intlShape
};

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
    onSubmit: inviteCurator
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(StudioCuratorInviter));
