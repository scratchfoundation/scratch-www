const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./emoji-text.scss');

const EmojiText = ({
    as: Component = 'p',
    className,
    text
}) => (
    <Component
        className={classNames('emoji-text', className)}
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: text
        }}
    />
);

EmojiText.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    as: PropTypes.elementType
};

module.exports = EmojiText;
