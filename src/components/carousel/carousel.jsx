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

    render: function () {
        return (
            <Slider className="carousel" {... this.props.settings}>
                {this.props.items.map(function(item) {
                    return (
                        <Thumbnail key={item.id}
                                   href={'/projects/' + item.projectId + '/'}
                                   title={item.title}
                                   extra={'by ' + item.creator} />
                    );
                })}
            </Slider>
        );
    }
});
