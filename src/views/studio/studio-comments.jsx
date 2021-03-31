import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import Debug from './debug.jsx';

import studioCommentActions from '../../redux/studio-comment-actions.js';

const StudioComments = props => {
    const {studioId} = useParams();
    useEffect(() => {
        if (props.comments.length === 0) props.getTopLevelComments(studioId, 0)
    }, [studioId]);
    return (
        <div>
            <h2>Comments</h2>
            <Debug
                label="Comments"
                data={props}
            />
            <p>Studio {studioId}</p>
        </div>
    );
};

StudioComments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({})),
    getTopLevelComments: PropTypes.func
};


export default connect(
    state => state.comments,
    {
        getTopLevelComments: studioCommentActions.getTopLevelComments
    }
)(StudioComments);
