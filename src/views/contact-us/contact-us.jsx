const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const HelpForm = require('../../components/helpform/helpform.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

let subject = '';
let body = '';
const url = (window.location && window.location.search) || '';
// assumes that scratchr2 will only ever send one parameter
const params = url.split('?')[1];
if (typeof (params) !== 'undefined' && params.indexOf('studio') !== -1) {
    subject = `Inappropriate content reported in studio ${params.split('=')[1]}`;
    body = `https://scratch.mit.edu/studios/${params.split('=')[1]}`;
} else if (typeof (params) !== 'undefined' && params.indexOf('profile') !== -1) {
    subject = `Inappropriate content reported in profile ${params.split('=')[1]}`;
    body = `https://scratch.mit.edu/users/${params.split('=')[1]}`;
} else if (typeof (params) !== 'undefined' && params.indexOf('confirmation') !== -1) {
    subject = 'Problem with email confirmation';
}

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
            </section>
        </div>
        <HelpForm
            body={body}
            subject={subject}
            title={props.intl.formatMessage({id: 'contactUs.contactScratch'})}
        />
    </InformationPage>
));

ContactUs.propTypes = {
    intl: intlShape
};

render(<Page><ContactUs /></Page>, document.getElementById('app'));
