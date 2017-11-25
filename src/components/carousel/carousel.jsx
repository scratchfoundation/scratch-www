import classNames from 'classnames';
import defaults from 'lodash.defaults';
import React from 'react';
import Slider from 'react-slick';

import Thumbnail from '../thumbnail/thumbnail.jsx';

import frameless from '../../lib/frameless.js';

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
            showLoves: false,
            type: 'project'
        };
    },
    render: function () {
        var settings = this.props.settings || {};
        defaults(settings, {
            centerMode: false,
            dots: false,
            infinite: false,
            lazyLoad: true,
            slidesToShow: 5,
            slidesToScroll: 5,
            variableWidth: true,
            responsive: [
                {breakpoint: frameless.mobile, settings: {
                    arrows: true,
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    centerMode: true
                }},
                {breakpoint: frameless.tablet, settings: {
                    slidesToScroll: 2,
                    slidesToShow: 2
                }},
                {breakpoint: frameless.desktop, settings: {
                    slidesToScroll: 4,
                    slidesToShow: 4
                }}
            ]
        });
        var arrows = this.props.items.length > settings.slidesToShow;
        var classes = classNames(
            'carousel',
            this.props.className
        );
        return (
            <Slider className={classes} arrows={arrows} {... settings}>
                {this.props.items.map(function (item) {
                    var href = '';
                    switch (this.props.type) {
                    case 'gallery':
                        href = '/studios/' + item.id + '/';
                        break;
                    case 'project':
                        href = '/projects/' + item.id + '/';
                        break;
                    default:
                        href = '/' + item.type + '/' + item.id + '/';
                    }

                    return (
                        <Thumbnail key={[this.key, item.id].join('.')}
                                   showLoves={this.props.showLoves}
                                   showRemixes={this.props.showRemixes}
                                   type={this.props.type}
                                   href={href}
                                   title={item.title}
                                   src={item.image}
                                   creator={item.author.username}
                                   remixes={item.stats.remixes}
                                   loves={item.stats.loves} />
                    );
                }.bind(this))}
            </Slider>
        );
    }
});

export default Carousel;
