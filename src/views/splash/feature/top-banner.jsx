const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');
const PropTypes = require('prop-types');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./top-banner.scss');

const TopBanner = props => (
    <TitleBanner className="feature-top-banner">
        <FlexRow className="feature-top-container column">
            <h1 className="feature-header">
                <FormattedMessage id="featureBanner.title" />
            </h1>
            {/* <h3 className="feature-copy">
                <FormattedMessage id="featureBanner.subtitle" />
            </h3> */}
            <a
                className="feature-call-to-action button"
                href={props.actionLink}
            >
                {/* <FormattedMessage id="featureBanner.callToAction" /> */}
                <FormattedMessage id="intro.startCreating" />
            </a>
        </FlexRow>
        <div className="feature-banner-images">
            <div className="feature-banner-image left">
                <img src="/svgs/feature/illustration-left.svg" />
            </div>
            <div className="feature-banner-image right">
                <img src="/svgs/feature/illustration-right.svg" />
            </div>
        </div>
    </TitleBanner>
);

TopBanner.propTypes = {
    actionLink: PropTypes.string
};

TopBanner.defaultProps = {
    actionLink: 'https://scratch.mit.edu'
};

module.exports = injectIntl(TopBanner);
