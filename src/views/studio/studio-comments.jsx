import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import Button from '../../components/forms/button.jsx';
import CommentingStatus from '../../components/commenting-status/commenting-status.jsx';
import ComposeComment from '../preview/comment/compose-comment.jsx';
import TopLevelComment from '../preview/comment/top-level-comment.jsx';
import studioCommentActions from '../../redux/studio-comment-actions.js';
import StudioCommentsAllowed from './studio-comments-allowed.jsx';
import StudioCommentsNotAllowed from './studio-comments-not-allowed.jsx';
import {selectIsAdmin, selectHasFetchedSession} from '../../redux/session';
import {
    selectShowCommentComposer,
    selectCanDeleteCommentWithoutConfirm,
    selectCanRestoreComment,
    selectCanEditCommentsAllowed,
    selectShowCommentsList,
    selectShowCommentsGloballyOffError
} from '../../redux/studio-permissions';
import {selectStudioCommentsAllowed} from '../../redux/studio.js';
import StudioComment from './studio-comment.js';
import commentShape from '../../lib/prop-types/comment.js';

const StudioComments = ({
    comments,
    commentsAllowed,
    isAdmin,
    hasFetchedSession,
    handleLoadMoreComments,
    handleNewComment,
    moreCommentsToLoad,
    replies,
    postURI,
    shouldShowCommentComposer,
    shouldShowCommentsList,
    shouldShowCommentsGloballyOffError,
    canDeleteCommentWithoutConfirm,
    canEditCommentsAllowed,
    canRestoreComment,
    handleDeleteComment,
    handleRestoreComment,
    handleResetComments,
    handleReportComment,
    handleLoadMoreReplies,
    handleLoadSingleComment
}) => {
    const commentHashPrefix = '#comments-';
    const [singleCommentId, setSingleCommentId] = useState(
        window.location.hash.indexOf(commentHashPrefix) !== -1 &&
        parseInt(window.location.hash.replace(commentHashPrefix, ''), 10));

    useEffect(() => {
        if (comments.length === 0 && hasFetchedSession) {
            if (singleCommentId) {
                handleLoadSingleComment(singleCommentId);
            } else {
                handleLoadMoreComments();
            }
        }
    }, [comments.length === 0, hasFetchedSession, singleCommentId]);

    const handleSeeAllComments = () => {
        setSingleCommentId(false);
        history.pushState('', document.title, window.location.pathname + window.location.search);
        handleResetComments();
    };

    // The comments you see depend on your admin status
    // so reset them if isAdmin changes.
    const adminRef = useRef(isAdmin);
    useEffect(() => {
        const wasAdmin = adminRef.current;
        adminRef.current = isAdmin;
        if (isAdmin !== wasAdmin) handleResetComments();
    }, [isAdmin]);

    const [replyStatusCommentId, setReplyStatusCommentId] = useState('');

    const hasReplyStatus = function (comment) {
        return (
            comment.parent_id && comment.parent_id === replyStatusCommentId
        ) || (comment.id === replyStatusCommentId);
    };

    const handleReplyStatusChange = function (id) {
        setReplyStatusCommentId(id);
    };

    return (
        <div className="studio-compose-container">
            <div className="studio-header-container">
                <h2><FormattedMessage id="studio.commentsHeader" /></h2>
                {canEditCommentsAllowed && <StudioCommentsAllowed />}
            </div>
            {shouldShowCommentsGloballyOffError &&
            <div>
                <CommentingStatus>
                    <p>
                        <FormattedMessage id="studio.comments.turnedOffGlobally" />
                    </p>
                </CommentingStatus>
                <img
                    className="studio-comment-placholder-img"
                    src="/images/comments/comment-placeholder.png"
                />
            </div>
            }
            {shouldShowCommentsList &&
                <div>
                    {shouldShowCommentComposer ?
                        (commentsAllowed ?
                            <div className="comments-root-reply">
                                <ComposeComment
                                    postURI={postURI}
                                    onAddComment={handleNewComment}
                                />
                            </div> :
                            <StudioCommentsNotAllowed />
                        ) : null
                    }
                    {comments.map(comment => (
                        <TopLevelComment
                            hasThreadLimit
                            author={comment.author}
                            canDeleteWithoutConfirm={canDeleteCommentWithoutConfirm}
                            canRestore={canRestoreComment}
                            commentComponent={StudioComment}
                            content={comment.content}
                            datetimeCreated={comment.datetime_created}
                            defaultExpanded={singleCommentId}
                            highlightedCommentId={singleCommentId}
                            id={comment.id}
                            key={comment.id}
                            moreRepliesToLoad={comment.moreRepliesToLoad}
                            parentId={comment.parent_id}
                            postURI={postURI}
                            replies={replies && replies[comment.id] ? replies[comment.id] : []}
                            threadHasReplyStatus={hasReplyStatus(comment)}
                            totalReplyCount={comment.reply_count}
                            visibility={comment.visibility}
                            onAddComment={handleNewComment}
                            onDelete={handleDeleteComment}
                            onRestore={handleRestoreComment}
                            // eslint-disable-next-line react/jsx-no-bind
                            onReply={handleReplyStatusChange}
                            onReport={handleReportComment}
                            onLoadMoreReplies={handleLoadMoreReplies}
                        />
                    ))}
                    {!!singleCommentId &&
                    <Button
                        className="button load-more-button"
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={handleSeeAllComments}
                    >
                        <FormattedMessage id="general.seeAllComments" />
                    </Button>
                    }
                    {moreCommentsToLoad &&
                        <Button
                            className="button load-more-button"
                            onClick={handleLoadMoreComments}
                        >
                            <FormattedMessage id="general.loadMore" />
                        </Button>
                    }
                </div>
            }
        </div>
    );
};

