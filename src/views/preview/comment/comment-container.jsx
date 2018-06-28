const React = require('react');
const PropTypes = require('prop-types');
const api = require('../../../lib/api');
const log = require('../../../lib/log');
const bindAll = require('lodash.bindall');
const classNames = require('classnames');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Comment = require('./comment.jsx');

require('./comment.scss');

class CommentContainer extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleExpandThread'
        ]);
        this.state = {
            expanded: false,
            replies: []
        };
    }

    componentDidMount () {
        this.fetchReplies(this.props.id);
    }

    fetchReplies (id) {
        if (this.props.reply_count > 0) {
            api({
                uri: `/comments/project/${this.props.projectId}/${id}`
            }, (err, body) => {
                if (err) {
                    log.error(`Error fetching comment replies: ${err}`);
                    return;
                }
                if (typeof body === 'undefined') {
                    log.error('No comment reply information');
                    return;
                }
                this.setState({
                    replies: body
                });
            });
        }
    }

    handleExpandThread () {
        this.setState({
            expanded: true
        });
    }

    render () {
        const {
            author,
            content,
            datetime_created,
            id,
            reply_count
        } = this.props;

        return (
            <FlexRow className="comment-container">
                <Comment {...{author, content, datetime_created, id}} />
                {reply_count > 0 && // eslint-disable-line camelcase
                    <FlexRow
                        className={classNames(
                            'replies',
                            'column',
                            {collapsed: !this.state.expanded && this.state.replies.length > 3}
                        )}
                        key={id}
                    >
                        {(this.state.expanded ? this.state.replies : this.state.replies.slice(0, 3)).map(reply => (
                            <Comment
                                {...reply}
                                key={reply.id}
                            />
                        ))}
                    </FlexRow>
                }
                {!this.state.expanded && this.state.replies.length > 3 &&
                    <a
                        className="expand-thread"
                        onClick={this.handleExpandThread}
                    >See all {this.state.replies.length} replies</a>
                }
            </FlexRow>
        );
    }
}

CommentContainer.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        username: PropTypes.string
    }),
    content: PropTypes.string,
    datetime_created: PropTypes.string,
    id: PropTypes.number,
    parent_id: PropTypes.number,
    projectId: PropTypes.string,
    reply_count: PropTypes.number
};

export default CommentContainer;
