const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./country-blurb.scss');

// Class names regular and reverse indicate whether the image should
// be placed on the right of left of the text in wider layouts.
// At smaller widths, the image will always be stacked on top.
// Because the right column would typically stack under the left
// I've named this class reverse since it is using flexbox reverse
// column layout to get the image to always appear on top of the text.

const CountryBlurb = props => (
    <div className={classNames('country-blurb', props.className)}>
        {props.className === 'regular' &&
            <div className="half">
                <img
                    className="large"
                    src={props.largeImage}
                    alt={props.alt}
                />
            </div>
        }
        <div className="half">
            <div className="country-info">
                <img
                    src={props.icon}
                    alt={props.iconAlt}
                />
                <div className="country-text">
                    <h5>{props.title}</h5>
                    <div className="location">
                        <img
                            src={props.listIcon}
                            alt="location icon"
                        />
                        <span>{props.country}</span>
                    </div>
                </div>
            </div>
            <p>
                {props.children}
            </p>
        </div>
        {props.className === 'reverse' &&
            <div className="half">
                <img
                    className="large"
                    src={props.largeImage}
                    alt={props.alt}
                />
            </div>
        }
    </div>
);

CountryBlurb.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.string,
    title: PropTypes.string,
    listIcon: PropTypes.string,
    country: PropTypes.string,
    className: PropTypes.string,
    largeImage: PropTypes.string,
    alt: PropTypes.string,
    iconAlt: PropTypes.string
};

module.exports = CountryBlurb;
