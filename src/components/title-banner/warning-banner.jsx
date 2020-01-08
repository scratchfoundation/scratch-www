const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../flex-row/flex-row.jsx');
const TitleBanner = require('./title-banner.jsx');

require('./warning-banner.scss');

const WarningBanner = props => (
    <TitleBanner className="warning-banner">
        <FlexRow className="warning-banner-container">
            <p className="title-banner-p">
                {props.children}
            </p>
        </FlexRow>
    </TitleBanner>
);

WarningBanner.propTypes = {
    children: PropTypes.node
};

module.exports = injectIntl(WarningBanner);
