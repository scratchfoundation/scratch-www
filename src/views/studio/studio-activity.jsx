import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router';

import {activity} from './lib/redux-modules';
import {activityFetcher} from './lib/fetchers';
import Debug from './debug.jsx';

const StudioActivity = ({items, loading, error, onInitialLoad}) => {
    const {studioId} = useParams();
    useEffect(() => {
        if (studioId && items.length === 0) onInitialLoad(studioId);
    }, [studioId]);

    return (
        <div>
            <h2>Activity</h2>
            {loading && <div>Loading...</div>}
            {error && <Debug label="Error" data={error} />}
            <div>
                {items.map((item, index) =>
                    <Debug label="Activity Item" data={item} key={index} />
                )}
            </div>
        </div>
    );
};

export default connect(
    (state) => activity.selector(state),
    (dispatch) => ({
        onInitialLoad: (studioId) => dispatch(
            activity.actions.loadMore(activityFetcher.bind(null, studioId, 0)))
    })
)(StudioActivity);
