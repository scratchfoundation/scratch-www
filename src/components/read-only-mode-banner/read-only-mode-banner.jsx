const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

require('./read-only-mode-banner.scss');

const {READ_ONLY_MODE} = require('../../lib/feature-flags');

const bold = chunks => <strong>{chunks}</strong>;

const ReadOnlyModeBanner = ({className}) => {
    if (!READ_ONLY_MODE) return null;

    return (
        <div className={classNames('read-only-mode-banner', className)}>
            <div className="read-only-mode-banner-content">
                <p className="read-only-mode-banner-text">
                    <FormattedMessage
                        id="readOnlyMode.title"
                        values={{b: bold}}
                    />
                </p>
                <p className="read-only-mode-banner-text">
                    <FormattedMessage id="readOnlyMode.description1" />
                </p>
                <p className="read-only-mode-banner-text">
                    <FormattedMessage
                        id="readOnlyMode.description2"
                    />
                </p>
            </div>
        </div>
    );
};

ReadOnlyModeBanner.propTypes = {
    className: PropTypes.string
};

module.exports = ReadOnlyModeBanner;
