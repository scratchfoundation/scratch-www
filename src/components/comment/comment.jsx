var classNames = require('classnames');
var FormattedRelative = require('react-intl').FormattedRelative;
var React = require('react');

var EmojiText = require('../emoji-text/emoji-text.jsx');

require('./comment.scss');

var CommentText = React.createClass({
    type: 'CommentText',
    propTypes: {
        comment: React.PropTypes.string.isRequired,
        datetimeCreated: React.PropTypes.string,
        className: React.PropTypes.string
    },
    render: function () {
        var classes = classNames(
            'comment-text',
            this.props.class
        );
        return (
            <div className={classes}>
                <EmojiText className="mod-comment" text={this.props.comment} />
                {typeof this.props.datetimeCreated !== 'undefined' ? [
                    <p className="comment-text-timestamp">
                        <FormattedRelative value={new Date(this.props.datetimeCreated)} />
                    </p>
                ] : []}
            </div>
        );
    }
});

module.exports = CommentText;
