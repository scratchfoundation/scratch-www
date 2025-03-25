import classNames from 'classnames';
import defaults from 'lodash.defaults';
import PropTypes from 'prop-types';
import React from 'react';

import {framelessDetailed} from '../../lib/frameless.js';
import Carousel from '../carousel/carousel.jsx';
import './projects-carousel.scss';

export const ProjectsCarousel = props => {
    defaults(props.settings, {
        slidesToShow: 5,
        arrows: true,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: framelessDetailed.mobile,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    infinite: true
                }
            },
            {
                breakpoint: framelessDetailed.mobileIntermediate,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 2,
                    infinite: true
                }
            },
            {
                breakpoint: framelessDetailed.tabletPortrait,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 3,
                    infinite: true
                }
            },
            {
                breakpoint: framelessDetailed.tabletPortraitIntermediate,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 4,
                    infinite: true
                }
            }
        ]
    });
    
    return (
        <div className={classNames('projects-carousel', props.className)}>
            <div className="header">
                {props.title}
            </div>

            <div className="content">
                <Carousel
                    fromStarterProjectsPage
                    {...props}
                />
            </div>
        </div>
    );
};

ProjectsCarousel.propTypes = {
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
    title: PropTypes.string,
    type: PropTypes.string,
    useDetailedBreakpoints: PropTypes.bool
};

ProjectsCarousel.defaultProps = {
    settings: {}
};
