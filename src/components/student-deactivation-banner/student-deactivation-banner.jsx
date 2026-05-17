const React = require('react');
const {useState, useCallback} = React;
const PropTypes = require('prop-types');
const {FormattedMessage, useIntl} = require('react-intl');
const TitleBanner = require('../title-banner/title-banner.jsx');
const Button = require('../forms/button.jsx');
const externalLinks = require('../../lib/external-links.js');
const {getLocalStorageValue, setLocalStorageValue} = require('../../lib/local-storage.js');

require('./student-deactivation-banner.scss');

const updateLocalStorage = (username = 'guest') => {
    setLocalStorageValue('shouldShowStudentDeactivationBanner', username, false);
};

const shouldShowStudentDeactivationBanner = (username = 'guest') =>
    getLocalStorageValue('shouldShowStudentDeactivationBanner', username) !== false;

const StudentDeactivationBanner = ({username}) => {
    const intl = useIntl();
    const shouldShowStudentDeactivationBannerValue = shouldShowStudentDeactivationBanner(username);
    const [shouldShowBanner, setShouldShowBanner] = useState(shouldShowStudentDeactivationBannerValue);
    
    const handleCloseBanner = useCallback(() => {
        setShouldShowBanner(false);
        updateLocalStorage(username);
    }, [setShouldShowBanner, username]);

    if (!shouldShowBanner) {
        return null;
    }

    return (<TitleBanner className="student-deactivation-banner">
        <div className="student-deactivation-container">
            <div className="student-deactivation-content">
                <h2 className="student-deactivation-title">
                    <FormattedMessage id="studentDeactivationBanner.title" />
                </h2>
                <p className="student-deactivation-description">
                    <FormattedMessage
                        id="studentDeactivationBanner.description"
                        values={{
                            a: chunks => (<a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={externalLinks.scratchHelpDesk.studentAccountsArticle}
                            >{chunks}</a>)
                        }}
                    />
                </p>
            </div>
            <Button
                className="student-deactivation-close-button"
                name="close-button"
                onClick={handleCloseBanner}
            >
                <img
                    className="student-deactivation-close-icon"
                    src="/svgs/banners/icon-close.svg"
                    alt={intl.formatMessage({id: 'general.close'})}
                />
            </Button>
        </div>
    </TitleBanner>);
};

StudentDeactivationBanner.propTypes = {
    username: PropTypes.string
};

module.exports = StudentDeactivationBanner;
