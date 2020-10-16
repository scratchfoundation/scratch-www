const classNames = require('classnames');
const PropTypes = require('prop-types');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const React = require('react');


require('./commenting-status.scss');

const CommentingStatus = props => (
    <div className={classNames('commenting-status', props.className)}>
        <div className={classNames('commenting-status-inner-content', props.innerClassName)}>
            <FlexRow className="comment-status-img">
                <img
                    className="comment-status-icon"
                    src="/svgs/project/comment-status.svg"
                />
            </FlexRow>
            <FlexRow>
                {props.children}
            </FlexRow>
        </div>
    </div>
);

CommentingStatus.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    innerClassName: PropTypes.string
};

module.exports = CommentingStatus;
