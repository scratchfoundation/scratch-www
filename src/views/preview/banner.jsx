const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');

require('./banner.scss');

const Banner = ({
    className,
    message,
    actionMessage,
    onAction,
    buttonActivated
}) => (
    <div className={classNames('banner-outer', className)}>
        <FlexRow className="inner banner-inner">
            <span className="banner-text">
                {message}
            </span>
            {actionMessage && onAction && (
                <Button
                    className={classNames('banner-button', {'banner-button-disabled': !buttonActivated})}
                    onClick={buttonActivated ? onAction : null}
                >
                    {actionMessage}
                </Button>
            )}
        </FlexRow>
    </div>
);

Banner.propTypes = {
    actionMessage: PropTypes.node,
    className: PropTypes.string,
    message: PropTypes.node.isRequired,
    onAction: PropTypes.func,
    buttonActivated: PropTypes.bool
};

module.exports = Banner;
