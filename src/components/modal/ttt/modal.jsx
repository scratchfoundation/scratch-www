import {FormattedMessage} from 'react-intl';
import MediaQuery from 'react-responsive';
import omit from 'lodash.omit';
import React from 'react';

import FlexRow from '../../flex-row/flex-row.jsx';
import frameless from '../../../lib/frameless';
import Modal from '../base/modal.jsx';
import TitleBanner from '../../title-banner/title-banner.jsx';

require('../../forms/button.scss');
require('./modal.scss');

var TTTModal = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        tutorialLoc: React.PropTypes.string.isRequired,
        activityLoc: React.PropTypes.string.isRequired,
        guideLoc: React.PropTypes.string.isRequired,
        thumbUrl: React.PropTypes.string.isRequired,
        bannerUrl: React.PropTypes.string.isRequired
    },
    render: function () {
        var modalOmit = [
            'title',
            'description',
            'tutorialLoc',
            'activityLoc',
            'guideLoc',
            'thumbUrl',
            'bannerUrl'
        ];
        return (
            <Modal
                className="mod-ttt"
                {...omit(this.props, modalOmit)}
            >
                <TitleBanner className="mod-ttt">
                    <MediaQuery minWidth={frameless.mobile}>
                        <img className="mod-ttt-img" src={this.props.bannerUrl} alt="" />
                    </MediaQuery>
                    <MediaQuery maxWidth={frameless.mobile - 1}>
                        <img className="mod-ttt-img" src={this.props.thumbUrl} alt="" />
                    </MediaQuery>
                </TitleBanner>
                <div className="ttt-title">
                    <h2>{this.props.title}</h2>
                    <p className="ttt-description">{this.props.description}</p>
                </div>
                <ul className="modal-content-ttt">
                    <FlexRow as="li" className="mod-ttt-item">
                        <div className="modal-content-ttt-text">
                            <div className="modal-content-ttt-title">
                                <img
                                    className="modal-content-ttt-title-img"
                                    src="/svgs/ttt/tutorial.svg"
                                    alt="tutorial-icon"
                                />
                                <FormattedMessage id="ttt.tutorial" />
                            </div>
                            <p className="modal-content-ttt-subtitle">
                                <FormattedMessage id="ttt.tutorialSubtitle" />
                            </p>
                        </div>
                        <a
                            href={this.props.tutorialLoc}
                            className="button white mod-ttt-item"
                        >
                            <FormattedMessage id="tile.tryIt" />
                        </a>
                    </FlexRow>
                    <FlexRow as="li" className="mod-ttt-item">
                        <div className="modal-content-ttt-text">
                            <div className="modal-content-ttt-title">
                                <img
                                    className="modal-content-ttt-title-img"
                                    src="/svgs/ttt/activity-cards.svg"
                                    alt="activity-cards-icon"
                                />
                                <FormattedMessage id="ttt.activityTitle" />
                            </div>
                            <p className="modal-content-ttt-subtitle">
                                <FormattedMessage id="ttt.activitySubtitle" />
                            </p>
                        </div>
                        <a
                            href={this.props.activityLoc}
                            className="button white mod-ttt-item"
                        >
                            <FormattedMessage id="ttt.open" />
                        </a>
                    </FlexRow>
                    <FlexRow as="li" className="mod-ttt-item">
                        <div className="modal-content-ttt-text">
                            <div className="modal-content-ttt-title">
                                <img
                                    className="modal-content-ttt-title-img"
                                    src="/svgs/ttt/educator-guide.svg"
                                    alt="educator-guide-icon"
                                />
                                <FormattedMessage id="ttt.educatorTitle" />
                            </div>
                            <p className="modal-content-ttt-subtitle">
                                <FormattedMessage id="ttt.educatorSubtitle" />
                            </p>
                        </div>
                        <a
                            href={this.props.guideLoc}
                            className="button white mod-ttt-item"
                        >
                            <FormattedMessage id="ttt.open" />
                        </a>
                    </FlexRow>
                </ul>
            </Modal>
        );
    }
});

export default TTTModal;
