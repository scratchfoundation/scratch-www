import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import {connect} from 'react-redux';

import {activity} from './lib/redux-modules';
import {loadActivity} from './lib/studio-activity-actions';
import classNames from 'classnames';

import SocialMessage from '../../components/social-message/social-message.jsx';
const MembershipLabel = require('../../components/membership-label/membership-label.jsx');

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
                            <span>
                                <a href={`/users/${item.actor_username}/`}>
                                    {item.actor_username}
                                </a>
                                {!!item.actor_membership_label &&
                                    <MembershipLabel labelType={item.actor_membership_label} />}
                            </span>
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
                            <span>
                                <a href={`/users/${item.actor_username}/`}>
                                    {item.actor_username}
                                </a>
                                {!!item.actor_membership_label &&
                                    <MembershipLabel labelType={item.actor_membership_label} />}
                            </span>
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
                            <span>
                                <a href={`/users/${item.actor_username}/`}>
                                    {item.actor_username}
                                </a>
                                {!!item.actor_membership_label &&
                                    <MembershipLabel labelType={item.actor_membership_label} />}
                            </span>
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
                            <span>
                                <a href={`/users/${item.actor_username}/`}>
                                    {item.actor_username}
                                </a>
                                {!!item.actor_membership_label &&
                                    <MembershipLabel labelType={item.actor_membership_label} />}
                            </span>
                        ),
                        inviterProfileLink: (
                            <span>
                                <a href={`/users/${item.username}/`}>
                                    {item.username}
                                </a>
                                {!!item.recipient_membership_label &&
                                <MembershipLabel labelType={item.recipient_membership_label} />}
                            </span>
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
                            <span>
                                <a href={`/users/${item.username}/`}>
                                    {item.username}
                                </a>
                                {!!item.recipient_membership_label &&
                                    <MembershipLabel labelType={item.recipient_membership_label} />}
                            </span>
                        ),
                        removerProfileLink: (
                            <span>
                                <a href={`/users/${item.actor_username}/`}>
                                    {item.actor_username}
                                </a>
                                {!!item.actor_membership_label &&
                                    <MembershipLabel labelType={item.actor_membership_label} />}
                            </span>
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
                            <span>
                                <a href={`/users/${item.recipient_username}/`}>
                                    {item.recipient_username}
                                </a>
                                {!!item.recipient_membership_label &&
                                <MembershipLabel labelType={item.recipient_membership_label} />}
                            </span>
                        ),
                        promotorProfileLink: (
                            <span>
                                <a href={`/users/${item.actor_username}/`}>
                                    {item.actor_username}
                                </a>
                                {!!item.actor_membership_label &&
                                    <MembershipLabel labelType={item.actor_membership_label} />}
                            </span>
                        )
                    }}
                />
            </SocialMessage>
        );
    case 'becomehoststudio':
        return (
            <SocialMessage
                datetime={item.datetime_created}
                iconSrc="/svgs/studio/activity-curator.svg"
                iconAlt="curator activity icon"
                imgClassName="studio-activity-icon"
                key={item.id}
            >
                {item.admin_actor ?
                    <FormattedMessage
                        id="studio.activityBecomeHostAdminActor"
                        values={{
                            newHostProfileLink: (
                                <span>
                                    <a href={`/users/${item.recipient_username}/`}>
                                        {item.recipient_username}
                                    </a>
                                    {!!item.recipient_membership_label &&
                                    <MembershipLabel labelType={item.recipient_membership_label} />}
                                </span>
                            )
                        }}
                    /> :
                    <FormattedMessage
                        id="studio.activityBecomeHost"
                        values={{
                            newHostProfileLink: (
                                <span>
                                    <a href={`/users/${item.recipient_username}/`}>
                                        {item.recipient_username}
                                    </a>
                                    {!!item.recipient_membership_label &&
                                        <MembershipLabel labelType={item.recipient_membership_label} />}
                                </span>
                            ),
                            actorProfileLink: (
                                <span>
                                    <a href={`/users/${item.actor_username}/`}>
                                        {item.actor_username}
                                    </a>
                                    {!!item.actor_membership_label &&
                                        <MembershipLabel labelType={item.actor_membership_label} />}
                                </span>
                            )
                        }}
                    />
                }
            </SocialMessage>
        );
    }
};

const StudioActivity = ({items, loading, error, moreToLoad, onLoadMore}) => {
    useEffect(() => {
        if (items.length === 0) onLoadMore();
    }, []);

    return (
        <div className="studio-activity">
            <div className="studio-header-container">
                <h2><FormattedMessage id="studio.activityHeader" /></h2>
            </div>
            {loading && <div>Loading...</div>}
            {error && <div className="studio-section-load-error studio-info-box studio-info-box-error">
                <h3><FormattedMessage id="studio.sectionLoadError.activityHeadline" /></h3>
                <button
                    className="button"
                    onClick={onLoadMore}
                >
                    <FormattedMessage id="studio.sectionLoadError.tryAgain" />
                </button>
            </div>}
            <ul
                className="studio-messages-list"
            >
                {items.map(item =>
                    getComponentForItem(item)
                )}
            </ul>
            {moreToLoad &&
                <div className="studio-grid-load-more">
                    <button
                        className={classNames('button', {
                            'mod-mutating': loading
                        })}
                        onClick={onLoadMore}
                    >
                        <FormattedMessage id="general.loadMore" />
                    </button>
                </div>
            }
        </div>
    );
};

StudioActivity.propTypes = {
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    loading: PropTypes.bool,
    error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    moreToLoad: PropTypes.bool,
    onLoadMore: PropTypes.func
};

export default connect(
    state => activity.selector(state),
    {
        onLoadMore: loadActivity
    }
)(StudioActivity);
