import React, {useEffect, useCallback} from 'react';
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
    getTopLevelComments,
    handleNewComment,
    moreCommentsToLoad,
    replies,
    shouldShowCommentComposer
}) => {
    const {studioId} = useParams();

    const handleLoadComments = useCallback(() => {
        getTopLevelComments(studioId, comments.length);
    }, [studioId, comments.length]);

    useEffect(() => {
        if (comments.length === 0) getTopLevelComments(studioId, 0);
    }, [studioId]);

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
                        onClick={handleLoadComments}
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
    getTopLevelComments: PropTypes.func,
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
        getTopLevelComments: studioCommentActions.getTopLevelComments,
        handleNewComment: studioCommentActions.addNewComment
    }
)(StudioComments);
