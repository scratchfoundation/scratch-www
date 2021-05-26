/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import {
    selectCanRemoveCurator, selectCanRemoveManager, selectCanPromoteCurators
} from '../../redux/studio-permissions';
import {
    promoteCurator,
    removeCurator,
    removeManager
} from './lib/studio-member-actions';
import {useAlertContext} from '../../components/alert/alert-context';

import OverflowMenu from '../../components/overflow-menu/overflow-menu.jsx';
import removeIcon from './icons/remove-icon.svg';
import promoteIcon from './icons/curator-icon.svg';

const StudioMemberTile = ({
    canRemove, canPromote, onRemove, onPromote, isCreator, // mapState props
    username, image // own props
}) => {
    const [submitting, setSubmitting] = useState(false);
    const {errorAlert, successAlert} = useAlertContext();
    const userUrl = `/users/${username}`;
    return (
        <div className="studio-member-tile">
            <a href={userUrl}>
                <img
                    className="studio-member-image"
                    src={image}
                />
            </a>
            <div className="studio-member-info">
                <a
                    href={userUrl}
                    className="studio-member-name"
                >{username}</a>
                {isCreator && <div className="studio-member-role"><FormattedMessage id="studio.creatorRole" /></div>}
            </div>
            {(canRemove || canPromote) &&
                <OverflowMenu>
                    {canPromote && <li>
                        <button
                            className={classNames({
                                'mod-mutating': submitting
                            })}
                            disabled={submitting}
                            onClick={() => {
                                setSubmitting(true);
                                onPromote(username)
                                    .then(() => {
                                        successAlert({
                                            id: 'studio.alertManagerPromote',
                                            values: {name: username}
                                        });
                                    })
                                    .catch(() => {
                                        errorAlert({
                                            id: 'studio.alertManagerPromoteError',
                                            values: {name: username}
                                        });
                                        setSubmitting(false);
                                    });
                            }}
                        >
                            <img src={promoteIcon} />
                            <FormattedMessage id="studio.promote" />
                        </button>
                    </li>}
                    {canRemove && <li>
                        <button
                            className={classNames({
                                'mod-mutating': submitting
                            })}
                            disabled={submitting}
                            onClick={() => {
                                setSubmitting(true);
                                onRemove(username).catch(() => {
                                    errorAlert({
                                        id: 'studio.alertMemberRemoveError',
                                        values: {name: username}
                                    }, null);
                                    setSubmitting(false);
                                });
                            }}
                        >
                            <img src={removeIcon} />
                            <FormattedMessage id="studio.remove" />
                        </button>
                    </li>}
                </OverflowMenu>
            }
        </div>
    );
};

StudioMemberTile.propTypes = {
    canRemove: PropTypes.bool,
    canPromote: PropTypes.bool,
    onRemove: PropTypes.func,
    onPromote: PropTypes.func,
    username: PropTypes.string,
    image: PropTypes.string,
    isCreator: PropTypes.bool
};

const ManagerTile = connect(
    (state, ownProps) => ({
        canRemove: selectCanRemoveManager(state, ownProps.id),
        canPromote: false,
        isCreator: state.studio.owner === ownProps.id
    }),
    {
        onRemove: removeManager
    }
)(StudioMemberTile);

const CuratorTile = connect(
    (state, ownProps) => ({
        canRemove: selectCanRemoveCurator(state, ownProps.username),
        canPromote: selectCanPromoteCurators(state)
    }),
    {
        onRemove: removeCurator,
        onPromote: promoteCurator
    }
)(StudioMemberTile);

export {
    ManagerTile,
    CuratorTile
};
