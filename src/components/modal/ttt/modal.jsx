const FormattedMessage = require('react-intl').FormattedMessage;
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

const Modal = require('../base/modal.jsx');

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
                'tutorialUrl',
                'cardsUrl',
                'guideUrl',
                'thumbImage',
                'modalImage'
            ]
        )}
    >
        <div className="ttt-modal-header modal-header" />
        <div className="ttt-modal-body">
            <a href={props.tutorialUrl}>
                <div className="ttt-img-container">
                    <img
                        alt=""
                        className="mod-ttt-img"
                        src={props.modalImage}
                    />
                </div>
            </a>
            <div className="ttt-content">
                <div className="ttt-content-chunk">
                    <h2>{props.title}</h2>
                    <p className="ttt-description">{props.description}</p>
                    <a
                        className="button ttt-try-tutorial-button"
                        href={props.tutorialUrl}
                    >
                        <img src="/images/ideas/bulb-icon.svg" />
                        <FormattedMessage id="ideas.tryTheTutorial" />
                    </a>
                </div>
                <div className="ttt-content-chunk">
                    <div className="ttt-row">
                        <div className="ttt-item">
                            <img src="/images/ideas/coding-cards-icon.svg" />
                            <FormattedMessage id="ideas.codingCards" />
                        </div>
                        <div className="ttt-item">
                            <a
                                href={props.cardsUrl}
                                target="_blank"
                            >
                                <FormattedMessage id="ideas.downloadPDF" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="ttt-content-chunk">
                    <div className="ttt-row">
                        <div className="ttt-item">
                            <img src="/images/ideas/educator-guide-icon.svg" />
                            <FormattedMessage id="ideas.educatorGuide" />
                        </div>
                        <div className="ttt-item">
                            <a
                                href={props.guideUrl}
                                target="_blank"
                            >
                                <FormattedMessage id="ideas.downloadPDF" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
);

TTTModal.propTypes = {
    cardsUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    guideUrl: PropTypes.string.isRequired,
    modalImage: PropTypes.string.isRequired,
    thumbImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tutorialUrl: PropTypes.string.isRequired
};

module.exports = TTTModal;
