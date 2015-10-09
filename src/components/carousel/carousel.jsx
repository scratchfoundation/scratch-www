var React = require('react');
var Slider = require('react-slick');
var Thumbnail = require('../thumbnail/thumbnail.jsx');

require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');
require('./carousel.scss');

var Carousel = React.createClass({
    propTypes: {
        items: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            items: require('./carousel.json'),
            settings: {
                arrows: true,
                dots: false,
                infinite: false,
                lazyLoad: true,
                slidesToShow: 5,
                slidesToScroll: 5,
                variableWidth: true
            }
        };
    },
    render: function () {
        return (
            <Slider className={'carousel ' + this.props.className} {... this.props.settings}>
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
                                   type={item.type}
                                   href={href}
                                   title={item.title}
                                   src={item.thumbnailUrl}
                                   creator={item.creator}
                                   remixes={item.remixes}
                                   loves={item.loves} />
                    );
                })}
            </Slider>
        );
    }
});

module.exports = Carousel;
