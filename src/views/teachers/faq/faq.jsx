const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');

const Page = require('../../../components/page/www/page.jsx');
const render = require('../../../lib/render.jsx');

const InformationPage = require('../../../components/informationpage/informationpage.jsx');

const TeacherFaq = props => (
    <InformationPage title={props.intl.formatMessage({id: 'teacherfaq.title'})}>
        <div className="inner info-inner">
            <section id="teacher-accounts">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="teacherfaq.title" /></h2>
                <dl>
                    <dt><FormattedMessage id="teacherfaq.teacherWhatTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.teacherWhatBody" /></dd>
                    <iframe
                        allowFullscreen
                        mozallowfullscreen
                        webkitallowfullscreen
                        frameBorder="0"
                        height="318"
                        src="https://www.youtube.com/embed/7Hl9GxA1zwQ"
                        width="565"
                    />
                    <dt><FormattedMessage id="teacherfaq.teacherSignUpTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.teacherSignUpBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.teacherWaitTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.teacherWaitBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.classMultipleTeachersTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.classMultipleTeachersBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.convertToTeacherTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="teacherfaq.convertToTeacherList"
                            values={{
                                helpEmail: (
                                    <a href="mailto:help@scratch.mit.edu">
                                        help@scratch.mit.edu
                                    </a>
                                )
                            }}
                        />
                    </dd>
                    <ul>
                        <li><FormattedMessage id="teacherfaq.convertToTeacherUsername" /></li>
                        <li><FormattedMessage id="teacherfaq.convertToTeacherEmail" /></li>
                        <li><FormattedMessage id="teacherfaq.convertToTeacherBirth" /></li>
                    </ul>

                    <dt><FormattedMessage id="teacherfaq.teacherPersonalTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.teacherPersonalBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.teacherGoogleTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.teacherGoogleBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentDiscussTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="teacherfaq.studentDiscussBody"
                            values={{
                                scratchEdLink: (
                                    <a href="http://scratched.gse.harvard.edu/">ScratchEd</a>
                                ),
                                forumsLink: (
                                    <a href="http://scratched.gse.harvard.edu/discussions.html">
                                        <FormattedMessage id="teacherfaq.forums" />
                                    </a>
                                )
                            }}
                        />
                    </dd>
                    <dt><FormattedMessage id="teacherfaq.teacherEdTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.teacherEdBody" /></dd>
                </dl>
            </section>
            <section id="student-accounts">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="teacherfaq.studentAccountsTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="teacherfaq.studentVerifyTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.studentVerifyBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentAddExistingTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.studentAddExistingBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentForgetTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.studentForgetBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentUnsharedTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.studentUnsharedBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentDeleteTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.studentDeleteBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentMultipleTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.studentMultipleBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentTransferTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.studentTransferBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentEndTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.studentEndBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentDataTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.studentDataBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentPrivacyLawsTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="teacherfaq.studentPrivacyLawsBody"
                            values={{
                                privacyPolicyLink: (
                                    <a href="https://scratch.mit.edu/privacy_policy">
                                        <FormattedMessage id="teacherfaq.privacyPolicy" />
                                    </a>
                                )
                            }}
                        />
                    </dd>
                </dl>
            </section>
            <section id="community">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="teacherfaq.commTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="teacherfaq.commHiddenTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.commHiddenBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.commWhoTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.commWhoBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.commTurnOffCommentsTitle" /></dt>
                    <dd>
                        <FormattedHTMLMessage
                            id="teacherfaq.commTurnOffCommentsBody"
                            values={{
                                desktopLink: (
                                    <a href="https://scratch.mit.edu/download/">
                                        Scratch Desktop app
                                    </a>
                                )
                            }}
                        />
                    </dd>
                    <dt><FormattedMessage id="teacherfaq.commBlockGamesTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.commBlockGamesBody1" /></dd>
                    <dd><FormattedHTMLMessage id="teacherfaq.commBlockGamesBody2" /></dd>
                    <dt><FormattedMessage id="teacherfaq.commInappropriateTitle" /></dt>
                    <dd><FormattedHTMLMessage id="teacherfaq.commInappropriateBody" /></dd>
                </dl>
            </section>
        </div>
        <nav>
            <ol>
                <li>
                    <a href="#teacher-accounts">
                        <FormattedMessage id="teacherfaq.title" />
                    </a>
                </li>
                <li>
                    <a href="#student-accounts">
                        <FormattedMessage id="teacherfaq.studentAccountsTitle" />
                    </a>
                </li>
                <li>
                    <a href="#community">
                        <FormattedMessage id="teacherfaq.commTitle" />
                    </a>
                </li>
            </ol>
        </nav>
    </InformationPage>
);

TeacherFaq.propTypes = {
    intl: intlShape
};

const IntlTeacherFaq = injectIntl(TeacherFaq);

render(<Page><IntlTeacherFaq /></Page>, document.getElementById('app'));
