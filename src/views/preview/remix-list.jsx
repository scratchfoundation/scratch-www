const React = require('react');
const PropTypes = require('prop-types');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const ThumbnailColumn = require('../../components/thumbnailcolumn/thumbnailcolumn.jsx');
const projectShape = require('./projectshape.jsx').projectShape;

const RemixList = props => {
    const remixes = props.remixes;
    if (remixes.length === 0) return null;
    return (
        <FlexRow className="remix-list">
            <div className="project-title">
                Remixes
            </div>
            {remixes.length === 0 ? (
                // TODO: style remix invitation
                <span>Invite user to remix</span>
            ) : (
                <ThumbnailColumn
                    cards
                    showAvatar
                    itemType="preview"
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
    remixes: PropTypes.arrayOf(projectShape)
};

module.exports = RemixList;
