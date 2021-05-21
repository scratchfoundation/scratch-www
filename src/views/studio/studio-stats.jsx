/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import {selectIsFetchingInfo, selectStudioFollowerCount, selectStudioLastUpdated} from '../../redux/studio';

import lastUpdatedIcon from './icons/last-updated-icon.svg';
import followersIcon from './icons/followers-icon.svg';

const StudioStats = ({
    isFetchingInfo,
    followerCount,
    lastUpdatedDate
}) => {
    if (isFetchingInfo) return <React.Fragment />;
    return (<React.Fragment>
        <div><img
            src={lastUpdatedIcon}
        /><FormattedMessage
            id="studio.lastUpdated"
            values={{lastUpdatedDate}}
        /></div>
        <div><img
            src={followersIcon}
        /><FormattedMessage
            id="studio.followerCount"
            values={{followerCount}}
        /></div>
    </React.Fragment>);
};

StudioStats.propTypes = {
    isFetchingInfo: PropTypes.bool,
    followerCount: PropTypes.number,
    lastUpdatedDate: PropTypes.instanceOf(Date)
};

export default connect(
    state => ({
        isFetchingInfo: selectIsFetchingInfo(state),
        followerCount: selectStudioFollowerCount(state),
        lastUpdatedDate: selectStudioLastUpdated(state)
    }),
    {
    }
)(StudioStats);
