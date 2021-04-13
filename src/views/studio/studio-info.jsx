import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Debug from './debug.jsx';
import StudioDescription from './studio-description.jsx';
import StudioFollow from './studio-follow.jsx';
import StudioTitle from './studio-title.jsx';
import StudioImage from './studio-image.jsx';

import {selectIsLoggedIn} from '../../redux/session';
import {getInfo, getRoles} from '../../redux/studio';
import StudioReport from './studio-report.jsx';

const StudioInfo = ({
    isLoggedIn, studio, onLoadInfo, onLoadRoles
}) => {
    useEffect(() => { // Load studio info after first render
        onLoadInfo();
    }, []);

    useEffect(() => { // Load roles info once the user is logged in is available
        if (isLoggedIn) onLoadRoles();
    }, [isLoggedIn]);

    return (
        <div>
            <h2>Studio Info</h2>
            <StudioTitle />
            <StudioDescription />
            <StudioFollow />
            <StudioImage />
            <StudioReport />
            <Debug
                label="Studio Info"
                data={studio}
            />
        </div>
    );
};

StudioInfo.propTypes = {
    isLoggedIn: PropTypes.bool,
    studio: PropTypes.shape({}), // TODO remove, just for <Debug />
    onLoadInfo: PropTypes.func,
    onLoadRoles: PropTypes.func
};

export default connect(
    state => ({
        studio: state.studio,
        isLoggedIn: selectIsLoggedIn(state)
    }),
    {
        onLoadInfo: getInfo,
        onLoadRoles: getRoles
    }
)(StudioInfo);
