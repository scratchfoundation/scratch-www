const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./outage-banner.scss');
const OutageBanner = () => {
    const downloadLink = chunks => <a href="/download">{chunks}</a>;
    return (
        <TitleBanner className="outage-banner">
            <div className="outage-banner-container">
                <img
                    aria-hidden="true"
                    alt=""
                    className="icon"
                    src="/images/ideas/bulb-icon.svg"
                />
                <div className="outage-banner-centered">
                    <p className="outage-banner-text">
                        <FormattedMessage
                            id="outageBanner.details"
                            values={{
                                download: downloadLink
                            }}
                        />
                    </p>
                </div>
            </div>
        </TitleBanner>
    );
};

module.exports = injectIntl(OutageBanner);
