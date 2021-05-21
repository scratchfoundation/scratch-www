import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useRouteMatch, NavLink} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import SubNavigation from '../../components/subnavigation/subnavigation.jsx';

import activityIcon from './icons/activity-icon.svg';
import commentsIcon from './icons/comments-icon.svg';
import curatorsIcon from './icons/curator-icon.svg';
import projectsIcon from './icons/projects-icon.svg';

import {selectIsFetchingInfo, selectStudioCommentCount, selectStudioProjectCount} from '../../redux/studio';

const StudioTabNav = ({isFetchingInfo, commentCount, projectCount}) => {
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
                <li><img
                    src={projectsIcon}
                /><FormattedMessage
                    id={isFetchingInfo ? 'studio.tabNavProjects' : 'studio.tabNavProjectsWithCount'}
                    values={{projectCount}}
                /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${base}/comments`}
            >
                <li><img
                    src={commentsIcon}
                /><FormattedMessage
                    id={isFetchingInfo ? 'studio.tabNavComments' : 'studio.tabNavCommentsWithCount'}
                    values={{commentCount}}
                /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${base}/curators`}
            >
                <li><img
                    src={curatorsIcon}
                /><FormattedMessage id="studio.tabNavCurators" /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                to={`${base}/activity`}
            >
                <li><img
                    src={activityIcon}
                /><FormattedMessage id="studio.tabNavActivity" /></li>
            </NavLink>
        </SubNavigation>
    );
};

StudioTabNav.propTypes = {
    isFetchingInfo: PropTypes.bool,
    commentCount: PropTypes.number,
    projectCount: PropTypes.number
};

const mapStateToProps = state => ({
    isFetchingInfo: selectIsFetchingInfo(state),
    commentCount: selectStudioCommentCount(state),
    projectCount: selectStudioProjectCount(state)
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StudioTabNav);
