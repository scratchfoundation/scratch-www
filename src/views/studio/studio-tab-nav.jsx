import React from 'react';
import {useRouteMatch, NavLink} from 'react-router-dom';
import SubNavigation from '../../components/subnavigation/subnavigation.jsx';

const StudioTabNav = () => {
    const match = useRouteMatch();

    return (
        <SubNavigation
            align="left"
            className="studio-tab-nav"
        >
            <NavLink
                activeClassName="active"
                to={`${match.url}`}
                exact
            >
                <li>Projects</li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${match.url}/curators`}
            >
                <li>Curators</li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${match.url}/comments`}
            >
                <li> Comments</li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${match.url}/activity`}
            >
                <li>Activity</li>
            </NavLink>
        </SubNavigation>
    );
};

export default StudioTabNav;
