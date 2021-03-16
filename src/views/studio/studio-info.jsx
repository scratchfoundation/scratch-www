import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {infoFetcher} from './lib/fetchers';
import Debug from './debug.jsx';

const StudioInfo = () => {
    const {studioId} = useParams();
    const [state, setState] = useState({loading: false, error: null, data: null});
    // Since this data is in a component that is always visible, it doesn't necessarily
    // need to be kept in redux. One alternative is to use the infinite-list redux
    // module and just treat the studio info as the first and only item in the list.
    useEffect(() => {
        if (!studioId) return;
        infoFetcher(studioId)
            .then(data => setState({loading: false, error: null, data}))
            .catch(error => setState({loading: false, error, data: null}));
    }, [studioId]);

    return (
        <div>
            <h2>Studio Info</h2>
            {state.loading && <div>Loading..</div>}
            {state.error && <Debug
                label="Error"
                data={state.error}
            />}
            <Debug
                label="Studio Info"
                data={state.data}
            />
        </div>
    );
};

export default StudioInfo;
