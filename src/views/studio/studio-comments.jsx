import React from 'react';
import {useParams} from 'react-router-dom';

const StudioComments = () => {
    const {studioId} = useParams();

    return (
        <div>
            <h2>Comments</h2>
            <p>Studio {studioId}</p>
        </div>
    );
};

export default StudioComments;