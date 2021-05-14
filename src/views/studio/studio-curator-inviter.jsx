/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage, intlShape, injectIntl} from 'react-intl';

import {inviteCurator} from './lib/studio-member-actions';
import FlexRow from '../../components/flex-row/flex-row.jsx';

const StudioCuratorInviter = ({intl, onSubmit}) => {
    const [value, setValue] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const submit = () => {
        setSubmitting(true);
        setError(null);
        onSubmit(value)
            .then(() => setValue(''))
            .catch(e => setError(e))
            .then(() => setSubmitting(false));
    };
    return (
        <div className="studio-adder-section">
            <h3><FormattedMessage id="studio.inviteCuratorsHeader" /></h3>
            <FlexRow>
                <input
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
                {error && <div>{error}</div>}
            </FlexRow>
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
