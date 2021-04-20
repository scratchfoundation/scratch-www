import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import Button from '../../components/forms/button.jsx';
import ComposeComment from '../preview/comment/compose-comment.jsx';
import TopLevelComment from '../preview/comment/top-level-comment.jsx';
import studioCommentActions from '../../redux/studio-comment-actions.js';

import {selectShowCommentComposer} from '../../redux/studio.js';

const StudioComments = ({
    comments,
    handleLoadMoreComments,
    handleNewComment,
    moreCommentsToLoad,
    replies,
    shouldShowCommentComposer
}) => {
    const {studioId} = useParams();

    useEffect(() => {
        if (comments.length === 0) handleLoadMoreComments();
    }, []); // Only runs once after the first render

    return (
        <div>
            <h2>Comments</h2>
            <div>
                {shouldShowCommentComposer &&
                    <ComposeComment
                        postURI={`/proxy/comments/studio/${studioId}`}
                        onAddComment={handleNewComment}
                    />
                }
                {comments.map(comment => (
                    <TopLevelComment
                        author={comment.author}
                        canReply={shouldShowCommentComposer}
                        content={comment.content}
                        datetimeCreated={comment.datetime_created}
                        id={comment.id}
                        key={comment.id}
                        moreRepliesToLoad={comment.moreRepliesToLoad}
                        parentId={comment.parent_id}
                        postURI={`/proxy/comments/studio/${studioId}`}
                        replies={replies && replies[comment.id] ? replies[comment.id] : []}
                        visibility={comment.visibility}
                        onAddComment={handleNewComment}
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
    shouldShowCommentComposer: PropTypes.bool
};


export default connect(
    state => ({
        comments: state.comments.comments,
        moreCommentsToLoad: state.comments.moreCommentsToLoad,
        replies: state.comments.replies,
        shouldShowCommentComposer: selectShowCommentComposer(state)
    }),
    {
        handleLoadMoreComments: studioCommentActions.getTopLevelComments,
        handleNewComment: studioCommentActions.addNewComment
    }
)(StudioComments);
