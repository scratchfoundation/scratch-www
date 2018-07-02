const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./middle-banner.scss');

const MiddleBanner = () => (
    <TitleBanner className="beta-middle-banner">
        <FlexRow className="beta-middle-container column">
            <h2 className="beta-header">The Next Generation of Scratch</h2>
            <h3 className="beta-copy">Try out the beta version of Scratch 3.0</h3>
            <a
                className="beta-try-it button"
                href="https://beta.scratch.mit.edu/"
            >Try it!</a>
        </FlexRow>
    </TitleBanner>
);

export default MiddleBanner;
