const React = require('react');
const PropTypes = require('prop-types');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const ThumbnailColumn = require('../../components/thumbnailcolumn/thumbnailcolumn.jsx');
const projectShape = require('./projectshape.jsx').projectShape;

const StudioList = props => {
    const studios = props.studios;
    if (studios.length === 0) return null;
    return (
        <FlexRow className="remix-list">
            <div className="project-title">
                Studios
            </div>
            {studios.length === 0 ? (
                // TODO: style remix invitation
                <span>Invite user to add to studio</span>
            ) : (
                <ThumbnailColumn
                    cards
                    showAvatar
                    itemType="studio"
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
    studios: PropTypes.arrayOf(projectShape)
};

module.exports = StudioList;
