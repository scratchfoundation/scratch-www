var classNames = require('classnames');
var connect = require('react-redux').connect;
var FormattedMessage = require('react-intl').FormattedMessage;
var injectIntl = require('react-intl').injectIntl;
var React = require('react');

var Comment = require('../../../components/comment/comment.jsx');
var FlexRow = require('../../../components/flex-row/flex-row.jsx');
var SocialMessage = require('../../../components/social-message/social-message.jsx');

var CommentMessage = injectIntl(React.createClass({
    type: 'CommentMessage',
    propTypes: {
        actorUsername: React.PropTypes.string.isRequired,
        actorId: React.PropTypes.number.isRequired,
        objectType: React.PropTypes.oneOf([0, 1, 2]).isRequired,
        objectId: React.PropTypes.number.isRequired,
        commentId: React.PropTypes.number.isRequired,
        commentText: React.PropTypes.string.isRequired,
        commentDateTime: React.PropTypes.string.isRequired,
        objectTitle: React.PropTypes.string,
        commentee: React.PropTypes.string
    },
    getObjectLink: function (objectType, commentId, objectId) {
        switch (objectType) {
        case 0:
            return '/projects/' + objectId + '/#comments-' + commentId;
        case 1:
            return '/users/' + objectId + '/#comments-' + commentId;
        case 2:
            return '/studios/' + objectId + '/comments/#comments-' + commentId;
        }
    },
    getMessageText: function (objectType, commentee) {
        var actorLink = '/users/' + this.props.actorUsername + '/';
        if (objectType === 2) {
            // studio comment notifications only occur for direct replies
            if (typeof commentee !== 'undefined' && commentee === this.props.user.username) {
                var commentLink = '/studios/' + this.props.objectId + '/comments/#comments-' + this.props.commentId;
                return <FormattedMessage
                    id='messages.studioCommentReply'
                    values={{
                        profileLink: <a
                            href={actorLink}
                            className="social-messages-profile-link"
                        >
                            {this.props.actorUsername}
                        </a>,
                        commentLink: <a href={commentLink}>{this.props.objectTitle}</a>
                    }}
                />;
            }
        } else if (objectType === 1) {
            var profileLink = '/users/' + this.props.objectTitle + '/#comments-' + this.props.commentId;
            var linkText = '';
            if (typeof commentee !== 'undefined' && commentee === this.props.user.username) {
                // is a profile comment, and is a reply
                if (this.props.objectTitle === this.props.user.username) {
                    linkText = <FormattedMessage
                        id='messages.profileSelf'
                    />;
                } else {
                    linkText = <FormattedMessage
                        id='messages.profileOther'
                        values={{
                            username: this.props.objectTitle
                        }}
                    />;
                }
                return <FormattedMessage
                    id='messages.commentReply'
                    values={{
                        profileLink: <a
                            href={actorLink}
                            className="social-messages-profile-link"
                        >
                            {this.props.actorUsername}
                        </a>,
                        commentLink: <a href={profileLink}>{linkText}</a>
                    }}
                />;
            } else {
                // is a profile comment and not a reply, must be own profile
                linkText = this.props.intl.formatMessage({
                    id: 'messages.profileSelf'
                });
                return <FormattedMessage
                    id='messages.profileComment'
                    values={{
                        profileLink: <a
                            href={actorLink}
                            className="social-messages-profile-link"
                        >
                            {this.props.actorUsername}
                        </a>,
                        commentLink: <a href={profileLink}>{linkText}</a>
                    }}
                />;
            }
        } else {
            var projectLink = '/projects/' + this.props.objectId + '/#comments-' + this.props.commentId;
            // must be a project comment, since it's not the other two, and the strict prop type reqs
            if (typeof commentee !== 'undefined' && commentee === this.props.user.username) {
                return <FormattedMessage
                    id='messages.commentReply'
                    values={{
                        profileLink: <a
                            href={actorLink}
                            className="social-messages-profile-link"
                        >
                            {this.props.actorUsername}
                        </a>,
                        commentLink: <a href={projectLink}>{this.props.objectTitle}</a>
                    }}
                />;
            } else {
                return <FormattedMessage
                    id='messages.projectComment'
                    values={{
                        profileLink: <a
                            href={actorLink}
                            className="social-messages-profile-link"
                        >
                            {this.props.actorUsername}
                        </a>,
                        commentLink: <a href={projectLink}>{this.props.objectTitle}</a>
                    }}
                />;
            }
        }
    },
    render: function () {
        var messageText = this.getMessageText(this.props.objectType, this.props.commentee);
        var commentorAvatar = 'https://cdn2.scratch.mit.edu/get_image/user/' + this.props.actorId + '_32x32.png';
        var commentorAvatarAlt = this.props.actorUsername + '\'s avatar';

        var classes = classNames(
            'mod-comment-message',
            this.props.className
        );
        return (
            <SocialMessage
                className={classes}
                datetime={this.props.commentDateTime}
            >
                <p className="comment-message-info">{messageText}</p>
                <FlexRow className="mod-comment-message">
                    <img
                        className="comment-message-info-img"
                        src={commentorAvatar}
                        alt={commentorAvatarAlt}
                    />
                    <Comment
                        comment={this.props.commentText}
                    />
                </FlexRow>
            </SocialMessage>
        );
    }
}));

var mapStateToProps = function (state) {
    return {
        user: state.session.session.user
    };
};

var ConnectedCommentMessage = connect(mapStateToProps)(CommentMessage);
module.exports = ConnectedCommentMessage;
