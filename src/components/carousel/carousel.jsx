var defaults = require('lodash.defaults');
var React = require('react');
var Slider = require('react-slick');

var Thumbnail = require('../thumbnail/thumbnail.jsx');

require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');
require('./carousel.scss');

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
        var arrows = this.props.items.length > settings.slidesToShow;

        return (
            <Slider className={'carousel ' + this.props.className} arrows={arrows} {... settings}>
                {this.props.items.map(function (item) {
                    var href = '';
                    switch (item.type) {
                    case 'gallery':
                        href = '/studio/' + item.id + '/';
                        break;
                    case 'project':
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
                                   src={item.thumbnail_url}
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
