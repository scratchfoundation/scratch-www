import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import {connect} from 'react-redux';
import {useParams} from 'react-router';

import {activity} from './lib/redux-modules';
import {activityFetcher} from './lib/fetchers';
import Debug from './debug.jsx';

import SocialMessage from '../../components/social-message/social-message.jsx';

import './studio.scss';

const getComponentForItem = item => {
    switch (item.type) {
    case 'addprojecttostudio':
        return (
            <SocialMessage
                datetime={item.datetime_created}
                iconSrc="/svgs/studio/activity-project.svg"
                iconAlt="project activity icon"
                imgClassName="studio-activity-icon"
                key={item.id}
            >
                <FormattedMessage
                    id="studio.activityAddProjectToStudio"
                    values={{
                        profileLink: (
                            <a href={`/users/${item.actor_username}`}>
                                {item.actor_username}
                            </a>
                        ),
                        projectLink: (
                            <a href={`/projects/${item.project_id}`}>
                                {item.project_title}
                            </a>
                        )
                    }}
                />
            </SocialMessage>
        );
    case 'removeprojectstudio':
        return (
            <SocialMessage
                datetime={item.datetime_created}
                iconSrc="/svgs/studio/activity-project.svg"
                iconAlt="project activity icon"
                imgClassName="studio-activity-icon"
                key={item.id}
            >
                <FormattedMessage
                    id="studio.activityRemoveProjectStudio"
                    values={{
                        profileLink: (
                            <a href={`/users/${item.actor_username}`}>
                                {item.actor_username}
                            </a>
                        ),
                        projectLink: (
                            <a href={`/projects/${item.project_id}`}>
                                {item.project_title}
                            </a>
                        )
                    }}
                />
            </SocialMessage>
        );
    case 'updatestudio':
        return (
            <SocialMessage
                datetime={item.datetime_created}
                iconSrc="/svgs/studio/activity-edit.svg"
                iconAlt="edit activity icon"
                imgClassName="studio-activity-icon"
                key={item.id}
            >
                <FormattedMessage
                    id="studio.activityUpdateStudio"
                    values={{
                        profileLink: (
                            <a href={`/users/${item.actor_username}`}>
                                {item.actor_username}
                            </a>
                        )
                    }}
                />
            </SocialMessage>
        );
    case 'becomecurator':
        return (
            <SocialMessage
                datetime={item.datetime_created}
                iconSrc="/svgs/studio/activity-curator.svg"
                iconAlt="curator activity icon"
                imgClassName="studio-activity-icon"
                key={item.id}
            >
                <FormattedMessage
                    id="studio.activityBecomeCurator"
                    values={{
                        // Beware, DB seems to think actor is new curator and username is inviter
                        newCuratorProfileLink: (
                            <a href={`/users/${item.actor_username}`}>
                                {item.actor_username}
                            </a>
                        ),
                        inviterProfileLink: (
                            <a href={`/users/${item.username}`}>
                                {item.username}
                            </a>
                        )
                    }}
                />
            </SocialMessage>
        );
    case 'removecuratorstudio':
        return (
            <SocialMessage
                datetime={item.datetime_created}
                iconSrc="/svgs/studio/activity-curator.svg"
                iconAlt="curator activity icon"
                imgClassName="studio-activity-icon"
                key={item.id}
            >
                <FormattedMessage
                    id="studio.activityRemoveCurator"
                    values={{
                        removedProfileLink: (
                            <a href={`/users/${item.username}`}>
                                {item.username}
                            </a>
                        ),
                        removerProfileLink: (
                            <a href={`/users/${item.actor_username}`}>
                                {item.actor_username}
                            </a>
                        )
                    }}
                />
            </SocialMessage>
        );
    case 'becomeownerstudio':
        return (
            <SocialMessage
                datetime={item.datetime_created}
                iconSrc="/svgs/studio/activity-curator.svg"
                iconAlt="curator activity icon"
                imgClassName="studio-activity-icon"
                key={item.id}
            >
                <FormattedMessage
                    id="studio.activityBecomeOwner"
                    values={{
                        promotedProfileLink: (
                            <a href={`/users/${item.recipient_username}`}>
                                {item.recipient_username}
                            </a>
                        ),
                        promotorProfileLink: (
                            <a href={`/users/${item.actor_username}`}>
                                {item.actor_username}
                            </a>
                        )
                    }}
                />
            </SocialMessage>
        );
    }
};

const StudioActivity = ({items, loading, error, onInitialLoad}) => {
    const {studioId} = useParams();
    // Fetch the data if none has been loaded yet. This would run only once,
    // since studioId doesnt change, but the component is potentially mounted
    // multiple times because of tab routing, so need to check for empty items.
    useEffect(() => {
        if (studioId && items.length === 0) onInitialLoad(studioId);
    }, [studioId]); // items.length intentionally left out

    return (
        <div className="studio-activity">
            <h2>Activity</h2>
            {loading && <div>Loading...</div>}
            {error && <Debug
                label="Error"
                data={error}
            />}
            <ul
                className="studio-messages-list"
            >
                {items.map(item =>
                    getComponentForItem(item)
                )}
            </ul>
        </div>
    );
};

StudioActivity.propTypes = {
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    loading: PropTypes.bool,
    error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    onInitialLoad: PropTypes.func
};

export default connect(
    state => activity.selector(state),
    dispatch => ({
        onInitialLoad: studioId => dispatch(
            activity.actions.loadMore(activityFetcher.bind(null, studioId, 0)))
    })
)(StudioActivity);
