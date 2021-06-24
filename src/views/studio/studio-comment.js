import {connect} from 'react-redux';
import Comment from '../preview/comment/comment.jsx';

import {
    selectCanDeleteComment,
    selectCanReportComment,
    selectShowCommentComposer
} from '../../redux/studio-permissions';
import {selectStudioCommentsAllowed} from '../../redux/studio.js';

export default connect(
    (state, ownProps) => ({
        canReport: selectCanReportComment(state, ownProps.author.username),
        canDelete: selectCanDeleteComment(state, ownProps.author.username),
        canReply: selectShowCommentComposer(state) && selectStudioCommentsAllowed(state)
    })
)(Comment);
