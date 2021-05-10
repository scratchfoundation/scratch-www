import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {activity} from './lib/redux-modules';
import {loadActivity} from './lib/studio-activity-actions';
import Debug from './debug.jsx';

const StudioActivity = ({items, loading, error, moreToLoad, onLoadMore}) => {
    useEffect(() => {
        if (items.length === 0) onLoadMore();
    }, []);

    return (
        <div>
            <h2>Activity</h2>
            {loading && <div>Loading...</div>}
            {error && <Debug
                label="Error"
                data={error}
            />}
            <div>
                {items.map((item, index) =>
                    (<Debug
                        label="Activity Item"
                        data={item}
                        key={index}
                    />)
                )}
                <div>
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

StudioActivity.propTypes = {
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    loading: PropTypes.bool,
    error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    moreToLoad: PropTypes.bool,
    onLoadMore: PropTypes.func
};

export default connect(
    state => activity.selector(state),
    {
        onLoadMore: loadActivity
    }
)(StudioActivity);
