const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const HelpForm = require('../../components/helpform/helpform.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

class ContactUs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            subject: '',
            body: ''
        };
        const query = window.location.search;
        // assumes that scratchr2 will only ever send one parameter
        // The subject is not localized because sending in English is easier for Scratch Team
        if (query.indexOf('studio=') !== -1) {
            this.state.subject = `Inappropriate content reported in studio ${query.split('=')[1]}`;
            this.state.body = `https://scratch.mit.edu/studios/${query.split('=')[1]}`;
        } else if (query.indexOf('profile=') !== -1) {
            this.state.subject = `Inappropriate content reported in profile ${query.split('=')[1]}`;
            this.state.body = `https://scratch.mit.edu/users/${query.split('=')[1]}`;
        } else if (query.indexOf('confirmation=') !== -1) {
            this.state.subject = 'Problem with email confirmation';
        }
    }
    render () {
        return (
            <InformationPage title={this.props.intl.formatMessage({id: 'contactUs.title'})}>
                <div className="inner info-inner">
                    <section id="contact-us">
                        <span className="nav-spacer" />
                        <p><FormattedMessage
                            id="contactUs.intro"
                            values={{faqLink: (
                                <a href="/info/faq"><FormattedMessage id="contactUs.faqLinkText" /></a>
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
                                    <a href="/discuss/7/"><FormattedMessage id="contactUs.scriptsLinkText" /></a>
                                )}}
                            /></li>
                            <li><FormattedMessage
                                id="contactUs.bugsForum"
                                values={{bugsLink: (
                                    <a href="/discuss/3/"><FormattedMessage id="contactUs.bugsLinkText" /></a>
                                )}}
                            /></li>
                        </ul>
                        <p><FormattedMessage id="contactUs.formIntro" /></p>
                    </section>
                </div>
                <nav>
                    <ol>
                        <li className="nav-header"><FormattedMessage id="contactUs.findHelp" /></li>
                        <li><a href="/info/faq"><FormattedMessage id="contactUs.faqLinkText" /></a></li>
                    </ol>
                </nav>
                <HelpForm
                    body={this.state.body}
                    subject={this.state.subject}
                    title={this.props.intl.formatMessage({id: 'contactUs.contactScratch'})}
                />
            </InformationPage>
        );
    }
}

ContactUs.propTypes = {
    intl: intlShape
};

const WrappedContactUs = injectIntl(ContactUs);

render(<Page><WrappedContactUs /></Page>, document.getElementById('app'));
