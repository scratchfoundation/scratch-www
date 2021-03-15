import React from 'react';
import {useParams} from 'react-router-dom';

const StudioActivity = () => {
    const {studioId} = useParams();

    return (
        <div>
            <h2>Activity</h2>
            <p>Studio {studioId}</p>
        </div>
    );
};

export default StudioActivity;
