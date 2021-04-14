import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Debug from './debug.jsx';

import {selectIsLoggedIn} from '../../redux/session';
import {getInfo, getRoles, selectCanEditInfo} from '../../redux/studio';

const StudioInfo = ({isLoggedIn, studio, canEditInfo, onLoadInfo, onLoadRoles}) => {
    useEffect(() => { // Load studio info after first render
        onLoadInfo();
    }, []);

    useEffect(() => { // Load roles info once the user is logged in is available
        if (isLoggedIn) onLoadRoles();
    }, [isLoggedIn]);

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
    isLoggedIn: PropTypes.bool,
    studio: PropTypes.shape({
        // Fill this in as the data is used, just for demo now
    }),
    onLoadInfo: PropTypes.func,
    onLoadRoles: PropTypes.func
};

export default connect(
    state => ({
        studio: state.studio,
        isLoggedIn: selectIsLoggedIn(state),
        canEditInfo: selectCanEditInfo(state)
    }),
    {
        onLoadInfo: getInfo,
        onLoadRoles: getRoles
    }
)(StudioInfo);
