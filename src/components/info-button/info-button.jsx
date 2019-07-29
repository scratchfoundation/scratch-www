const PropTypes = require('prop-types');
const React = require('react');

require('./info-button.scss');

const InfoButton = ({
    message
}) => (
    <div className="info-button">
        ?
    </div>
);

InfoButton.propTypes = {
    message: PropTypes.string,
};

module.exports = InfoButton;
