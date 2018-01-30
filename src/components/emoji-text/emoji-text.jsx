const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./emoji-text.scss');

const EmojiText = props => (
    <props.as
        className={classNames('emoji-text', props.className)}
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: props.text
        }}
    />
);

EmojiText.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired
};

EmojiText.defaultProps = {
    as: 'p'
};

module.exports = EmojiText;
