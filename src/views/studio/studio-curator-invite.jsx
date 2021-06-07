/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import {acceptInvitation} from './lib/studio-member-actions';
import {selectShowCuratorInvite} from '../../redux/studio-permissions';

const StudioCuratorInvite = ({showCuratorInvite, onSubmit}) => {
    const [submitting, setSubmitting] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [error, setError] = useState(false);

    if (!showCuratorInvite) return null;

    if (error) {
        return (
            <div className="studio-invitation studio-info-box studio-info-box-error">
                <div className="studio-invitation-msg">
                    <FormattedMessage id="studio.curatorInvitationError" />
                </div>
            </div>
        );
    }

    if (accepted) {
        return (
            <div className="studio-invitation studio-info-box studio-info-box-success">
                <div className="studio-invitation-msg">
                    <FormattedMessage id="studio.curatorInvitationAccepted" />
                </div>
            </div>
        );
    }

    return (
        <div className="studio-invitation studio-info-box">
            <div className="studio-invitation-msg">
                <FormattedMessage id="studio.curatorInvitation" />
            </div>
            <button
                className={classNames('studio-invitation-button button', {
                    'mod-mutating': submitting
                })}
                disabled={submitting}
                onClick={() => {
                    setSubmitting(true);
                    setError(null);
                    onSubmit()
                        .then(() => {
                            setSubmitting(false);
                            setAccepted(true);
                        })
                        .catch(e => {
                            setError(e);
                            setSubmitting(false);
                        });
                }}
            ><FormattedMessage id="studio.curatorAcceptInvite" /></button>
        </div>
    );
};

StudioCuratorInvite.propTypes = {
    showCuratorInvite: PropTypes.func,
    onSubmit: PropTypes.func
};

const mapStateToProps = state => ({
    showCuratorInvite: selectShowCuratorInvite(state)
});

const mapDispatchToProps = ({
    onSubmit: acceptInvitation
});

export default connect(mapStateToProps, mapDispatchToProps)(StudioCuratorInvite);
