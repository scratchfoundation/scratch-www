const FormattedMessage = require('react-intl').FormattedMessage;
const MediaQuery = require('react-responsive').default;
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

const FlexRow = require('../../flex-row/flex-row.jsx');
const frameless = require('../../../lib/frameless');
const Modal = require('../base/modal.jsx');
const TitleBanner = require('../../title-banner/title-banner.jsx');

require('../../forms/button.scss');
require('./modal.scss');

const TTTModal = props => (
    <Modal
        className="mod-ttt"
        {...omit(
            props,
            [
                'title',
                'description',
                'tutorialLoc',
                'activityLoc',
                'guideLoc',
                'thumbUrl',
                'bannerUrl'
            ]
        )}
    >
        <TitleBanner className="mod-ttt">
            <MediaQuery minWidth={frameless.mobile}>
                <img
                    alt=""
                    className="mod-ttt-img"
                    src={props.bannerUrl}
                />
            </MediaQuery>
            <MediaQuery maxWidth={frameless.mobile - 1}>
                <img
                    alt=""
                    className="mod-ttt-img"
                    src={props.thumbUrl}
                />
            </MediaQuery>
        </TitleBanner>
        <div className="ttt-title">
            <h2>{props.title}</h2>
            <p className="ttt-description">{props.description}</p>
        </div>
        <ul className="modal-content-ttt">
            <FlexRow
                as="li"
                className="mod-ttt-item"
            >
                <div className="modal-content-ttt-text">
                    <div className="modal-content-ttt-title">
                        <img
                            alt="tutorial-icon"
                            className="modal-content-ttt-title-img"
                            src="/svgs/ttt/tutorial.svg"
                        />
                        <FormattedMessage id="ttt.tutorial" />
                    </div>
                    <p className="modal-content-ttt-subtitle">
                        <FormattedMessage id="ttt.tutorialSubtitle" />
                    </p>
                </div>
                <a
                    className="button white mod-ttt-item"
                    href={props.tutorialLoc}
                >
                    <FormattedMessage id="tile.tryIt" />
                </a>
            </FlexRow>
            <FlexRow
                as="li"
                className="mod-ttt-item"
            >
                <div className="modal-content-ttt-text">
                    <div className="modal-content-ttt-title">
                        <img
                            alt="activity-cards-icon"
                            className="modal-content-ttt-title-img"
                            src="/svgs/ttt/activity-cards.svg"
                        />
                        <FormattedMessage id="ttt.activityTitle" />
                    </div>
                    <p className="modal-content-ttt-subtitle">
                        <FormattedMessage id="ttt.activitySubtitle" />
                    </p>
                </div>
                <a
                    className="button white mod-ttt-item"
                    href={props.activityLoc}
                >
                    <FormattedMessage id="ttt.open" />
                </a>
            </FlexRow>
            <FlexRow
                as="li"
                className="mod-ttt-item"
            >
                <div className="modal-content-ttt-text">
                    <div className="modal-content-ttt-title">
                        <img
                            alt="educator-guide-icon"
                            className="modal-content-ttt-title-img"
                            src="/svgs/ttt/educator-guide.svg"
                        />
                        <FormattedMessage id="ttt.educatorTitle" />
                    </div>
                    <p className="modal-content-ttt-subtitle">
                        <FormattedMessage id="ttt.educatorSubtitle" />
                    </p>
                </div>
                <a
                    className="button white mod-ttt-item"
                    href={props.guideLoc}
                >
                    <FormattedMessage id="ttt.open" />
                </a>
            </FlexRow>
        </ul>
    </Modal>
);

TTTModal.propTypes = {
    activityLoc: PropTypes.string.isRequired,
    bannerUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    guideLoc: PropTypes.string.isRequired,
    thumbUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tutorialLoc: PropTypes.string.isRequired
};

module.exports = TTTModal;
