var classNames = require('classnames');
var React = require('react');

var Thumbnail = require('../thumbnail/thumbnail.jsx');
var FlexRow = require('../flex-row/flex-row.jsx');

var api = require('../../lib/api');
require('./grid.scss');

var Grid = React.createClass({
    type: 'Grid',
    getDefaultProps: function () {
        return {
            items: require('./grid.json'),
            itemType: 'projects',
            explore: false,
            showLoves: false,
            showFavorites: false,
            showRemixes: false,
            showViews: false,
            showAvatar: false
        };
    },
    getAvatar: function (username) {
        var url = '';
        api({
            uri: '/users/' + username
        }, function (err, body) {
            this.url = body.profile.images['32x32'];
        }.bind(this));
        console.log(url);
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
                                           explore={this.props.explore}
                                           showLoves={this.props.showLoves}
                                           showFavorites={this.props.showFavorites}
                                           showRemixes={this.props.showRemixes}
                                           showViews={this.props.showViews}
                                           showAvatar={this.props.showAvatar}
                                           type={'project'}
                                           href={href}
                                           title={item.title}
                                           src={item.image}
                                           avatar={this.getAvatar(item.author.username)}
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
                                           explore={this.props.explore}
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
