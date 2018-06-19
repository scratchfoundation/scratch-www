const PropTypes = require('prop-types');
const React = require('react');
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
                        This project is not shared — so only you can see it. Click share to let everyone see it!
                    </span>
                    <Button className="button share-button">
                        Share
                    </Button>
                </FlexRow>
            </div>
        </div>
    );
};

ShareBanner.propTypes = {
    shared: PropTypes.bool.isRequired
};

module.exports = ShareBanner;
