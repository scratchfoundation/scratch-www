/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {acceptInvitation} from './lib/studio-member-actions';

const StudioCuratorInvite = ({onSubmit}) => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div>
            <button
                className={classNames('button', {
                    'mod-mutating': submitting
                })}
                disabled={submitting}
                onClick={() => {
                    setSubmitting(true);
                    setError(null);
                    onSubmit()
                        .catch(e => {
                            setError(e);
                            setSubmitting(false);
                        });
                }}
            >Accept invite</button>
            {error && <div>{error}</div>}
        </div>
    );
};

StudioCuratorInvite.propTypes = {
    onSubmit: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
    onSubmit: acceptInvitation
});

export default connect(mapStateToProps, mapDispatchToProps)(StudioCuratorInvite);
