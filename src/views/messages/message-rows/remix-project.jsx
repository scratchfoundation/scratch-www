import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import React from 'react';

import SocialMessage from '../../../components/social-message/social-message.jsx';

var RemixProjectMessage = React.createClass({
    type: 'RemixProjectMessage',
    propTypes: {
        actorUsername: React.PropTypes.string.isRequired,
        projectId: React.PropTypes.number.isRequired,
        projectTitle: React.PropTypes.string.isRequired,
        parentId: React.PropTypes.number.isRequired,
        parentTitle: React.PropTypes.string.isRequired,
        remixDate: React.PropTypes.string.isRequired
    },
    render: function () {
        var projectLink = '/projects/' + this.props.projectId;
        var profileLink = '/users/' + this.props.actorUsername;
        var remixedProjectLink = '/projects/' + this.props.parentId;
        
        var classes = classNames(
            'mod-remix-project',
            this.props.className
        );
        return (
            <SocialMessage
                className={classes}
                datetime={this.props.remixDate}
                iconSrc="/svgs/messages/remix.svg"
                iconAlt="remix notification image"
            >
                <FormattedMessage
                    id='messages.remixText'
                    values={{
                        profileLink: <a
                            href={profileLink}
                            className="social-messages-profile-link"
                        >
                            {this.props.actorUsername}
                        </a>,
                        projectLink: <a href={projectLink}>{this.props.projectTitle}</a>,
                        remixedProjectLink: <a href={remixedProjectLink}>{this.props.parentTitle}</a>
                    }}
                />
            </SocialMessage>
        );
    }
});

export default RemixProjectMessage;
