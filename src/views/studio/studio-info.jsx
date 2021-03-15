import React from 'react';
import {useParams} from 'react-router-dom';

const StudioInfo = () => {
    const {studioId} = useParams();

    return (
        <div>
            <h2>Studio Info</h2>
            <p>Studio {studioId}</p>
        </div>
    );
};

export default StudioInfo;
