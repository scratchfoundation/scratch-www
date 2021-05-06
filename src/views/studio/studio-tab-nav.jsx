import React from 'react';
import {useRouteMatch, NavLink} from 'react-router-dom';
import SubNavigation from '../../components/subnavigation/subnavigation.jsx';

const StudioTabNav = () => {
    const {params: {studioPath, studioId}} = useRouteMatch();
    const base = `/${studioPath}/${studioId}`;
    return (
        <SubNavigation
            align="left"
            className="studio-tab-nav"
        >
            <NavLink
                activeClassName="active"
                to={base}
                exact
            >
                <li>Projects</li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${base}/curators`}
            >
                <li>Curators</li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${base}/comments`}
            >
                <li> Comments</li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${base}/activity`}
            >
                <li>Activity</li>
            </NavLink>
        </SubNavigation>
    );
};

export default StudioTabNav;
