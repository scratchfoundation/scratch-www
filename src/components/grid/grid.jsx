var classNames = require('classnames');
var React = require('react');

var Thumbnail = require('../thumbnail/thumbnail.jsx');

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
            showViews: false,
            perRow: 4
        };
    },
    getThumbnails: function () {
        return this.props.items.map(function (item) {
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
                               creator={item.creator}
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
                               src={item.thumbnail}
                               owner={item.owner}  />
                );
            }
        }.bind(this));
    },
    render: function () {
        var classes = classNames(
            'grid',
            this.props.className
        );
        var thumbnails = this.getThumbnails();
        var rows = [];
        for (var i = 0; i < thumbnails.length; i+=this.props.perRow) {
            var rowNext = thumbnails.slice(i,i+this.props.perRow);
            rows.push(
                <div className='rows'>
                    {rowNext}
                </div>
            );
        }
        return (
            <div className={classes}>
                {rows}
            </div>
        );
    }
});

module.exports = Grid;
