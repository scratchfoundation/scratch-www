const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');

require('./share-banner.scss');

const ShareBanner = props => {
    if (props.shared) return null;
    return (
        <div className="shareBanner">
            <div className="inner">
                <FlexRow className="preview-row">
                    <span className="share-text">
                        <FormattedMessage id="preview.share.notShared" />
                    </span>
                    <Button
                        className="button share-button"
                        onClick={props.onShare}
                    >
                        <FormattedMessage id="preview.share.shareButton" />
                    </Button>
                </FlexRow>
            </div>
        </div>
    );
};

ShareBanner.propTypes = {
    onShare: PropTypes.func,
    shared: PropTypes.bool.isRequired
};

module.exports = ShareBanner;
