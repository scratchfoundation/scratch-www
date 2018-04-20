const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const ThumbnailColumn = require('../../components/thumbnailcolumn/thumbnailcolumn.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./remixlist.scss');

/*
 * Container for a list of project remixes
 */
const RemixList = props => (
    <FlexRow className={classNames('remix-list', props.className)}>
        <h1>Remixes</h1>
        {props.items.length === 0 ? (
            <span>No remixes</span>
        ) : (
            <ThumbnailColumn
                cards
                showAvatar
                itemType="preview"
                items={props.items.slice(0, 5)}
                showFavorites={false}
                showLoves={false}
                showViews={false}
            />
        )}
    </FlexRow>
);

RemixList.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

module.exports = RemixList;
