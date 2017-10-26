var FormattedMessage = require('react-intl').FormattedMessage;
var injectIntl = require('react-intl').injectIntl;
var React = require('react');

var FlexRow = require('../../../components/flex-row/flex-row.jsx');
var TitleBanner = require('../../../components/title-banner/title-banner.jsx');
var TTTModal = require('../../../components/modal/ttt/modal.jsx');

require('../../../components/forms/button.scss');
require('./top-banner.scss');

var nameTile = {
    title: 'ttt.AnimateYourNameTitle',
    description: 'ttt.AnimateYourNameDescription',
    thumbUrl: '/images/ttt/animate-your-name.jpg',
    bannerUrl: '/images/ttt/animate-your-name-banner.jpg',
    tutorialLoc: '/projects/editor/?tip_bar=name',
    activityLoc: 'cards.nameCardsLink',
    guideLoc: 'guides.NameGuideLink'
};

var TopBanner = injectIntl(React.createClass({
    type: 'TopBanner',
    getInitialState: function () {
        // use translated tile
        var formatMessage = this.props.intl.formatMessage;
        var translatedTile = {};
        translatedTile = {
            title: formatMessage({id: nameTile.title}),
            description: formatMessage({id: nameTile.description}),
            tutorialLoc: nameTile.tutorialLoc,
            activityLoc: formatMessage({id: nameTile.activityLoc}),
            guideLoc: formatMessage({id: nameTile.guideLoc}),
            thumbUrl: nameTile.thumbUrl,
            bannerUrl: nameTile.bannerUrl
        };
        return {currentTile: translatedTile, TTTModalOpen: false};
    },
    showTTTModal: function () {
        this.setState({TTTModalOpen: true});
    },
    hideTTTModal: function () {
        this.setState({TTTModalOpen: false});
    },
    render: function () {
        return (
            <TitleBanner className="mod-splash-top">
                <FlexRow className="banner-top inner">
                    <FlexRow className="top-animation">
                        <img
                            src="/images/hoc/s.png"
                            alt="C"
                            className="top-animation-letter mod-letter-s"
                        />
                        <img
                            src="/images/hoc/c1.png"
                            alt="C"
                            className="top-animation-letter mod-letter-c1"
                        />
                        <img
                            src="/images/hoc/r.png"
                            alt="R"
                            className="top-animation-letter mod-letter-r"
                        />
                        <img
                            src="/images/hoc/a.png"
                            alt="A"
                            className="top-animation-letter mod-letter-a"
                        />
                        <img
                            src="/images/hoc/t.png"
                            alt="T"
                            className="top-animation-letter mod-letter-t"
                        />
                        <img
                            src="/images/hoc/c2.png"
                            alt="C"
                            className="top-animation-letter mod-letter-c2"
                        />
                        <img
                            src="/images/hoc/h.png"
                            alt="H"
                            className="top-animation-letter mod-letter-h"
                        />
                    </FlexRow>
                    
                    <div className="top-links">
                        <a href="/projects/editor/?tip_bar=name" className="button mod-top-button">
                            <FormattedMessage id="ttt.AnimateYourNameTitle" />
                        </a>
                        <div className="mod-guides-link" onClick={this.showTTTModal}>
                            &nbsp;&nbsp;
                            <FormattedMessage id="tile.guides" />
                            <img className="top-open-modal" src="/svgs/modal/open-white.svg" />
                            <TTTModal
                                isOpen={this.state.TTTModalOpen}
                                onRequestClose={this.hideTTTModal}
                                {...this.state.currentTile}/>
                        </div>
                    </div>
                </FlexRow>
            </TitleBanner>
        );
    }
}));

module.exports = TopBanner;

