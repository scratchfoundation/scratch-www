const React = require('react');
const PropTypes = require('prop-types');
const FormattedMessage = require('react-intl').FormattedMessage;
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const ThumbnailColumn = require('../../components/thumbnailcolumn/thumbnailcolumn.jsx');
const projectShape = require('./projectshape.jsx').projectShape;

const RemixList = props => {
    const remixes = props.remixes;
    if (remixes.length === 0) return null;
    return (
        <FlexRow className="remix-list">
            <div className="list-header">
                <div className="list-title">
                    <FormattedMessage id="project.remixes" />
                </div>
                <div className="list-header-spacer" />
                <div className="list-header-link">
                    <a href={`/projects/${props.projectId}/remixes`}>
                        <FormattedMessage id="project.viewAllInList" />
                    </a>
                </div>
            </div>
            {remixes.length === 0 ? (
                // TODO: style remix invitation
                <FormattedMessage id="project.inviteToRemix" />
            ) : (
                <ThumbnailColumn
                    cards
                    showAvatar
                    itemType="projects"
                    items={remixes.slice(0, 5)}
                    showFavorites={false}
                    showLoves={false}
                    showViews={false}
                />
            )}
        </FlexRow>
    );
};

RemixList.propTypes = {
    projectId: PropTypes.string,
    remixes: PropTypes.arrayOf(projectShape)
};

module.exports = RemixList;
