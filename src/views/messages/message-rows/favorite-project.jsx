import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import React from 'react';

import SocialMessage from '../../../components/social-message/social-message.jsx';

var FavoriteProjectMessage = React.createClass({
    type: 'FavoriteProjectMessage',
    propTypes: {
        actorUsername: React.PropTypes.string.isRequired,
        projectId: React.PropTypes.number.isRequired,
        projectTitle: React.PropTypes.string.isRequired,
        favoriteDateTime: React.PropTypes.string.isRequired
    },
    render: function () {
        var projectLink = '/projects/' + this.props.projectId;
        var profileLink = '/users/' + this.props.actorUsername;

        var classes = classNames(
            'mod-love-favorite',
            this.props.className
        );
        return (
            <SocialMessage
                className={classes}
                datetime={this.props.favoriteDateTime}
                iconSrc="/svgs/messages/favorite.svg"
                iconAlt="favorite notification image"
            >
                <FormattedMessage
                    id='messages.favoriteText'
                    values={{
                        profileLink: <a
                            href={profileLink}
                            className="social-messages-profile-link"
                        >
                            {this.props.actorUsername}
                        </a>,
                        projectLink: <a href={projectLink}>{this.props.projectTitle}</a>
                    }}
                />
            </SocialMessage>
        );
    }
});

export default FavoriteProjectMessage;
