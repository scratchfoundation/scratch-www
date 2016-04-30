var classNames = require('classnames');
var defaults = require('lodash.defaults');
var React = require('react');
var Slider = require('react-slick');

var Thumbnail = require('../thumbnail/thumbnail.jsx');

require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');
require('./carousel.scss');

/**
 * Displays content in horizontal scrolling box. Example usage: splash page rows.
 */
var Carousel = React.createClass({
    type: 'Carousel',
    propTypes: {
        items: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            items: require('./carousel.json'),
            showRemixes: false,
            showLoves: false
        };
    },
    render: function () {
        var settings = this.props.settings || {};
        defaults(settings, {
            dots: false,
            infinite: false,
            lazyLoad: true,
            slidesToShow: 5,
            slidesToScroll: 5,
            variableWidth: true
        });
        var arrows = this.props.items.length > settings.slidesToShow && settings.slidesToScroll>0;
        var classes = classNames(
            'carousel',
            this.props.className
        );
        return (
            <Slider className={classes} arrows={arrows} {... settings}>
                {this.props.items.map(function (item) {
                    var href = '';
                    var thumbnail_url = item.thumbnail_url;
                    if (thumbnail_url==undefined && item.image!=undefined) {
                        thumbnail_url = item.image;
                    }
                    if (item.stats!=undefined) {
                        item.love_count = item.stats.loves;
                    }
                    switch (item.type) {
                    case 'gallery':
                        href = '/studios/' + item.id + '/';
                        break;
                    case 'project':
                        href = '/projects/' + item.id + '/';
                        break;
                    case undefined:
                        item.type = 'project';
                        href = '/projects/' + item.id + '/';
                        break;
                    default:
                        href = '/' + item.type + '/' + item.id + '/';
                    }

                    return (
                        <Thumbnail key={item.id}
                                   showLoves={this.props.showLoves}
                                   showRemixes={this.props.showRemixes}
                                   type={item.type}
                                   href={href}
                                   title={item.title}
                                   src={thumbnail_url}
                                   creator={item.creator}
                                   remixes={item.remixers_count}
                                   loves={item.love_count} />
                    );
                }.bind(this))}
            </Slider>
        );
    }
});

module.exports = Carousel;
