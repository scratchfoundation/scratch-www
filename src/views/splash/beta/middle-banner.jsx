const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./middle-banner.scss');

const MiddleBanner = () => (
    <TitleBanner className="beta-middle-banner">
        <FlexRow>
            <a
                className="call-to-action button"
                href="https://beta.scratch.mit.edu/"
            >Call to Action</a>
        </FlexRow>
    </TitleBanner>
);

export default MiddleBanner;
