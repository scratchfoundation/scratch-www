var classNames = require('classnames');
var defaults = require('lodash.defaults');
var React = require('react');
var Slider = require('react-slick');

var Thumbnail = require('../thumbnail/thumbnail.jsx');

require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');
require('./tipsslider.scss');

var TipsSlider = React.createClass({
    type: 'TipsSlider',
    propTypes: {
        items: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            items: require('./tipsslider.json'),
            showRemixes: false,
            showLoves: false
        };
    },
    render: function () {
        console.error("ITEMS:");
        console.error(this.props.items);
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
        
        var classes = classNames(
            'tipsslider',
            this.props.className
        );
        
        var slides = [];
        console.error("before");
        console.error(this.props.items.length);
        for (var i=0; i < this.props.items.length; i++) {
            var items = this.props.items[i].tips;
            console.error("bla");
            console.error(items);
            var thumbnails = [];
            for (var j=0; j < items.length; j++) {
                    var item = items[j];
                    thumbnails.push(<Thumbnail key={item.id}
                               title={item.title}
                               src={item.thumbnailUrl} />)
            }
            console.error(thumbnails)
            slides.push(
            <div className="testing">
                <h3>{this.props.items[i].title}</h3>
                {thumbnails}
            </div>)
        } 
        console.error("slides")
        console.error(slides[0]);        
        return (
            <Slider className={classes} arrows={arrows} {... settings}>
                {slides}    
            </Slider>
        );
    }
});

module.exports = TipsSlider;
