const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const connect = require('react-redux').connect;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');

const Comment = require('../../../components/comment/comment.jsx');
const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const SocialMessage = require('../../../components/social-message/social-message.jsx');
const thumbnailUrl = require('../../../lib/user-thumbnail');

class CommentMessage extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getObjectLink',
            'getMessageText'
        ]);
    }
    getObjectLink (objectType, commentId, objectId) {
        switch (objectType) {
        case 0:
            return `/projects/${objectId}/#comments-${commentId}`;
        case 1:
            return `/users/${objectId}/#comments-${commentId}`;
        case 2:
            return `/studios/${objectId}/comments/#comments-${commentId}`;
        }
    }
    getMessageText (objectType, commentee) {
        const actorLink = `/users/${this.props.actorUsername}/`;
        if (objectType === 2) {
            // studio comment notifications only occur for direct replies
            if (typeof commentee !== 'undefined' && commentee === this.props.user.username) {
                const commentLink = `/studios/${this.props.objectId}/comments/#comments-${this.props.commentId}`;
                return (
                    <FormattedMessage
                        id="messages.studioCommentReply"
                        values={{
                            profileLink: (
                                <a
                                    className="social-messages-profile-link"
                                    href={actorLink}
                                >
                                    {this.props.actorUsername}
                                </a>
                            ),
                            commentLink: <a href={commentLink}>{this.props.objectTitle}</a>
                        }}
                    />
                );
            }
        } else if (objectType === 1) {
            const profileLink = `/users/${this.props.objectTitle}/#comments-${this.props.commentId}`;
            let linkText = '';
            if (typeof commentee !== 'undefined' && commentee === this.props.user.username) {
                // is a profile comment, and is a reply
                if (this.props.objectTitle === this.props.user.username) {
                    linkText = (<FormattedMessage id="messages.profileSelf" />);
                } else {
                    linkText = (
                        <FormattedMessage
                            id="messages.profileOther"
                            values={{
                                username: this.props.objectTitle
                            }}
                        />
                    );
                }
                return (
                    <FormattedMessage
                        id="messages.commentReply"
                        values={{
                            profileLink: (
                                <a
                                    className="social-messages-profile-link"
                                    href={actorLink}
                                >
                                    {this.props.actorUsername}
                                </a>
                            ),
                            commentLink: <a href={profileLink}>{linkText}</a>
                        }}
                    />
                );
            }
            // is a profile comment and not a reply, must be own profile
            linkText = this.props.intl.formatMessage({
                id: 'messages.profileSelf'
            });
            return (
                <FormattedMessage
                    id="messages.profileComment"
                    values={{
                        profileLink: (
                            <a
                                className="social-messages-profile-link"
                                href={actorLink}
                            >
                                {this.props.actorUsername}
                            </a>
                        ),
                        commentLink: <a href={profileLink}>{linkText}</a>
                    }}
                />
            );
        } else {
            const projectLink = `/projects/${this.props.objectId}/#comments-${this.props.commentId}`;
            // must be a project comment, since it's not the other two, and the strict prop type reqs
            if (typeof commentee !== 'undefined' && commentee === this.props.user.username) {
                return (
                    <FormattedMessage
                        id="messages.commentReply"
                        values={{
                            profileLink: (
                                <a
                                    className="social-messages-profile-link"
                                    href={actorLink}
                                >
                                    {this.props.actorUsername}
                                </a>
                            ),
                            commentLink: <a href={projectLink}>{this.props.objectTitle}</a>
                        }}
                    />
                );
            }
            return (
                <FormattedMessage
                    id="messages.projectComment"
                    values={{
                        profileLink: (
                            <a
                                className="social-messages-profile-link"
                                href={actorLink}
                            >
                                {this.props.actorUsername}
                            </a>
                        ),
                        commentLink: <a href={projectLink}>{this.props.objectTitle}</a>
                    }}
                />
            );
        }
    }
    render () {
        return (
            <SocialMessage
                className={classNames(
                    'mod-comment-message',
                    this.props.className
                )}
                datetime={this.props.commentDateTime}
                iconAlt="comment notification image"
                iconSrc="/svgs/messages/comment.svg"
            >
                <p className="comment-message-info">
                    {this.getMessageText(this.props.objectType, this.props.commentee)}
                </p>
                <FlexRow className="mod-comment-message">
                    <a href={`/users/${this.props.actorUsername}`}>
                        <img
                            alt={`${this.props.actorUsername}'s avatar`}
                            className="comment-message-info-img"
                            src={thumbnailUrl(this.props.actorId)}
                        />
                    </a>
                    <Comment
                        comment={this.props.commentText}
                    />
                </FlexRow>
            </SocialMessage>
        );
    }
}

CommentMessage.propTypes = {
    actorId: PropTypes.number.isRequired,
    actorUsername: PropTypes.string.isRequired,
    className: PropTypes.string,
    commentDateTime: PropTypes.string.isRequired,
    commentId: PropTypes.number.isRequired,
    commentText: PropTypes.string.isRequired,
    commentee: PropTypes.string,
    intl: intlShape.isRequired,
    objectId: PropTypes.number.isRequired,
    objectTitle: PropTypes.string,
    objectType: PropTypes.oneOf([0, 1, 2]).isRequired,
    user: PropTypes.shape({
        id: PropTypes.number,
        banned: PropTypes.bool,
        username: PropTypes.string,
        token: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        dateJoined: PropTypes.string,
        email: PropTypes.string,
        classroomId: PropTypes.string
    }).isRequired
};

const WrappedCommentMessage = injectIntl(CommentMessage);

const mapStateToProps = state => ({
    user: state.session.session.user
});

const ConnectedCommentMessage = connect(mapStateToProps)(WrappedCommentMessage);

module.exports = ConnectedCommentMessage;
