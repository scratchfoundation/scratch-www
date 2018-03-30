const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const Thumbnail = require('../thumbnail/thumbnail.jsx');
const FlexRow = require('../flex-row/flex-row.jsx');

require('./grid.scss');

const Grid = props => (
    <div className={classNames('grid', props.className)}>
        <FlexRow>
            {props.items.map((item, key) => {
                const href = `/${props.itemType}/${item.id}/`;
                if (props.itemType === 'projects') {
                    return (
                        <Thumbnail
                            avatar={`https://cdn2.scratch.mit.edu/get_image/user/${item.author.id}_32x32.png`}
                            creator={item.author.username}
                            favorites={item.stats.favorites}
                            href={href}
                            isUpsideDown={props.isUpsideDown}
                            key={key}
                            loves={item.stats.loves}
                            remixes={item.stats.remixes}
                            showAvatar={props.showAvatar}
                            showFavorites={props.showFavorites}
                            showLoves={props.showLoves}
                            showRemixes={props.showRemixes}
                            showViews={props.showViews}
                            src={item.image}
                            title={item.title}
                            type={'project'}
                            views={item.stats.views}
                        />
                    );
                }
                return (
                    <Thumbnail
                        href={href}
                        isUpsideDown={props.isUpsideDown}
                        key={key}
                        owner={item.owner}
                        src={item.image}
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
    isUpsideDown: PropTypes.bool,
    itemType: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object)
};

Grid.defaultProps = {
    items: require('./grid.json'),
    itemType: 'projects',
    showLoves: false,
    showFavorites: false,
    showRemixes: false,
    showViews: false,
    showAvatar: false
};

module.exports = Grid;
