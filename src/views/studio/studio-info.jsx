import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import Debug from './debug.jsx';

import {selectUsername, selectToken} from '../../redux/session';
import {getInfo, getRoles, selectCanEditInfo} from '../../redux/studio';

const StudioInfo = ({username, studio, token, canEditInfo, onLoadInfo, onLoadRoles}) => {
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
            <Debug
                label="Studio Info Permissions"
                data={{canEditInfo}}
            />
        </div>
    );
};

StudioInfo.propTypes = {
    canEditInfo: PropTypes.bool,
    username: PropTypes.string,
    token: PropTypes.string,
    studio: PropTypes.shape({
        // Fill this in as the data is used, just for demo now
    }),
    onLoadInfo: PropTypes.func,
    onLoadRoles: PropTypes.func
};

export default connect(
    state => ({
        studio: state.studio,
        username: selectUsername(state),
        token: selectToken(state),
        canEditInfo: selectCanEditInfo(state)
    }),
    dispatch => ({
        onLoadInfo: studioId => dispatch(getInfo(studioId)),
        onLoadRoles: (studioId, username, token) => dispatch(
            getRoles(studioId, username, token))
    })
)(StudioInfo);
