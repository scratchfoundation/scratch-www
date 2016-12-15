var classNames = require('classnames');
var React = require('react');
var FormattedMessage = require('react-intl').FormattedMessage;

require('../forms/button.scss');
require('./ttt-tile.scss');

var TTTTile = React.createClass({
    type: 'TTTTile',
    propTypes: {
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        thumbUrl: React.PropTypes.string.isRequired,
        tutorialLoc: React.PropTypes.string.isRequired,
        onGuideClick: React.PropTypes.func.isRequired
    },
    tileGuidesIfExists: function () {
        if (this.props.onGuideClick) {
            return (
                <div className="ttt-tile-guides" onClick={this.props.onGuideClick}>
                    <FormattedMessage id='tile.guides' defaultMessage='See Cards and Guides'/>
                    <img className="ttt-tile-see-more" src="/svgs/ttt/see-more.svg" />
                </div>
            );
        }
    },
    render: function () {
        var classes = classNames(
            'ttt-tile',
            this.props.className
        );
        return (
            <div className={classes} >
                <a href={this.props.tutorialLoc}>
                    <div className="ttt-tile-tutorial">
                        <div className="ttt-tile-image">
                            <img className="ttt-tile-image-img" src={this.props.thumbUrl} alt="" />
                            <div className="ttt-tile-image-try">
                                <div className="button mod-ttt-tile-image-try-button">
                                    <FormattedMessage id="ttt.tryIt" />
                                </div>
                            </div>
                        </div>
                        <div className="ttt-tile-info">

                            <div className="ttt-tile-tag">
                                <FormattedMessage id='tile.tutorial' defaultMessage='Tutorial'/>
                            </div>
                            <h4 className="ttt-tile-title">{this.props.title}</h4>
                            <p className="ttt-tile-description">
                                {this.props.description}
                            </p>
                        </div>
                    </div>

                </a>
                {this.tileGuidesIfExists()}
            </div>
        );
    }
});

module.exports = TTTTile;
