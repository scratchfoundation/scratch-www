import React from 'react';
import {useRouteMatch, NavLink} from 'react-router-dom';
import SubNavigation from '../../components/subnavigation/subnavigation.jsx';
import {FormattedMessage} from 'react-intl';

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
                <li><FormattedMessage id="studio.tabNavProjects" /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${base}/comments`}
            >
                <li><FormattedMessage id="studio.tabNavComments" /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${base}/curators`}
            >
                <li><FormattedMessage id="studio.tabNavCurators" /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${base}/activity`}
            >
                <li><FormattedMessage id="studio.tabNavActivity" /></li>
            </NavLink>
        </SubNavigation>
    );
};

export default StudioTabNav;
