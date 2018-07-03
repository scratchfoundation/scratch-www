const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./top-banner.scss');

const TopBanner = () => (
    <TitleBanner className="beta-top-banner">
        <div className="beta-header-image left">
            <img src="/images/beta/left-illustration.png" />
        </div>
        <FlexRow className="beta-top-container column">
            <h1 className="beta-header">The Next Generation of Scratch</h1>
            <h3 className="beta-copy">Try out the beta version of Scratch 3.0</h3>
            <a
                className="beta-try-it button"
                href="https://beta.scratch.mit.edu/"
            >Try it!</a>
        </FlexRow>
        <div className="beta-header-image right">
            <img src="/images/beta/right-illustration.png" />
        </div>
    </TitleBanner>
);

export default TopBanner;
