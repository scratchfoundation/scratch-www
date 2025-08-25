const classNames = require('classnames');
const defaults = require('lodash.defaults');
const PropTypes = require('prop-types');
const React = require('react');
const Slider = require('react-slick').default;

const Thumbnail = require('../thumbnail/thumbnail.jsx');

require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');
require('./nestedcarousel.scss');

const defaultItems = require('./nestedcarousel.json');


/*
    NestedCarousel is used to show a carousel, where each slide is composed of a few
    thumbnails (for example, to show step-by-syep tips, where each stage has a few steps).
    It creates the thumbnails without links.

    Each slide has a title, and then a list of thumbnails, that will be shown together.
*/
const NestedCarousel = ({
    className,
    items = defaultItems,
    settings = {}
}) => {
    defaults(settings, {
        dots: true,
        infinite: false,
        lazyLoad: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false
    });
    const arrows = items.length > settings.slidesToShow;
    const stages = [];

    for (let i = 0; i < items.length; i++) {
        const thumbnails = items[i].thumbnails.map((item, j) => (
            <Thumbnail
                key={`inner_${i}_${j}`}
                linkTitle={false}
                src={item.thumbnailUrl}
                title={item.title}
            />
        ));

        stages.push(
            <div key={`outer_${i}`}>
                <h3>{items[i].title}</h3>
                {thumbnails}
            </div>
        );
    }

    return (
        <Slider
            arrows={arrows}
            className={classNames('nestedcarousel', 'carousel', className)}
            {...settings}
        >
            {stages}
        </Slider>
    );
};

NestedCarousel.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    settings: PropTypes.shape({
        dots: PropTypes.bool,
        infinite: PropTypes.bool,
        lazyLoad: PropTypes.bool,
        slidesToShow: PropTypes.number,
        slidesToScroll: PropTypes.number,
        variableWidth: PropTypes.bool
    })
};

module.exports = NestedCarousel;
