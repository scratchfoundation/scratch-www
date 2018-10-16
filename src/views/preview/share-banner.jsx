const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');

require('./share-banner.scss');

const ShareBanner = ({onShare}) => (
    <div className="share-banner-outer">
        <FlexRow className="inner share-banner">
            <span className="share-text">
                <FormattedMessage id="preview.share.notShared" />
            </span>
            <Button
                className="button share-button"
                onClick={onShare}
            >
                <FormattedMessage id="preview.share.shareButton" />
            </Button>
        </FlexRow>
    </div>
);

ShareBanner.propTypes = {
    onShare: PropTypes.func
};

module.exports = ShareBanner;
