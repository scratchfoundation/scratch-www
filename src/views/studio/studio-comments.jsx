import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import Button from '../../components/forms/button.jsx';
import ComposeComment from '../preview/comment/compose-comment.jsx';
import TopLevelComment from '../preview/comment/top-level-comment.jsx';
import studioCommentActions from '../../redux/studio-comment-actions.js';
import StudioCommentsAllowed from './studio-comments-allowed.jsx';

import {selectIsAdmin} from '../../redux/session';
import {
    selectShowCommentComposer,
    selectCanDeleteComment,
    selectCanDeleteCommentWithoutConfirm,
    selectCanReportComment,
    selectCanRestoreComment,
    selectCanEditCommentsAllowed
} from '../../redux/studio-permissions';
import {selectStudioCommentsAllowed} from '../../redux/studio.js';

const StudioComments = ({
    comments,
    commentsAllowed,
    isAdmin,
    handleLoadMoreComments,
    handleNewComment,
    moreCommentsToLoad,
    replies,
    postURI,
    shouldShowCommentComposer,
    canDeleteComment,
    canDeleteCommentWithoutConfirm,
    canEditCommentsAllowed,
    canReportComment,
    canRestoreComment,
    handleDeleteComment,
    handleRestoreComment,
    handleResetComments,
    handleReportComment,
    handleLoadMoreReplies
}) => {
    useEffect(() => {
        if (comments.length === 0) handleLoadMoreComments();
    }, [comments.length === 0]);

    // The comments you see depend on your admin status
    // so reset them if isAdmin changes.
    const adminRef = useRef(isAdmin);
    useEffect(() => {
        const wasAdmin = adminRef.current;
        adminRef.current = isAdmin;
        if (isAdmin !== wasAdmin) handleResetComments();
    }, [isAdmin]);

    return (
        <div>
            <div className="studio-comments-header-container">
                <h2><FormattedMessage id="studio.commentsHeader" /></h2>
                {canEditCommentsAllowed && <StudioCommentsAllowed />}
            </div>
            <div>
                {shouldShowCommentComposer && commentsAllowed &&
                    <ComposeComment
                        postURI={postURI}
                        onAddComment={handleNewComment}
                    />
                }
                {comments.map(comment => (
                    <TopLevelComment
                        author={comment.author}
                        canDelete={canDeleteComment}
                        canDeleteWithoutConfirm={canDeleteCommentWithoutConfirm}
                        canReply={shouldShowCommentComposer}
                        canReport={canReportComment}
                        canRestore={canRestoreComment}
                        content={comment.content}
                        datetimeCreated={comment.datetime_created}
                        id={comment.id}
                        key={comment.id}
                        moreRepliesToLoad={comment.moreRepliesToLoad}
                        parentId={comment.parent_id}
                        postURI={postURI}
                        replies={replies && replies[comment.id] ? replies[comment.id] : []}
                        visibility={comment.visibility}
                        onAddComment={handleNewComment}
                        onDelete={handleDeleteComment}
                        onRestore={handleRestoreComment}
                        onReport={handleReportComment}
                        onLoadMoreReplies={handleLoadMoreReplies}
                    />
                ))}
                {moreCommentsToLoad &&
                    <Button
                        className="button load-more-button"
                        onClick={handleLoadMoreComments}
                    >
                        <FormattedMessage id="general.loadMore" />
                    </Button>
                }
            </div>
        </div>
    );
};

StudioComments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({})),
    commentsAllowed: PropTypes.bool,
    isAdmin: PropTypes.bool,
    handleLoadMoreComments: PropTypes.func,
    handleNewComment: PropTypes.func,
    moreCommentsToLoad: PropTypes.bool,
    replies: PropTypes.shape({}),
    shouldShowCommentComposer: PropTypes.bool,
    canDeleteComment: PropTypes.bool,
    canDeleteCommentWithoutConfirm: PropTypes.bool,
    canEditCommentsAllowed: PropTypes.bool,
    canReportComment: PropTypes.bool,
    canRestoreComment: PropTypes.bool,
    handleDeleteComment: PropTypes.func,
    handleRestoreComment: PropTypes.func,
    handleReportComment: PropTypes.func,
    handleResetComments: PropTypes.func,
    handleLoadMoreReplies: PropTypes.func,
    postURI: PropTypes.string
};

export {
    StudioComments
};

export default connect(
    state => ({
        comments: state.comments.comments,
        isAdmin: selectIsAdmin(state),
        moreCommentsToLoad: state.comments.moreCommentsToLoad,
        replies: state.comments.replies,
        commentsAllowed: selectStudioCommentsAllowed(state),
        shouldShowCommentComposer: selectShowCommentComposer(state),
        canDeleteComment: selectCanDeleteComment(state),
        canDeleteCommentWithoutConfirm: selectCanDeleteCommentWithoutConfirm(state),
        canEditCommentsAllowed: selectCanEditCommentsAllowed(state),
        canReportComment: selectCanReportComment(state),
        canRestoreComment: selectCanRestoreComment(state),
        postURI: `/proxy/comments/studio/${state.studio.id}`
    }),
    {
        handleLoadMoreComments: studioCommentActions.getTopLevelComments,
        handleNewComment: studioCommentActions.addNewComment,
        handleDeleteComment: studioCommentActions.deleteComment,
        handleRestoreComment: studioCommentActions.restoreComment,
        handleReportComment: studioCommentActions.reportComment,
        handleLoadMoreReplies: studioCommentActions.getReplies,
        handleResetComments: studioCommentActions.resetComments
    }
)(StudioComments);
