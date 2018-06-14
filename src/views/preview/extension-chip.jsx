const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
require('./extension-chip.scss');

const ExtensionChip = props => (
    <div className={classNames('extension-chip', {'has-status': props.hasStatus})}>
        <img
            className="extension-icon"
            src={props.iconURI}
        />
        <div className="extension-content">
            <span>{props.extensionName}</span>
            {props.hasStatus && (
                <div className="extension-status">
                    Needs Connection
                </div>
            )}
        </div>
    </div>
);

ExtensionChip.propTypes = {
    extensionName: PropTypes.string,
    hasStatus: PropTypes.boolean,
    iconURI: PropTypes.string
};


module.exports = ExtensionChip;
