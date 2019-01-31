const classNames = require('classnames');
const defaults = require('lodash.defaults');
const PropTypes = require('prop-types');
const React = require('react');
const Slider = require('react-slick').default;
const Thumbnail = require('../thumbnail/thumbnail.jsx');

const frameless = require('../../lib/frameless.js');

require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');
require('./carousel.scss');

const Carousel = props => {
    defaults(props.settings, {
        centerMode: false,
        dots: false,
        infinite: false,
        lazyLoad: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        variableWidth: true,
        responsive: [
            {
                breakpoint: frameless.mobile,
                settings: {
                    arrows: true,
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    centerMode: true
                }
            },
            {
                breakpoint: frameless.mobileIntermediate,
                settings: {
                    slidesToScroll: 2,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: frameless.desktop,
                settings: {
                    slidesToScroll: 4,
                    slidesToShow: 4
                }
            }
        ]
    });
    const arrows = props.items.length > props.settings.slidesToShow;
    return (
        <Slider
            arrows={arrows}
            className={classNames('carousel', props.className)}
            {... props.settings}
        >
            {props.items.map(item => {
                let href = '';
                switch (props.type) {
                case 'gallery':
                    href = `/studios/${item.id}/`;
                    break;
                case 'project':
                    href = `/projects/${item.id}/`;
                    break;
                default:
                    href = `/${item.type}/${item.id}/`;
                }

                return (
                    <Thumbnail
                        creator={item.author.username}
                        href={href}
                        key={[props.type, item.id].join('.')}
                        loves={item.stats.loves}
                        remixes={item.stats.remixes}
                        showLoves={props.showLoves}
                        showRemixes={props.showRemixes}
                        src={item.image}
                        title={item.title}
                        type={props.type}
                    />
                );
            })}
        </Slider>
    );
};

Carousel.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.any),
    settings: PropTypes.shape({
        centerMode: PropTypes.bool,
        dots: PropTypes.bool,
        infinite: PropTypes.bool,
        lazyLoad: PropTypes.bool,
        slidesToShow: PropTypes.number,
        slidesToScroll: PropTypes.number,
        variableWidth: PropTypes.bool,
        responsive: PropTypes.array
    }),
    showLoves: PropTypes.bool,
    showRemixes: PropTypes.bool,
    type: PropTypes.string
};

Carousel.defaultProps = {
    items: require('./carousel.json'),
    settings: {},
    showRemixes: false,
    showLoves: false,
    type: 'project'
};

module.exports = Carousel;
