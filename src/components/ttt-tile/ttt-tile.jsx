const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('../forms/button.scss');
require('./ttt-tile.scss');

const TTTTile = props => (
    <div
        className={classNames('ttt-tile', props.className)}
        onClick={props.onClick}
    >
        <div className="ttt-tile-tutorial">
            <div className="ttt-tile-image">
                <img
                    alt=""
                    className="ttt-tile-image-img"
                    src={props.thumbImage}
                />
            </div>
            <div className="ttt-tile-info">
                <h4 className="ttt-tile-title">{props.title}</h4>
                <p className="ttt-tile-description">
                    {props.description}
                </p>
            </div>
        </div>
    </div>
);

TTTTile.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    onClick: PropTypes.func,
    thumbImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

module.exports = TTTTile;
