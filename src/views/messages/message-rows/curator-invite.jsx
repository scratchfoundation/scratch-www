import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import {injectIntl} from 'react-intl';
import React from 'react';

import SocialMessage from '../../../components/social-message/social-message.jsx';

var CuratorInviteMessage = injectIntl(React.createClass({
    type: 'CuratorInviteMessage',
    propTypes: {
        actorUsername: React.PropTypes.string.isRequired,
        studioId: React.PropTypes.number.isRequired,
        studioTitle: React.PropTypes.string.isRequired,
        datetimePromoted: React.PropTypes.string.isRequired
    },
    render: function () {
        var studioLink = '/studios/' + this.props.studioId + '/';
        var tabLink = '/studios/' + this.props.studioId + '/curators/';
        var actorLink = '/users/' + this.props.actorUsername + '/';
        var tabText = this.props.intl.formatMessage({id: 'messages.curatorTabText'});
        
        var classes = classNames(
            'mod-curator-invite',
            this.props.className
        );
        return (
            <SocialMessage
                className={classes}
                datetime={this.props.datetimePromoted}
                iconSrc="/svgs/messages/curator-invite.svg"
                iconAlt="curator invite notification image"
            >
                <FormattedMessage
                    id='messages.curatorInviteText'
                    values={{
                        actorLink: <a
                            href={actorLink}
                            className="social-messages-profile-link"
                        >
                            {this.props.actorUsername}
                        </a>,
                        studioLink: <a href={studioLink}>{this.props.studioTitle}</a>,
                        tabLink: <a href={tabLink}>{tabText}</a>
                    }}
                />
            </SocialMessage>
        );
    }
}));

export default CuratorInviteMessage;
