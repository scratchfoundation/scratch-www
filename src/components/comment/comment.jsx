const classNames = require('classnames');
const FormattedRelative = require('react-intl').FormattedRelative;
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
        {typeof props.datetimeCreated === 'undefined' ? [] : [
            <p
                className="comment-text-timestamp"
                key="comment-text-timestamp"
            >
                <FormattedRelative value={new Date(props.datetimeCreated)} />
            </p>
        ]}
    </div>
);

CommentText.propTypes = {
    className: PropTypes.string,
    comment: PropTypes.string.isRequired,
    datetimeCreated: PropTypes.string
};

module.exports = CommentText;
