const PropTypes = require('prop-types');
const React = require('react');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const classNames = require('classnames');
const approx = require('approximate-number');

const CappedNumber = require('../../components/cappednumber/cappednumber.jsx');
const projectShape = require('./projectshape.jsx').projectShape;

require('./stats.scss');

const Stats = props => (
    <FlexRow className="stats">
        <div
            className={classNames('project-loves', {loved: props.loved})}
            key="loves"
            onClick={props.onLoveClicked}
        >
            {approx(props.loveCount, {decimal: false})}
        </div>
        <div
            className={classNames('project-favorites', {favorited: props.faved})}
            key="favorites"
            onClick={props.onFavoriteClicked}
        >
            {approx(props.favoriteCount, {decimal: false})}
        </div>
        <div
            className="project-remixes"
            key="remixes"
        >
            {approx(props.projectInfo.stats.remixes, {decimal: false})}
        </div>
        <div
            className="project-views"
            key="views"
        >
            <CappedNumber value={props.projectInfo.stats.views} />
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
