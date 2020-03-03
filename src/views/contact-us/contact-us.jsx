const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const HelpForm = require('../../components/helpform/helpform.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const ContactUs = injectIntl(props => (
    <InformationPage title={props.intl.formatMessage({id: 'contactUs.title'})}>
        <div className="inner info-inner">
            <section id="contact-us">
                <span className="nav-spacer" />
                <p><FormattedMessage
                    id="contactUs.intro"
                    values={{faqLink: (
                        <a href="/faq"><FormattedMessage id="contactUs.faqLinkText" /></a>
                    )}}
                /></p>
                <p><FormattedMessage id="contactUs.forumsInfo" /></p>
                <ul>
                    <li><FormattedMessage
                        id="contactUs.questionsForum"
                        values={{questionsLink: (
                            <a href="/discuss/4/"><FormattedMessage id="contactUs.questionsLinkText" /></a>
                        )}}
                    /></li>
                    <li><FormattedMessage
                        id="contactUs.scriptsForum"
                        values={{scriptsLink: (
                            <a href="/discuss/4/"><FormattedMessage id="contactUs.scriptsLinkText" /></a>
                        )}}
                    /></li>
                    <li><FormattedMessage
                        id="contactUs.bugsForum"
                        values={{bugsLink: (
                            <a href="/discuss/4/"><FormattedMessage id="contactUs.bugsLinkText" /></a>
                        )}}
                    /></li>
                </ul>
                <p><FormattedMessage id="contactUs.formIntro" /></p>
                <HelpForm title={props.intl.formatMessage({id: 'contactUs.contactScratch'})} />
            </section>
            <span className="nav-spacer" />
        </div>
        <nav>
            <ol>
                <li className="nav-header"><FormattedMessage id="contactUs.findHelp" /></li>
                <li><a href="/faq"><FormattedMessage id="contactUs.faqLinkText" /></a></li>
                <li><a href="/discuss/"><FormattedMessage id="contactUs.forumsLinkText" /></a></li>
            </ol>
        </nav>
    </InformationPage>
));

ContactUs.propTypes = {
    intl: intlShape
};

render(<Page><ContactUs /></Page>, document.getElementById('app'));
