import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';

import {managers} from './lib/redux-modules';
import {
    STUDIO_MANAGER_LIMIT,
    selectStudioManagerCount,
    selectStudioHasReachedManagerLimit,
    selectStudioHasReachedManagerThreshold
} from '../../redux/studio.js';
import {loadManagers} from './lib/studio-member-actions';
import Debug from './debug.jsx';
import {ManagerTile} from './studio-member-tile.jsx';
import StudioInfoBox from './studio-info-box.jsx';
import AlertProvider from '../../components/alert/alert-provider.jsx';
import Alert from '../../components/alert/alert.jsx';
import {
    selectCanRemoveManager, selectCanPromoteCurators
} from '../../redux/studio-permissions';


const StudioManagers = ({
    canPromoteCurators,
    canRemoveManagers,
    managerCount,
    hasReachedManagerLimit,
    hasReachedManagerThreshold,
    items,
    error,
    loading,
    moreToLoad,
    onLoadMore
}) => {
    useEffect(() => {
        if (items.length === 0) onLoadMore();
    }, []);

    const [infoBoxDismissed, setInfoBoxDismissed] = useState(false);

    const showManagerLimitInfoBox =
        !infoBoxDismissed && canPromoteCurators &&
        canRemoveManagers && hasReachedManagerLimit;

    return (
        <AlertProvider>
            <div className="studio-members">
                <Alert className="studio-alert" />
                <StudioInfoBox
                    showInfoBox={showManagerLimitInfoBox}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClose={() => setInfoBoxDismissed(true)}
                >
                    <div className="manager-threshold-message">
                        <span className="manager-threshold-info">
                            <FormattedMessage
                                id="studio.managerThresholdInfo"
                                values={{
                                    numberOfManagers: managerCount,
                                    managerLimit: STUDIO_MANAGER_LIMIT
                                }}
                            />
                        </span>
                        <FormattedMessage
                            id="studio.managerThresholdRemoveManagers"
                            values={{
                                managerLimit: STUDIO_MANAGER_LIMIT
                            }} 
                        />
                    </div>
                </StudioInfoBox>
                <div className="studio-header-container studio-managers-header">
                    <h2><FormattedMessage id="studio.managersHeader" /></h2>
                    {canPromoteCurators && canRemoveManagers && hasReachedManagerThreshold &&
                        <div className="studio-manager-count">
                            <FormattedMessage
                                id="studio.managerCountInfo"
                                values={{
                                    numberOfManagers: managerCount,
                                    managerLimit: STUDIO_MANAGER_LIMIT
                                }}
                            />
                        </div>
                    }
                </div>
                {error && <Debug
                    label="Error"
                    data={error}
                />}
                <div className="studio-members-grid">
                    {items.map(item =>
                        (<ManagerTile
                            key={item.username}
                            id={item.id}
                            username={item.username}
                            image={item.profile.images['90x90']}
                        />)
                    )}
                    {moreToLoad &&
                    <div className="studio-members-load-more">
                        <button
                            className={classNames('button', {
                                'mod-mutating': loading
                            })}
                            onClick={onLoadMore}
                        >
                            <FormattedMessage id="general.loadMore" />
                        </button>
                    </div>
                    }
                </div>
            </div>
        </AlertProvider>
    );
};

StudioManagers.propTypes = {
    canPromoteCurators: PropTypes.bool,
    canRemoveManagers: PropTypes.bool,
    managerCount: PropTypes.number,
    hasReachedManagerLimit: PropTypes.bool,
    hasReachedManagerThreshold: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.id,
        username: PropTypes.string,
        profile: PropTypes.shape({
            images: PropTypes.shape({
                '90x90': PropTypes.string
            })
        })
    })),
    loading: PropTypes.bool,
    error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    moreToLoad: PropTypes.bool,
    onLoadMore: PropTypes.func
};

export default connect(
    state => ({
        canPromoteCurators: selectCanPromoteCurators(state),
        canRemoveManagers: selectCanRemoveManager(state),
        managerCount: selectStudioManagerCount(state),
        hasReachedManagerLimit: selectStudioHasReachedManagerLimit(state),
        hasReachedManagerThreshold: selectStudioHasReachedManagerThreshold(state),
        ...managers.selector(state)
    }),
    {
        onLoadMore: loadManagers
    }
)(StudioManagers);
