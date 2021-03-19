import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import Debug from './debug.jsx';
import {Status as SessionStatus} from '../../redux/session';
import {getInfo, getRoles} from '../../redux/studio';

const StudioInfo = ({username, studio, token, onLoadInfo, onLoadRoles}) => {
    const {studioId} = useParams();
    
    useEffect(() => { // Load studio info after first render
        if (studioId) onLoadInfo(studioId);
    }, [studioId]);

    useEffect(() => { // Load roles info once the username is available
        if (studioId && username && token) onLoadRoles(studioId, username, token);
    }, [studioId, username, token]);

    return (
        <div>
            <h2>Studio Info</h2>
            <Debug
                label="Studio Info"
                data={studio}
            />
        </div>
    );
};

StudioInfo.propTypes = {
    username: PropTypes.string,
    token: PropTypes.string,
    studio: PropTypes.shape({
        // Fill this in as the data is used, just for demo now
    })
};

export default connect(
    (state) => {
        const user = state.session.session.user;
        return {
            studio: state.studio,
            username: user && user.username,
            token: user && user.token
        };
    },
    (dispatch) => ({
        onLoadInfo: (studioId) => dispatch(getInfo(studioId)),
        onLoadRoles: (studioId, username, token) => dispatch(
            getRoles(studioId, username, token))
    })
)(StudioInfo);
