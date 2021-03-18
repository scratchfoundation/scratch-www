import React from 'react';
import {useRouteMatch, NavLink} from 'react-router-dom';

const StudioTabNav = () => {
    const match = useRouteMatch();

    return (
        <div>
            <NavLink
                activeStyle={{textDecoration: 'underline'}}
                to={`${match.url}`}
                exact
            >
                Projects
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink
                activeStyle={{textDecoration: 'underline'}}
                to={`${match.url}/curators`}
            >
                Curators
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink
                activeStyle={{textDecoration: 'underline'}}
                to={`${match.url}/comments`}
            >
                Comments
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink
                activeStyle={{textDecoration: 'underline'}}
                to={`${match.url}/activity`}
            >
                Activity
            </NavLink>
        </div>
    );
};

export default StudioTabNav;
