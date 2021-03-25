import React, {useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import studioCommentActions from '../../redux/studio-comment-actions';
import TopLevelComment from '../preview/comment/top-level-comment.jsx';
import Button from '../../components/forms/button.jsx';

const StudioComments = ({
    isAdmin,
    token,
    comments,
    replies,
    moreCommentsToLoad,
    getTopLevelComments,
    getReplies
}) => {
    const {studioId} = useParams();

    // useCallback creates a stable function reference based on the given dependencies
    // Ensures there won't be extra re-renders caused by anonymous functions
    const onLoadMore = useCallback(() => {
        getTopLevelComments(studioId, comments.length, isAdmin, token);
    }, [studioId, comments.length, isAdmin, token]);

    const onLoadMoreReplies = useCallback((commentId, offset) => {
        getReplies(studioId, [commentId], offset, isAdmin, token);
    }, [studioId, isAdmin, token]);

    // Trigger initial load if comments are empty. Comments may not be empty if
    // the user is returning to the comments tab after visiting another tab.
    useEffect(() => {
        if (studioId && comments.length === 0) {
            onLoadMore();
        }
    }, [studioId, comments.length]);

    return (
        <div>
            <h2>Comments</h2>
            <div>
                {comments.map(comment => (
                    <TopLevelComment
                        author={comment.author}
                        content={comment.content}
                        datetimeCreated={comment.datetime_created}
                        id={comment.id}
                        key={comment.id}
                        moreRepliesToLoad={comment.moreRepliesToLoad}
                        parentId={comment.parent_id}
                        replies={replies && replies[comment.id] ? replies[comment.id] : []}
                        visibility={comment.visibility}
                        onLoadMoreReplies={onLoadMoreReplies}
                    />
                ))}
                {moreCommentsToLoad &&
                    <Button
                        className="button load-more-button"
                        onClick={onLoadMore}
                    >
                        Load more
                    </Button>
                }
            </div>
        </div>
    );
};

StudioComments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    isAdmin: PropTypes.bool,
    token: PropTypes.string,
    replies: PropTypes.objectOf(PropTypes.array),
    moreCommentsToLoad: PropTypes.bool,
    getTopLevelComments: PropTypes.func,
    getReplies: PropTypes.func
};

export default connect(
    state => ({
        studioId: state.studio.id,
        comments: state.comments.comments,
        replies: state.comments.replies,
        moreCommentsToLoad: state.comments.moreCommentsToLoad,
        isAdmin: state.permissions.admin,
        token: state.session.session.user && state.session.session.user.token
    }),
    // mapDispatch can take an object, will automatically bind dispatch
    studioCommentActions
)(StudioComments);
