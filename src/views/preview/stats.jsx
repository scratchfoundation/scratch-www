const PropTypes = require('prop-types');
const React = require('react');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const classNames = require('classnames');

const projectShape = require('./projectshape.jsx').projectShape;

require('./stats.scss');

const Stats = props => (
    <FlexRow className="stats noselect">
        <div
            className={classNames('project-loves', {loved: props.loved})}
            key="loves"
            onClick={props.onLoveClicked}
        >
            {Math.max(0, props.loveCount)}
        </div>
        <div
            className={classNames('project-favorites', {favorited: props.faved})}
            key="favorites"
            onClick={props.onFavoriteClicked}
        >
            {Math.max(0, props.favoriteCount)}
        </div>
        <div
            className="project-remixes"
            key="remixes"
        >
            {props.projectInfo.stats.remixes}
        </div>
        <div
            className="project-views"
            key="views"
        >
            {props.projectInfo.stats.views}
        </div>
    </FlexRow>
);

Stats.propTypes = {
    faved: PropTypes.bool,
    favoriteCount: PropTypes.number,
    loveCount: PropTypes.number,
    loved: PropTypes.bool,
    onFavoriteClicked: PropTypes.func,
    onLoveClicked: PropTypes.func,
    projectInfo: projectShape
};

module.exports = Stats;
