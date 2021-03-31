import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import Button from '../../components/forms/button.jsx';
import ComposeComment from '../preview/comment/compose-comment.jsx';
import TopLevelComment from '../preview/comment/top-level-comment.jsx';
import studioCommentActions from '../../redux/studio-comment-actions.js';

const StudioComments = props => {
    const {studioId} = useParams();
    useEffect(() => {
        if (props.comments.length === 0) props.getTopLevelComments(studioId, 0);
    }, [studioId]);
    return (
        <div>
            <h2>Comments</h2>
            <div>
                {props.isLoggedIn ? <ComposeComment
                    postURI={`/proxy/comments/studio/${studioId}`}
                    // eslint-disable-next-line react/jsx-handler-names
                    onAddComment={props.addNewComment}
                /> : null}
                {props.comments.map(comment => (
                    <TopLevelComment
                        author={comment.author}
                        canReply={props.isLoggedIn}
                        content={comment.content}
                        datetimeCreated={comment.datetime_created}
                        id={comment.id}
                        key={comment.id}
                        moreRepliesToLoad={comment.moreRepliesToLoad}
                        parentId={comment.parent_id}
                        replies={props.replies && props.replies[comment.id] ? props.replies[comment.id] : []}
                        visibility={comment.visibility}
                    />
                ))}
                {props.moreCommentsToLoad &&
                <Button
                    className="button load-more-button"
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => props.getTopLevelComments(studioId, props.comments.length)}
                >
                    <FormattedMessage id="general.loadMore" />
                </Button>
                }
            </div>
            <p>Studio {studioId}</p>
        </div>
    );
};

StudioComments.propTypes = {
    addNewComment: PropTypes.func,
    comments: PropTypes.arrayOf(PropTypes.shape({})),
    getTopLevelComments: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    moreCommentsToLoad: PropTypes.bool,
    replies: PropTypes.shape({})
};


export default connect(
    state => ({
        isLoggedIn: !!state.session.session.user,
        ...state.comments
    }),
    {
        addNewComment: studioCommentActions.addNewComment,
        getTopLevelComments: studioCommentActions.getTopLevelComments
    }
)(StudioComments);
