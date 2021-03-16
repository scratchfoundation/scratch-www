import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import {curators, managers} from './lib/redux-modules'
import {curatorFetcher, managerFetcher} from './lib/fetchers'
import Debug from './debug.jsx';

const StudioCurators = () => {
    const {studioId} = useParams();
    return (
        <div>
            <h3>Managers</h3>
            <ManagerList studioId={studioId} />
            <hr />
            <h3>Curators</h3>
            <CuratorList studioId={studioId} />
        </div>
    );
};

const MemberList = ({studioId, items, error, loading, moreToLoad, onLoadMore}) => {
    useEffect(() => {
        if (studioId && items.length === 0) onLoadMore(studioId, 0);
    }, [studioId]);

    return <React.Fragment>
        {error && <Debug label="Error" data={error} />}
        {items.map((item, index) =>
            <Debug label="Member" data={item} key={index} />
        )}
        {loading ? <small>Loading...</small> : (
            moreToLoad ?
                <button onClick={() => onLoadMore(studioId, items.length)}>
                    Load more
                </button> :
                <small>No more to load</small>
        )}
    </React.Fragment>
};

const ManagerList = connect(
    state => managers.selector(state),
    dispatch => ({
        onLoadMore: (studioId, offset) => dispatch(
            managers.actions.loadMore(managerFetcher.bind(null, studioId, offset)))
    })
)(MemberList);

const CuratorList = connect(
    state => curators.selector(state),
    dispatch => ({
        onLoadMore: (studioId, offset) => dispatch(
            curators.actions.loadMore(curatorFetcher.bind(null, studioId, offset)))
    })
)(MemberList);

export default StudioCurators;
