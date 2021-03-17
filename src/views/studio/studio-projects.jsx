import React from 'react';
import {useParams} from 'react-router-dom';

const StudioProjects = () => {
    const {studioId} = useParams();

    return (
        <div>
            <h2>Projects</h2>
            <p>Studio {studioId}</p>
        </div>
    );
};

export default StudioProjects;
