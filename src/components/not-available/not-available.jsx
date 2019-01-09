const React = require('react');
const Helmet = require('react-helmet').default;
const FormattedMessage = require('react-intl').FormattedMessage;
const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./not-available.scss');

const ProjectNotAvailable = () => (
    <React.Fragment>
        <Helmet>
            <title>Scratch - Imagine, Program, Share</title>
        </Helmet>
        <div className="not-available-outer">
            <FlexRow className="inner">
                <img
                    className="not-available-image"
                    src="/images/404-giga.png"
                />
                <h1>
                    <FormattedMessage id="general.notAvailableHeadline" />
                </h1>
                <p>
                    <FormattedMessage id="general.notAvailableSubtitle" />
                </p>
            </FlexRow>
        </div>
    </React.Fragment>
);

module.exports = ProjectNotAvailable;
