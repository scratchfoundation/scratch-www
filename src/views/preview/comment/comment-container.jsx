const React = require('react');
const PropTypes = require('prop-types');
const api = require('../../../lib/api');
const log = require('../../../lib/log');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Comment = require('./comment.jsx');

require('./comment.scss');

class CommentContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
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
                        className="replies column"
                        key={id} // eslint-disable-line camelcase
                    >
                        {this.state.replies.map(reply => (
                            <Comment
                                {...reply}
                                key={reply.id}
                            />
                        ))}
                    </FlexRow>
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
