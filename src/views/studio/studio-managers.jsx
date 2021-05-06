import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {managers} from './lib/redux-modules';
import {loadManagers} from './lib/studio-member-actions';
import Debug from './debug.jsx';
import {ManagerTile} from './studio-member-tile.jsx';


const StudioManagers = ({items, error, loading, moreToLoad, onLoadMore}) => {
    useEffect(() => {
        if (items.length === 0) onLoadMore();
    }, []);

    return (
        <div className="studio-members">
            <h2>Managers</h2>
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
                <div className="studio-members-load-more">
                    {loading ? <small>Loading...</small> : (
                        moreToLoad ?
                            <button onClick={onLoadMore}>
                            Load more
                            </button> :
                            <small>No more to load</small>
                    )}
                </div>
            </div>
        </div>
    );
};

StudioManagers.propTypes = {
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
    state => managers.selector(state),
    {
        onLoadMore: loadManagers
    }
)(StudioManagers);
