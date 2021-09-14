const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const StudioCommentsNotAllowed = () => (
    <div className="studio-comments-not-allowed">
        <FormattedMessage id="studio.turnedOff" />
    </div>
);

module.exports = StudioCommentsNotAllowed;
