import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux'

import {projectFetcher} from './lib/fetchers';
import {projects} from './lib/redux-modules'
import Debug from './debug.jsx';

const {actions, selector} = projects;

const StudioProjects = ({
    items, error, loading, moreToLoad, onLoadMore
}) => {
    const {studioId} = useParams();

    useEffect(() => {
        if (studioId && items.length === 0) onLoadMore(studioId, 0);
    }, [studioId]);

    return (
        <div>
            <h2>Projects</h2>
            {error && <Debug label="Error" data={error} />}
            <div>
                {items.map((item, index) =>
                    <Debug label="Project" data={item} key={index} />
                )}
                {loading ? <small>Loading...</small> : (
                    moreToLoad ?
                        <button onClick={() => onLoadMore(studioId, items.length)}>
                            Load more
                        </button> :
                        <small>No more to load</small>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return selector(state);
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadMore: (studioId, offset) => dispatch(
            actions.loadMore(projectFetcher.bind(null, studioId, offset))
        )
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(StudioProjects);