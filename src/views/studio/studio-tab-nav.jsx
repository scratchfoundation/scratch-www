import React from 'react';
import {useRouteMatch, NavLink} from 'react-router-dom';
import SubNavigation from '../../components/subnavigation/subnavigation.jsx';
import {FormattedMessage} from 'react-intl';

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
                <li><FormattedMessage id="studio.tabNavProjects" /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${match.url}/curators`}
            >
                <li><FormattedMessage id="studio.tabNavCurators" /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${match.url}/comments`}
            >
                <li><FormattedMessage id="studio.tabNavComments" /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${match.url}/activity`}
            >
                <li><FormattedMessage id="studio.tabNavActivity" /></li>
            </NavLink>
        </SubNavigation>
    );
};

export default StudioTabNav;
