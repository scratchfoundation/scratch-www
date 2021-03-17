import React from 'react';
import {useParams} from 'react-router-dom';

const StudioCurators = () => {
    const {studioId} = useParams();

    return (
        <div>
            <h2>Curators</h2>
            <p>Studio {studioId}</p>

        </div>
    );
};

export default StudioCurators;
