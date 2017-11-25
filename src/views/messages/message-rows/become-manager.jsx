import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import React from 'react';

import SocialMessage from '../../../components/social-message/social-message.jsx';

var BecomeManagerMessage = React.createClass({
    type: 'BecomeManagerMessage',
    propTypes: {
        actorUsername: React.PropTypes.string.isRequired,
        studioId: React.PropTypes.number.isRequired,
        studioTitle: React.PropTypes.string.isRequired,
        datetimePromoted: React.PropTypes.string.isRequired
    },
    render: function () {
        var actorUri = '/users/' + this.props.actorUsername + '/';
        var studioUri = '/studios/' + this.props.studioId + '/';

        var classes = classNames(
            'mod-become-manager',
            this.props.className
        );
        return (
            <SocialMessage
                className={classes}
                datetime={this.props.datetimePromoted}
                iconSrc="/svgs/messages/owner-invite.svg"
                iconAlt="become owner notification image"
            >
                <FormattedMessage
                    id='messages.becomeManagerText'
                    values={{
                        username: <a
                            href={actorUri}
                            className="social-messages-profile-link"
                        >
                            {this.props.actorUsername}
                        </a>,
                        studio: <a href={studioUri}>{this.props.studioTitle}</a>
                    }}
                />
            </SocialMessage>
        );
    }
});

export default BecomeManagerMessage;
