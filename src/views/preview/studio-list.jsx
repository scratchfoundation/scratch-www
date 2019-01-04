const React = require('react');
const PropTypes = require('prop-types');
const FormattedMessage = require('react-intl').FormattedMessage;
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const ThumbnailColumn = require('../../components/thumbnailcolumn/thumbnailcolumn.jsx');
const projectShape = require('./projectshape.jsx').projectShape;

const StudioList = props => {
    const studios = props.studios;
    if (studios.length === 0) return null;
    return (
        <FlexRow className="studio-list">
            <div className="list-header">
                <div className="list-title">
                    <FormattedMessage id="general.studios" />
                </div>
                <div className="list-header-spacer" />
                <div className="list-header-link">
                    <a href={`/projects/${props.projectId}/studios`}>
                        <FormattedMessage id="project.viewAllInList" />
                    </a>
                </div>
            </div>
            {studios.length === 0 ? (
                // TODO: style remix invitation
                <FormattedMessage id="addToStudio.inviteUser" />
            ) : (
                <ThumbnailColumn
                    cards
                    showAvatar
                    itemType="studios"
                    items={studios.slice(0, 5)}
                    showFavorites={false}
                    showLoves={false}
                    showViews={false}
                />
            )}
        </FlexRow>
    );
};

StudioList.propTypes = {
    projectId: PropTypes.string,
    studios: PropTypes.arrayOf(projectShape)
};

module.exports = StudioList;
