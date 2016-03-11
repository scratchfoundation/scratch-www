var classNames = require('classnames');
var defaults = require('lodash.defaults');
var React = require('react');
var Slider = require('react-slick');

var Thumbnail = require('../thumbnail/thumbnail.jsx');

require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');
require('./nestedcarousel.scss');


{/*
    NestedCarousel is used to show a carousel, where each slide is composed of a few
    thumbnails (for example, to show step-by-syep tips, where each stage has a few steps).
    It creates the thumbnails without links.

    Each slide has a title, and then a list of thumbnails, that will be shown together.
*/}
var NestedCarousel = React.createClass({
    type: 'NestedCarousel',
    propTypes: {
        items: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            items: require('./nestedcarousel.json')
        };
    },
    render: function () {
        var settings = this.props.settings || {};
        defaults(settings, {
            dots: true,
            infinite: false,
            lazyLoad: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: false
        });
        
        var arrows = this.props.items.length > settings.slidesToShow;
        
        var classes = classNames(
            'nestedcarousel',
            'carousel',
            this.props.className
        );
        
        var stages = [];
        for (var i=0; i < this.props.items.length; i++) {
            var items = this.props.items[i].thumbnails;
            var thumbnails = [];
            for (var j=0; j < items.length; j++) {
                var item = items[j];
                thumbnails.push(
                    <Thumbnail key={'inner_' + i + '_' + j}
                               title={item.title}
                               src={item.thumbnailUrl}
                               linkTitle = {false} />);
            }
            stages.push(
            <div key={'outer_' + i}>
                <h3>{this.props.items[i].title}</h3>
                {thumbnails}
            </div>);
        }
        return (
            <Slider className={classes} arrows={arrows} {... settings}>
                {stages}
            </Slider>
        );
    }
});

module.exports = NestedCarousel;
