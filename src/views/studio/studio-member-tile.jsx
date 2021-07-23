/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import PromoteModal from './modals/promote-modal.jsx';
import ManagerLimitModal from './modals/manager-limit-modal.jsx';
import TransferOwnershipModal from './modals/transfer-ownership-modal.jsx';

import {
    selectCanRemoveCurator, selectCanRemoveManager, selectCanPromoteCurators,
    selectCanTransferOwnership
} from '../../redux/studio-permissions';
import {selectStudioTransferLaunched} from '../../redux/session.js';
import {
    Errors,
    promoteCurator,
    removeCurator,
    removeManager,
    transferOwnership
} from './lib/studio-member-actions';

import {selectStudioHasReachedManagerLimit} from '../../redux/studio';
import {useAlertContext} from '../../components/alert/alert-context';

import OverflowMenu from '../../components/overflow-menu/overflow-menu.jsx';
import removeIcon from './icons/remove-icon.svg';
import promoteIcon from './icons/curator-icon.svg';

const StudioMemberTile = ({
    canRemove, canPromote, onRemove, canTransferOwnership, onPromote, onTransferOwnership, isCreator, hasReachedManagerLimit, // mapState props
    username, image // own props
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [promoteModalOpen, setPromoteModalOpen] = useState(false);
    const [transferOwnershipModalOpen, setTransferOwnershipModalOpen] = useState(false);
    const [managerLimitReached, setManagerLimitReached] = useState(false);
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
            {(canRemove || canPromote || canTransferOwnership) &&
                <OverflowMenu>
                    {canPromote && <li>
                        <button
                            onClick={() => {
                                setPromoteModalOpen(true);
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
                    {canTransferOwnership && <li>
                        <button
                            className="studio-member-tile-menu-wide"
                            onClick={() => {
                                setTransferOwnershipModalOpen(true);
                            }}
                        >
                            <img src={promoteIcon} />
                            <FormattedMessage id="studio.transfer" />
                        </button>
                    </li>}
                </OverflowMenu>
            }
            {promoteModalOpen &&
                ((hasReachedManagerLimit || managerLimitReached) ?
                    <ManagerLimitModal
                        handleClose={() => setPromoteModalOpen(false)}
                    /> :
                    <PromoteModal
                        handleClose={() => setPromoteModalOpen(false)}
                        handlePromote={() => {
                            onPromote(username)
                                .then(() => {
                                    successAlert({
                                        id: 'studio.alertManagerPromote',
                                        values: {name: username}
                                    });
                                })
                                .catch(error => {
                                    if (error === Errors.MANAGER_LIMIT) {
                                        setManagerLimitReached(true);
                                        setPromoteModalOpen(true);
                                    } else {
                                        errorAlert({
                                            id: 'studio.alertManagerPromoteError',
                                            values: {name: username}
                                        });
                                    }
                                });
                        }}
                        username={username}
                    />
                )
            }
            {transferOwnershipModalOpen &&
                <TransferOwnershipModal
                    handleClose={() => setTransferOwnershipModalOpen(false)}
                    handleTransfer={(password, newOwnerUsername, newOwnerUsernameId) => {
                        onTransferOwnership(/* password, */newOwnerUsername, newOwnerUsernameId)
                            .then(() => {
                                setTransferOwnershipModalOpen(false);
                                successAlert({
                                    id: 'studio.alertTransfer',
                                    values: {name: newOwnerUsername}
                                });
                            });
                    }}
                />
            }
        </div>
    );
};

StudioMemberTile.propTypes = {
    canRemove: PropTypes.bool,
    canPromote: PropTypes.bool,
    canTransferOwnership: PropTypes.bool,
    onRemove: PropTypes.func,
    onPromote: PropTypes.func,
    onTransferOwnership: PropTypes.func,
    username: PropTypes.string,
    image: PropTypes.string,
    isCreator: PropTypes.bool,
    hasReachedManagerLimit: PropTypes.bool
};

const ManagerTile = connect(
    (state, ownProps) => ({
        canRemove: selectCanRemoveManager(state, ownProps.id),
        canPromote: false,
        canTransferOwnership: selectCanTransferOwnership(state, ownProps.id) &&
            selectStudioTransferLaunched(state),
        isCreator: state.studio.owner === ownProps.id
    }),
    {
        onRemove: removeManager,
        onTransferOwnership: transferOwnership
    }
)(StudioMemberTile);

const CuratorTile = connect(
    (state, ownProps) => ({
        canRemove: selectCanRemoveCurator(state, ownProps.username),
        canPromote: selectCanPromoteCurators(state),
        hasReachedManagerLimit: selectStudioHasReachedManagerLimit(state)
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
