const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');

const FlexRow = require('../../flex-row/flex-row.jsx');
require('./modal.scss');

const MuteStep = ({
    bottomImg,
    bottomImgClass,
    children,
    header,
    sideImg,
    sideImgClass
}) => (
    <div className="mute-step">
        {sideImg &&
            <FlexRow className={classNames('left-column')}>
                <div className={classNames('mute-side-image')}>
                    <img
                        className={sideImgClass}
                        src={sideImg}
                    />
                </div>
            </FlexRow>
        }
        <FlexRow className={classNames('mute-right-column')}>
            <FlexRow className={classNames('mute-header')}>
                {header}
            </FlexRow>
            <FlexRow className={classNames('mute-content')}>
                {children}
            </FlexRow>
            <FlexRow className={classNames('mute-bottom-row')}>
                {bottomImg &&
                    <img
                        className={bottomImgClass}
                        src={bottomImg}
                    />
                }
            </FlexRow>
        </FlexRow>
    </div>
);

MuteStep.propTypes = {
    bottomImg: PropTypes.string,
    bottomImgClass: PropTypes.string,
    children: PropTypes.node,
    header: PropTypes.string,
    sideImg: PropTypes.string,
    sideImgClass: PropTypes.string
};

module.exports = MuteStep;