StudioComments.propTypes = {
    comments: PropTypes.arrayOf(commentShape),
    commentsAllowed: PropTypes.bool,
    isAdmin: PropTypes.bool,
    hasFetchedSession: PropTypes.bool,
    handleLoadMoreComments: PropTypes.func,
    handleNewComment: PropTypes.func,
    moreCommentsToLoad: PropTypes.bool,
    replies: PropTypes.arrayOf(PropTypes.arrayOf(commentShape)), // replies[commentId] = [reply1, reply2, ...]
    shouldShowCommentComposer: PropTypes.bool,
    shouldShowCommentsGloballyOffError: PropTypes.bool,
    shouldShowCommentsList: PropTypes.bool,
    canDeleteCommentWithoutConfirm: PropTypes.bool,
    canEditCommentsAllowed: PropTypes.bool,
    canRestoreComment: PropTypes.bool,
    handleDeleteComment: PropTypes.func,
    handleRestoreComment: PropTypes.func,
    handleReportComment: PropTypes.func,
    handleResetComments: PropTypes.func,
    handleLoadMoreReplies: PropTypes.func,
    handleLoadSingleComment: PropTypes.func,
    postURI: PropTypes.string
};

export {
    StudioComments
};

export default connect(
    state => ({
        comments: state.comments.comments,
        hasFetchedSession: selectHasFetchedSession(state),
        isAdmin: selectIsAdmin(state),
        moreCommentsToLoad: state.comments.moreCommentsToLoad,
        replies: state.comments.replies,
        commentsAllowed: selectStudioCommentsAllowed(state),
        shouldShowCommentComposer: selectShowCommentComposer(state),
        shouldShowCommentsGloballyOffError: selectShowCommentsGloballyOffError(state),
        shouldShowCommentsList: selectShowCommentsList(state),
        canDeleteCommentWithoutConfirm: selectCanDeleteCommentWithoutConfirm(state),
        canEditCommentsAllowed: selectCanEditCommentsAllowed(state),
        canRestoreComment: selectCanRestoreComment(state),
        postURI: `/proxy/comments/studio/${state.studio.id}`
    }),
    {
        handleLoadMoreComments: studioCommentActions.getTopLevelComments,
        handleLoadSingleComment: studioCommentActions.getCommentById,
        handleNewComment: studioCommentActions.addNewComment,
        handleDeleteComment: studioCommentActions.deleteComment,
        handleRestoreComment: studioCommentActions.restoreComment,
        handleReportComment: studioCommentActions.reportComment,
        handleLoadMoreReplies: studioCommentActions.getReplies,
        handleResetComments: studioCommentActions.resetComments
    }
)(StudioComments);
