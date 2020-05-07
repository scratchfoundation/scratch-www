const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const HelpForm = require('../../components/helpform/helpform.jsx');
const HelpWidget = require('../../components/helpwidget/helpwidget.jsx');
const {CONTACT_US_POPUP} = require('../../lib/feature-flags.js');

const InformationPage = require('../../components/informationpage/informationpage.jsx');
require('./contact-us.scss');

class ContactUs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            subject: '',
            body: ''
        };
        const query = window.location.search;
        let scratchId = '';
        // The subject is not localized because sending in English is easier for Scratch Team
        if (query.indexOf('studio=') !== -1) {
            scratchId = query.match(/studio=([0-9]+)/)[1];
            this.state.subject = `Issue reported with studio ${scratchId}`;
            this.state.body = `https://scratch.mit.edu/studios/${scratchId}`;
        } else if (query.indexOf('profile=') !== -1) {
            scratchId = query.match(/profile=([a-zA-Z0-9-_]+)/)[1];
            this.state.subject = `Issue reported with profile ${scratchId}`;
            this.state.body = `https://scratch.mit.edu/users/${scratchId}`;
        } else if (query.indexOf('confirmation=') !== -1) {
            this.state.subject = 'Problem with email confirmation';
        }
    }
    render () {
        return (
            <InformationPage
                title={CONTACT_US_POPUP ?
                    this.props.intl.formatMessage({id: 'contactUs.qTitle'}) :
                    this.props.intl.formatMessage({id: 'contactUs.title'})}
            >
                {!CONTACT_US_POPUP && (
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
                )}
                {CONTACT_US_POPUP && (
                    <div className="contact-us inner info-inner">
                        <section
                            className="helpwidget"
                            id="contact-us"
                        >
                            <span className="nav-spacer" />
                            <h3>
                                <FormattedMessage id="contactUs.seeFaq" />
                            </h3>
                            <p><FormattedMessage
                                id="contactUs.faqInfo"
                                values={{faqLink: (
                                    <a href="/info/faq"><FormattedMessage id="contactUs.faqLinkText" /></a>
                                )}}
                            /></p>
                            <h3>
                                <FormattedMessage id="contactUs.askCommunity" />
                            </h3>
                            <p><FormattedMessage id="contactUs.forumsIntro" /></p>
                            <p><FormattedMessage id="contactUs.forumsHelp" /></p>
                            <ul>
                                <li><FormattedMessage
                                    id="contactUs.questionsText"
                                    values={{questionsLink: (
                                        <a href="/discuss/4/"><FormattedMessage id="contactUs.questionsLinkText" /></a>
                                    )}}
                                /></li>
                                <li><FormattedMessage
                                    id="contactUs.scriptsText"
                                    values={{scriptsLink: (
                                        <a href="/discuss/7/"><FormattedMessage id="contactUs.scriptsLinkText" /></a>
                                    )}}
                                /></li>
                                <li><FormattedMessage
                                    id="contactUs.bugsText"
                                    values={{bugsLink: (
                                        <a href="/discuss/3/"><FormattedMessage id="contactUs.bugsLinkText" /></a>
                                    )}}
                                /></li>
                            </ul>
                            <h3>
                                <FormattedMessage id="contactUs.needSupport" />
                            </h3>
                            <p>
                                <FormattedMessage
                                    id="contactUs.supportInfo"
                                    values={{helpLink: (
                                        <HelpWidget
                                            body={this.state.body}
                                            subject={this.state.subject}
                                        />
                                    )}}
                                />
                            </p>
                        </section>
                        <HelpWidget
                            button
                            body={this.state.body}
                            subject={this.state.subject}
                        />
                    </div>
                )}
                <nav>
                    <ol>
                        <li className="nav-header"><FormattedMessage id="contactUs.findHelp" /></li>
                        <li><a href="/info/faq"><FormattedMessage id="contactUs.faqLinkText" /></a></li>
                    </ol>
                </nav>
                {!CONTACT_US_POPUP && (
                    <HelpForm
                        body={this.state.body}
                        subject={this.state.subject}
                        title={this.props.intl.formatMessage({id: 'contactUs.contactScratch'})}
                    />
                )}
            </InformationPage>
        );
    }
}

ContactUs.propTypes = {
    intl: intlShape
};

const WrappedContactUs = injectIntl(ContactUs);

render(<Page><WrappedContactUs /></Page>, document.getElementById('app'));
