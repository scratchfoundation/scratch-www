const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const Thumbnail = require('../thumbnail/thumbnail.jsx');
const FlexRow = require('../flex-row/flex-row.jsx');
const thumbnailUrl = require('../../lib/user-thumbnail');

require('./grid.scss');

const Grid = ({
    className = '',
    itemType = 'projects',
    items = require('./grid.json'),
    showAvatar = false,
    showFavorites = false,
    showLoves = false,
    showRemixes = false,
    showViews = false
}) => (
    <div className={classNames('grid', className)}>
        <FlexRow>
            {items.map((item, key) => {
                const href = `/${itemType}/${item.id}/`;
                if (itemType === 'projects') {
                    return (
                        <Thumbnail
                            avatar={thumbnailUrl(item.author.id)}
                            creator={item.author.username}
                            favorites={item.stats.favorites}
                            href={href}
                            key={key}
                            loves={item.stats.loves}
                            remixes={item.stats.remixes}
                            showAvatar={showAvatar}
                            showFavorites={showFavorites}
                            showLoves={showLoves}
                            showRemixes={showRemixes}
                            showViews={showViews}
                            src={item.image}
                            title={item.title}
                            type={'project'}
                            views={item.stats.views}
                            alt={item.alt}
                        />
                    );
                }
                return (
                    <Thumbnail
                        href={href}
                        key={key}
                        owner={item.owner}
                        src={item.image}
                        alt={item.alt}
                        title={item.title}
                        type={'gallery'}
                    />
                );
            })}
        </FlexRow>
    </div>
);

Grid.propTypes = {
    className: PropTypes.string,
    itemType: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    showAvatar: PropTypes.bool,
    showFavorites: PropTypes.bool,
    showLoves: PropTypes.bool,
    showRemixes: PropTypes.bool,
    showViews: PropTypes.bool
};

module.exports = Grid;
