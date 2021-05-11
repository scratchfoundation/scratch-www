import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import {curators} from './lib/redux-modules';
import Debug from './debug.jsx';
import {CuratorTile} from './studio-member-tile.jsx';
import CuratorInviter from './studio-curator-inviter.jsx';
import CuratorInvite from './studio-curator-invite.jsx';
import {loadCurators} from './lib/studio-member-actions';
import {selectCanInviteCurators, selectShowCuratorInvite} from '../../redux/studio-permissions';

const StudioCurators = ({
    canInviteCurators, showCuratorInvite, items, error, loading, moreToLoad, onLoadMore
}) => {
    useEffect(() => {
        if (items.length === 0) onLoadMore();
    }, []);

    return (<div className="studio-members">
        <h2><FormattedMessage id="studio.curatorsHeader" /></h2>
        {canInviteCurators && <CuratorInviter />}
        {showCuratorInvite && <CuratorInvite />}
        {error && <Debug
            label="Error"
            data={error}
        />}
        <div className="studio-members-grid">
            {items.map(item =>
                (<CuratorTile
                    key={item.username}
                    username={item.username}
                    image={item.profile.images['90x90']}
                />)
            )}
            <div className="studio-members-load-more">
                {loading ? <small>Loading...</small> : (
                    moreToLoad ?
                        <button onClick={onLoadMore}>
                            <FormattedMessage id="general.loadMore" />
                        </button> :
                        <small>No more to load</small>
                )}
            </div>
        </div>
    </div>);
};

StudioCurators.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.id,
        username: PropTypes.string,
        profile: PropTypes.shape({
            images: PropTypes.shape({
                '90x90': PropTypes.string
            })
        })
    })),
    canInviteCurators: PropTypes.bool,
    showCuratorInvite: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    moreToLoad: PropTypes.bool,
    onLoadMore: PropTypes.func
};

export default connect(
    state => ({
        ...curators.selector(state),
        canInviteCurators: selectCanInviteCurators(state),
        showCuratorInvite: selectShowCuratorInvite(state)
    }),
    {
        onLoadMore: loadCurators
    }
)(StudioCurators);
