var classNames = require('classnames');
var React = require('react');

var Thumbnail = require('../thumbnail/thumbnail.jsx');
var FlexRow = require('../flex-row/flex-row.jsx');

require('./grid.scss');

var Grid = React.createClass({
    type: 'Grid',
    getDefaultProps: function () {
        return {
            items: require('./grid.json'),
            itemType: 'projects',
            showLoves: false,
            showFavorites: false,
            showRemixes: false,
            showViews: false
        };
    },
    render: function () {
        var classes = classNames(
            'grid',
            this.props.className
        );
        return (
            <div className={classes}>
                <FlexRow>
                    {this.props.items.map(function (item) {
                        var href = '/' + this.props.itemType + '/' + item.id + '/';

                        if (this.props.itemType == 'projects') {
                            return (
                                <Thumbnail key={item.id}
                                           showLoves={this.props.showLoves}
                                           showFavorites={this.props.showFavorites}
                                           showRemixes={this.props.showRemixes}
                                           showViews={this.props.showViews}
                                           type={'project'}
                                           href={href}
                                           title={item.title}
                                           src={item.image}
                                           creator={item.author.username}
                                           loves={item.stats.loves}
                                           favorites={item.stats.favorites}
                                           remixes={item.stats.remixes}
                                           views={item.stats.views}  />
                            );
                        }
                        else {
                            return (
                                <Thumbnail key={item.id}
                                           type={'gallery'}
                                           href={href}
                                           title={item.title}
                                           src={item.image}
                                           owner={item.owner}  />
                            );
                        }
                    }.bind(this))}
                </FlexRow>
            </div>
        );
    }
});

module.exports = Grid;
