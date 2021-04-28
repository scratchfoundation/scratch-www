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

const StudioInfo = ({
    isLoggedIn, onLoadInfo, onLoadRoles
}) => {
    useEffect(() => { // Load studio info after first render
        onLoadInfo();
    }, []);

    useEffect(() => { // Load roles info once the user is logged in is available
        if (isLoggedIn) onLoadRoles();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            <StudioTitle />
            <StudioFollow />
            <StudioImage />
            <StudioDescription />
        </React.Fragment>
    );
};

StudioInfo.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLoadInfo: PropTypes.func,
    onLoadRoles: PropTypes.func
};

export default connect(
    state => ({
        isLoggedIn: selectIsLoggedIn(state)
    }),
    {
        onLoadInfo: getInfo,
        onLoadRoles: getRoles
    }
)(StudioInfo);
