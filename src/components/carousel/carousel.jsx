var React = require('react');
var Slider = require('react-slick');
var Thumbnail = require('../thumbnail/thumbnail.jsx');

require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');
require('./carousel.scss');

module.exports = React.createClass({
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
    typeDimensions: {
        'project': [144, 108],
        'gallery': [170, 100]
    },
    render: function () {
        return (
            <Slider className={'carousel ' + this.props.className} {... this.props.settings}>
                {this.props.items.map(function (item) {
                    var thumbnailUrl = (
                        process.env.IMAGE_HOST + '/get_image/' + item.type + '/' + item.id + '_' +
                        this.typeDimensions[item.type][0] + 'x' + this.typeDimensions[item.type][1] + '.png' +
                        '?v=' + item.thumbnailVersion
                    );
                    var href = '';
                    switch (item.type) {
                    case 'gallery':
                        href = '/studio/' + item.id + '/';
                        break;
                    default:
                        href = '/' + item.type + '/' + item.id + '/';
                    }

                    return (
                        <Thumbnail key={item.id}
                                   type={item.type}
                                   href={href}
                                   title={item.title}
                                   src={thumbnailUrl}
                                   creator={item.creator}
                                   remixes={item.remixes}
                                   loves={item.loves} />
                    );
                }.bind(this))}
            </Slider>
        );
    }
});
