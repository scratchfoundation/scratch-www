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
            variableWidth: true
        });
        
        var arrows = this.props.items.length > settings.slidesToShow;
        
        var classes = classNames(
            'tipsslider',
            this.props.className
        );
        
        var stages = [];
        for (var i=0; i < this.props.items.length; i++) {
            var items = this.props.items[i].tips;
            var thumbnails = [];
            for (var j=0; j < items.length; j++) {
                    var item = items[j];
                    thumbnails.push(<Thumbnail key={item.id}
                               title={item.title}
                               src={item.thumbnailUrl} />)
            }
            stages.push(
            <div className="testing" key={"stage_" + i}>
                <h3>{this.props.items[i].title}</h3>
                {thumbnails}
            </div>)
        } 
        return (
            <Slider className={classes} arrows={arrows} {... settings}>
                {stages}    
            </Slider>
        );
    }
});

module.exports = TipsSlider;
