const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

require('../forms/button.scss');
require('./ttt-tile.scss');

const TTTTile = props => (
    <div className={classNames('ttt-tile', props.className)}>
        <a href={props.tutorialLoc}>
            <div className="ttt-tile-tutorial">
                <div className="ttt-tile-image">
                    <img
                        alt=""
                        className="ttt-tile-image-img"
                        src={props.thumbUrl}
                    />
                    <div className="ttt-tile-image-try">
                        <div className="button mod-ttt-try-button">
                            <FormattedMessage id="tile.tryIt" />
                        </div>
                    </div>
                </div>
                <div className="ttt-tile-info">

                    <div className="ttt-tile-tag">
                        <FormattedMessage
                            defaultMessage="Tutorial"
                            id="ttt.tutorial"
                        />
                    </div>
                    <h4 className="ttt-tile-title">{props.title}</h4>
                    <p className="ttt-tile-description">
                        {props.description}
                    </p>
                </div>
            </div>

        </a>
        {props.onGuideClick && (
            <div
                className="ttt-tile-guides"
                onClick={props.onGuideClick}
            >
                <FormattedMessage
                    defaultMessage="See Cards and Guides"
                    id="tile.guides"
                />
                <img
                    className="ttt-tile-open-modal"
                    src="/svgs/modal/open-blue.svg"
                />
            </div>
        )}
    </div>
);

TTTTile.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    onGuideClick: PropTypes.func,
    thumbUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tutorialLoc: PropTypes.string.isRequired
};

module.exports = TTTTile;
