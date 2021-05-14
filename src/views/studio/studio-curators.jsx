import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';

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
        <div className="studio-header-container">
            <h2><FormattedMessage id="studio.curatorsHeader" /></h2>
        </div>
        {canInviteCurators && <CuratorInviter />}
        {showCuratorInvite && <CuratorInvite />}
        {error && <Debug
            label="Error"
            data={error}
        />}
        <div className="studio-members-grid">
            {items.length === 0 && !loading ? (
                <div className="studio-empty">
                    <img
                        width="179"
                        height="111"
                        className="studio-empty-img"
                        src="/images/studios/curators-empty.png"
                    />
                    {canInviteCurators ? (
                        <div className="studio-empty-msg">
                            <div><FormattedMessage id="studio.curatorsEmptyCanAdd1" /></div>
                            <div><FormattedMessage id="studio.curatorsEmptyCanAdd2" /></div>
                        </div>
                    ) : (
                        <div className="studio-empty-msg">
                            <div><FormattedMessage id="studio.curatorsEmpty1" /></div>
                        </div>
                    )}
                </div>
            ) : (
                <React.Fragment>
                    {items.map(item =>
                        (<CuratorTile
                            key={item.username}
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
                </React.Fragment>
            )}
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
