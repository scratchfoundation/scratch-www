const classNames = require('classnames');
const defaults = require('lodash.defaults');
const PropTypes = require('prop-types');
const React = require('react');
const Slider = require('react-slick').default;

const Thumbnail = require('../thumbnail/thumbnail.jsx');
const {frameless} = require('../../lib/frameless.js');
const {LABEL_TYPE} = require('../membership-label/membership-label.jsx');

require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');
require('./carousel.scss');

const Carousel = ({
    className,
    items = require('./carousel.json'),
    settings = {},
    showRemixes = false,
    showLoves = false,
    type = 'project',
    fromStarterProjectsPage = false
}) => {
    defaults(settings, {
        centerMode: false,
        dots: false,
        infinite: false,
        lazyLoad: true,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        variableWidth: true,
        responsive: [
            {
                breakpoint: frameless.mobile,
                settings: {
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

    return (
        <Slider
            className={classNames('carousel', className)}
            {...settings}
        >
            {items.map(item => {
                let href = '';
                switch (type) {
                case 'gallery':
                    href = `/studios/${item.id}/`;
                    break;
                case 'project':
                    href = `/projects/${item.id}${
                        fromStarterProjectsPage ?
                            '?fromStarterProjectsPage=true' :
                            ''
                    }`;
                    break;
                default:
                    href = `/${item.type}/${item.id}/`;
                }

                return (
                    <Thumbnail
                        creator={item.author.username}
                        // On the starter projects page, the author `scratchteam` doesn't have a valid profile
                        creatorMembershipLabel={item.author.profile?.membership_label ?? LABEL_TYPE.NONE}
                        href={href}
                        key={`${type}.${item.id}`}
                        loves={item.stats.loves}
                        remixes={item.stats.remixes}
                        showLoves={showLoves}
                        showRemixes={showRemixes}
                        src={item.image}
                        title={item.title}
                        type={type}
                    />
                );
            })}
        </Slider>
    );
};

Carousel.propTypes = {
    className: PropTypes.string,
    fromStarterProjectsPage: PropTypes.bool,
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

module.exports = Carousel;
