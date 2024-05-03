const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const EmojiText = require('../emoji-text/emoji-text.jsx');

require('./comment.scss');

const CommentText = props => (
    <div className={classNames('comment-text', props.className)}>
        <EmojiText
            className="mod-comment"
            text={props.comment}
        />
    </div>
);

CommentText.propTypes = {
    className: PropTypes.string,
    comment: PropTypes.string.isRequired
};

module.exports = CommentText;
