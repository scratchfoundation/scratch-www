const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
const FormattedMessage = require('react-intl').FormattedMessage;
require('./extension-chip.scss');

const ExtensionChip = props => (
    <div className={classNames('extension-chip', {'has-status': props.hasStatus})}>
        {props.iconURI &&
            <img
                className="extension-icon"
                src={props.iconURI}
            />
        }
        <div className="extension-content">
            {props.extensionL10n ?
                <FormattedMessage id={props.extensionL10n} /> :
                <span>{props.extensionName}</span>
            }
            {props.hasStatus && (
                <div className="extension-status">
                    <FormattedMessage id="project.needsConnection" />
                </div>
            )}
            {props.action && (
                <a href={props.action.uri}>
                    <div className="extension-action">
                        <FormattedMessage id={props.action.l10nId} />
                        <img src="/svgs/project/r-arrow.svg" />
                    </div>
                </a>
            )}
        </div>
    </div>
);

ExtensionChip.propTypes = {
    action: PropTypes.shape({
        l10nId: PropTypes.string,
        uri: PropTypes.string
    }),
    extensionL10n: PropTypes.string,
    extensionName: PropTypes.string,
    hasStatus: PropTypes.bool,
    iconURI: PropTypes.string
};

module.exports = ExtensionChip;
