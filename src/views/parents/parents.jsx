var React = require('react');
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var Page = require('../../components/page/www/page.jsx');

require('./about.scss');

var Parents = React.createClass({
    type: 'Parents',
    render: function () {
        return (
            <div className="inner parents">
                <h1><FormattedMessage id='general.forParents' /></h1>

                <div className="masthead">
                    <div>
                        <p><FormattedMessage id='parents.introOne' /></p>
                        <p><FormattedMessage id='parents.introTwo' /></p>

                        <ul>
                            <li><a href = "/about/"><FormattedMessage id="parents.introAbout" /></a></li>
                            <li><a href = "/educators/"><FormattedMessage id="parents.introEducators" /></a></li>
                        </ul>
                    </div>

                    <div>
                        <iframe
                            title="Mitch TED Talk"
                            src="//embed-ssl.ted.com/talks/mitch_resnick_let_s_teach_kids_to_code.html"
                            frameBorder="0"
                            webkitAllowFullScreen
                            mozallowfullscreen
                            allowFullScreen />
                    </div>
                </div>

                <div className="body">
                    <ul>
                      <li>
                            <h3><FormattedMessage id='parents.learning' /></h3>
                            <p><FormattedHTMLMessage id='parents.learningDescription' /></p>
                        </li>
                      
                      <li>
                            <h3><FormattedMessage id='parents.community' /></h3>
                            <p><FormattedHTMLMessage id='parents.communityDescription' /></p>
                        </li>
                      
                        <li>
                            <h3><FormattedMessage id='parents.ageRange' /></h3>
                            <p><FormattedHTMLMessage id='parents.ageRangeDescription' /></p>
                        </li>

                        <li>
                            <h3><FormattedMessage id='parents.resources' /></h3>
                            <p><FormattedHTMLMessage id='parents.resourcesDescription' /></p>
                        </li>

                        <li>
                            <h3><FormattedMessage id='parents.onlineCommunity' /></h3>
                            <p><FormattedHTMLMessage id='parents.onlineCommunityDescription' /></p>
                        </li>

                        <li>
                            <h3><FormattedMessage id='parents.guidelines' /></h3>
                            <p><FormattedHTMLMessage id='parents.guidelinesDescription' /></p>
                        </li>

                        <li>
                            <h3><FormattedMessage id='parents.privacyPolicy' /></h3>
                            <p><FormattedHTMLMessage id='parents.privacyPolicyDescription' /></p>
                        </li>

                        <li>
                            <h3><FormattedMessage id='parents.noOnline' /></h3>
                            <p><FormattedHTMLMessage id='parents.noOnlineDescription' /></p>
                        </li>
                      
                        <li>
                            <h3><FormattedMessage id='parents.parentsSaying' /></h3>
                            <p><FormattedHTMLMessage id='parents.parentsSayingDescription' /></p>
                            <p><b>"I just want to thank you all for making Scratch, and for providing it for free.</b> My kids are doing amazing things that they see as fun yet I know is educational, valuable, and worthwhile. Thank you so much!!!"</p>
                            <p><b>"My very shy but technical minded daughter has found this to be a fantastic, safe outlet for her creativity.</b> She spends her free time creating ever more difficult animations and sharing them with the scratch community. The forums provide her with a group of like-minded individuals with which she can hold on a conversation... She now feels that computers, graphic design and animation are something she would like to pursue in the future. Your program has opened a whole new world to her in so many ways, and I thank you wholeheartedly. "</p>
                            <p><b>"My son is learning more than I can imagine from your tool.</b> He is not a natural logical thinker but loves LEGO. Your LEGO-like building block structure has moved him forward by light-years in his logical thinking skills...He can snap things together and begin to see the logic reinforced by immediate feedback. Of course we work on some things together--instant father and son time. This is just incredible. Just a big thanks to you and MIT."</p>
                        </li>

                        <li>
                            <h3><FormattedMessage id='parents.Questions' /></h3>
                            <p><FormattedHTMLMessage id='parents.QuestionsDescription' /></p>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

render(<Page><Parents /></Page>, document.getElementById('app'));
