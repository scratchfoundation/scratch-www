const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

require('./unsupported-browser.scss');

const UnsupportedBrowser = () => (
    <div className="unsupported-browser">
        <div className="content" >
            <div className="illustration" />
            <div className="body">
                <h2>
                    <FormattedMessage id="general.unsupportedBrowser" />
                </h2>
                <p>
                    <FormattedMessage id="general.unsupportedBrowserDescription" />
                </p>

                <div className="button-row">
                    { /* eslint-disable react/jsx-no-bind */ }
                    <button
                        className="back-button"
                        onClick={
                            () => (window.history.back())
                        }
                    >
                        <FormattedMessage id="general.back" />
                    </button>
                    { /* eslint-enable react/jsx-no-bind */ }

                </div>
                <div className="faq-link-text">
                    <FormattedMessage
                        id="general.3faq"
                        values={{
                            faqLink: (
                                <a
                                    className="faq-link"
                                    href="/info/faq"
                                >
                                    <FormattedMessage id="general.faq" />
                                </a>
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    </div>
);

module.exports = UnsupportedBrowser;
