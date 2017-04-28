var FormattedMessage = require('react-intl').FormattedMessage;
var injectIntl = require('react-intl').injectIntl;
var React = require('react');

var FlexRow = require('../../../components/flex-row/flex-row.jsx');
var TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('../../../components/forms/button.scss');
require('./birthday-banner.scss');

var AnniversaryBanner = injectIntl(React.createClass({
    render: function () {
        return (
            <TitleBanner className="mod-splash-tenth">
                <FlexRow className="banner-tenth inner">
                    <FlexRow className="banner-tenth-content">
                        <div className="banner-tenth-content-text">
                            <h2 className="h2 mod-white"><FormattedMessage id='splash.birthdayHeader' /></h2>
                            <p className="p mod-white"><FormattedMessage id='splash.birthdayMessage' /></p>
                        </div>
                        <FlexRow className="banner-tenth-content-buttons">
                            <a href="/studios/3959153/" className="button white mod-tenth-banner">
                                <FormattedMessage id='splash.examples' />
                            </a>
                            <a href="#" className="button white mod-tenth-banner">
                                <FormattedMessage id='splash.makeCard' />
                            </a>
                        </FlexRow>
                    </FlexRow>
                    <img
                        className="banner-image mod-tenth"
                        src="/images/splash/tenth-party.png"
                        alt="Balloons"
                    />
                </FlexRow>
            </TitleBanner>
        );
    }
}));

module.exports = AnniversaryBanner;
