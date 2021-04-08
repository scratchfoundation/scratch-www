import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import Button from '../../components/forms/button.jsx';
import ComposeComment from '../preview/comment/compose-comment.jsx';
import TopLevelComment from '../preview/comment/top-level-comment.jsx';
import studioCommentActions from '../../redux/studio-comment-actions.js';

import {
    selectShowCommentComposer,
    selectCanDeleteComment,
    selectCanDeleteCommentWithoutConfirm,
    selectCanReportComment,
    selectCanRestoreComment
} from '../../redux/studio.js';

const StudioComments = ({
    comments,
    handleLoadMoreComments,
    handleNewComment,
    moreCommentsToLoad,
    replies,
    postURI,
    shouldShowCommentComposer,
    canDeleteComment,
    canDeleteCommentWithoutConfirm,
    canReportComment,
    canRestoreComment,
    handleDeleteComment,
    handleRestoreComment,
    handleReportComment,
    handleLoadMoreReplies
}) => {
    useEffect(() => {
        if (comments.length === 0) handleLoadMoreComments();
    }, []); // Only runs once after the first render

    return (
        <div>
            <h2>Comments</h2>
            <div>
                {shouldShowCommentComposer &&
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
    handleLoadMoreComments: PropTypes.func,
    handleNewComment: PropTypes.func,
    moreCommentsToLoad: PropTypes.bool,
    replies: PropTypes.shape({}),
    shouldShowCommentComposer: PropTypes.bool,
    canDeleteComment: PropTypes.bool,
    canDeleteCommentWithoutConfirm: PropTypes.bool,
    canReportComment: PropTypes.bool,
    canRestoreComment: PropTypes.bool,
    handleDeleteComment: PropTypes.func,
    handleRestoreComment: PropTypes.func,
    handleReportComment: PropTypes.func,
    handleLoadMoreReplies: PropTypes.func,
    postURI: PropTypes.string
};

export default connect(
    state => ({
        comments: state.comments.comments,
        moreCommentsToLoad: state.comments.moreCommentsToLoad,
        replies: state.comments.replies,
        shouldShowCommentComposer: selectShowCommentComposer(state),
        canDeleteComment: selectCanDeleteComment(state),
        canDeleteCommentWithoutConfirm: selectCanDeleteCommentWithoutConfirm(state),
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
        handleLoadMoreReplies: studioCommentActions.getReplies

    }
)(StudioComments);
