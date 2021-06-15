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


/**
 * Format a number to a string. If the number is below the limit, format as-is. Otherwise, show a '+' to indicate that
 * the actual number might be higher.
 * @example
 * limitCount(1, 100) == '1'
 * limitCount(12.5, 100) == '12.5'
 * limitCount(100, 100) == '100+'
 * limitCount(999, 100) == '100+'
 * @param {number} num - the number to format
 * @param {number} limit - the number at which we start showing a '+'
 * @returns {string} - a string representing a number, possibly with a '+' at the end
 */
const limitCount = (num, limit) => {
    if (num < limit) {
        return `${num}`;
    }
    return `${limit}+`;
};

// These must match the limits used by the API
const countLimits = {
    comments: 100,
    projects: 100
};

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
                className="nav_link"
                to={base}
                exact
            >
                <li><img
                    src={projectsIcon}
                /><FormattedMessage
                    id={isFetchingInfo ? 'studio.tabNavProjects' : 'studio.tabNavProjectsWithCount'}
                    values={{
                        projectCount: (
                            <span className="tab-count">
                                ({limitCount(projectCount, countLimits.projects)})
                            </span>
                        )
                    }}
                /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                className="nav_link"
                to={`${base}/comments`}
            >
                <li><img
                    src={commentsIcon}
                /><FormattedMessage
                    id={isFetchingInfo ? 'studio.tabNavComments' : 'studio.tabNavCommentsWithCount'}
                    values={{
                        commentCount: (
                            <span className="tab-count">
                                ({limitCount(commentCount, countLimits.comments)})
                            </span>
                        )
                    }}
                /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                className="nav_link"
                to={`${base}/curators`}
            >
                <li><img
                    src={curatorsIcon}
                /><FormattedMessage id="studio.tabNavCurators" /></li>
            </NavLink>
            <NavLink
                activeClassName="active"
                className="nav_link"
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
