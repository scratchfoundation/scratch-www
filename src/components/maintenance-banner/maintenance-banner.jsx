const React = require('react');
const {useState, useCallback} = React;
const PropTypes = require('prop-types');
const {FormattedMessage, useIntl} = require('react-intl');
const TitleBanner = require('../title-banner/title-banner.jsx');
const Button = require('../forms/button.jsx');
const externalLinks = require('../../lib/external-links.js');
const {dismissMaintenanceBanner, isMaintenanceBannerDismissed} = require('../../lib/maintenance-banner.js');

require('./maintenance-banner.scss');

const MAINTENANCE_START_TIME = Date.parse('2026-11-20T12:00:00Z'); // Nov 20 2026 7:00 AM ET
const MAINTENANCE_FORUM_TOPIC_URL = 'https://scratch.mit.edu/discuss/topic/914130/';

const MaintenanceBanner = ({username}) => {
    const intl = useIntl();
    const [shouldShowBanner, setShouldShowBanner] = useState(
        () => !isMaintenanceBannerDismissed(username)
    );

    const handleCloseBanner = useCallback(() => {
        setShouldShowBanner(false);
        dismissMaintenanceBanner(username);
    }, [username]);

    if (!shouldShowBanner || Date.now() >= MAINTENANCE_START_TIME) {
        return null;
    }

    return (<TitleBanner className="maintenance-banner">
        <div className="maintenance-banner-container">
            <p className="maintenance-banner-description">
                <FormattedMessage
                    id="maintenanceBanner.description"
                    values={{
                        a: chunks => (<a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={externalLinks.scratchFoundation.tools}
                        >{chunks}</a>),
                        learnMore: chunks => (<a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={MAINTENANCE_FORUM_TOPIC_URL}
                        >{chunks}</a>)
                    }}
                />
            </p>
            <Button
                className="maintenance-banner-close-button"
                name="close-button"
                onClick={handleCloseBanner}
            >
                <img
                    className="maintenance-banner-close-icon"
                    src="/svgs/banners/icon-close.svg"
                    alt={intl.formatMessage({id: 'general.close'})}
                />
            </Button>
        </div>
    </TitleBanner>);
};

MaintenanceBanner.propTypes = {
    username: PropTypes.string.isRequired
};

module.exports = MaintenanceBanner;
