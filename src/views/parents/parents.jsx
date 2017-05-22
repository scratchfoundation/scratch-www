var React = require('react');
var render = require('../../lib/render.jsx');

var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;

var Page = require('../../components/page/www/page.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');

require('./parents.scss');

var Parents = React.createClass({
    type: 'Parents',
    render: function () {
        return (
            <div className="parents">
                <TitleBanner className="masthead">
                    <div className="inner">
                        <h1 className="title-banner-h1">
                            <FormattedMessage id="parents.title" />
                        </h1>
                        <FlexRow className="masthead-info">
                            <p className="title-banner-p intro">
                                <FormattedMessage id="parents.intro" />
                            </p>
                            <div className="ted-talk">
                                <iframe src="https://www.youtube.com/embed/uPSuG063jhA?border=0&wmode=transparent"
                                    frameBorder="0" allowFullScreen></iframe>
                            </div>
                        </FlexRow>
                    </div>
                </TitleBanner>
                <div className="inner">
                    <FlexRow className="overview">
                        <div>
                            <h2><FormattedMessage id="parents.learningTitle" /></h2>
                            <p><FormattedHTMLMessage id="parents.learningBody" /></p>
                        </div>
                        <div>
                            <h2><FormattedMessage id="parents.communityTitle" /></h2>
                            <p><FormattedHTMLMessage id="parents.communityBody" /></p>
                        </div>
                        <div>
                            <h2><FormattedMessage id="parents.questionsTitle" /></h2>
                            <p><FormattedHTMLMessage id="parents.questionsBody" /></p>
                        </div>
                    </FlexRow>
                    <FlexRow className="faq">
                        <div>
                            <h3><FormattedMessage id="parents.ageQuestion" /></h3>
                            <p><FormattedMessage id="parents.ageAnswer" /></p>
                        </div>
                        <div>
                            <h3><FormattedMessage id="parents.resourcesQuestion" /></h3>
                            <p><FormattedHTMLMessage id="parents.resourcesAnswer" /></p>
                        </div>
                        <div>
                            <h3><FormattedMessage id="parents.communityQuestion" /></h3>
                            <p><FormattedMessage id="parents.communityAnswer" /></p>
                        </div>
                        <div>
                            <h3><FormattedMessage id="parents.guidelinesQuestion" /></h3>
                            <p><FormattedHTMLMessage id="parents.guidelinesAnswer" /></p>
                        </div>
                        <div>
                            <h3><FormattedMessage id="parents.privacyQuestion" /></h3>
                            <p><FormattedHTMLMessage id="parents.privacyAnswer" /></p>
                        </div>
                        <div>
                            <h3><FormattedMessage id="parents.offlineQuestion" /></h3>
                            <p><FormattedHTMLMessage id="parents.offlineAnswer" /></p>
                        </div>
                        <div>
                            <h3><FormattedMessage id="parents.feedbackQuestion" /></h3>
                            <p><FormattedMessage id="parents.feedbackIntro" /></p>
                            <p><FormattedHTMLMessage id="parents.feedbackOne" /></p>
                            <p><FormattedHTMLMessage id="parents.feedbackTwo" /></p>
                            <p><FormattedHTMLMessage id="parents.feedbackThree" /></p>
                        </div>
                    </FlexRow>
                </div>
            </div>
        );
    }
});

render(<Page><Parents /></Page>, document.getElementById('app'));
