const React = require('react');
const bindAll = require('lodash.bindall');
const FormattedMessage = require('react-intl').FormattedMessage;

function StudioCommentsNotAllowed () {
    return (
        <div className="studio-comments-not-allowed">
            <FormattedMessage id="studio.commentsNotAllowed" />
        </div>
    )
}

module.exports = StudioCommentsNotAllowed;
