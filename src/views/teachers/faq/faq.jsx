const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const Page = require('../../../components/page/www/page.jsx');
const intlShape = require('../../../lib/intl-shape');
const render = require('../../../lib/render.jsx');

const InformationPage = require('../../../components/informationpage/informationpage.jsx');

const RequestFormLink = chunks => <a href="/educators/register">{chunks}</a>;
const ScratchEdLink = chunks => <a href="http://scratched.gse.harvard.edu/">{chunks}</a>;

const TeacherFaq = props => (
    <InformationPage title={props.intl.formatMessage({id: 'teacherfaq.title'})}>
        <div className="inner info-inner">
            <section id="educator-questions">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="teacherfaq.educatorTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="teacherfaq.educatorGetStartedTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="teacherfaq.educatorGetStartedBody"
                            values={{
                                educatorResourcesLink: (
                                    <a href="/educators#resources">
                                        <FormattedMessage id="teacherfaq.educatorResourcesLink" />
                                    </a>
                                )
                            }}
                        />
                    </dd>
                </dl>
            </section>
            <section id="teacher-accounts">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="teacherfaq.title" /></h2>
                <dl>
                    <dt><FormattedMessage id="teacherfaq.teacherWhatTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.teacherWhatBody" /></dd>
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
                    <dd><FormattedMessage
                        id="teacherfaq.teacherSignUpBodyHTML"
                        values={{a: RequestFormLink}}
                    /></dd>
                    <dt><FormattedMessage id="teacherfaq.classMultipleTeachersTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.classMultipleTeachersBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.teacherPersonalTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.teacherPersonalBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.teacherGoogleTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.teacherGoogleBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentDiscussTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="teacherfaq.studentDiscussionBody"
                            values={{
                                scratchEdLink: (
                                    <a href="http://scratched.gse.harvard.edu/">ScratchEd</a>
                                ),
                                facebookGroupLink: (
                                    <a href="https://www.facebook.com/groups/TeachingwithScratch">
                                        <FormattedMessage id="teacherfaq.facebookGroup" />
                                    </a>
                                ),
                                creativeComputingLabLink: (
                                    <a href="https://creativecomputing.gse.harvard.edu">
                                        <FormattedMessage id="teacherfaq.creativeComputingLab" />
                                    </a>
                                )
                            }}
                        />
                    </dd>
                    <dt><FormattedMessage id="teacherfaq.teacherEdTitle" /></dt>
                    <dd><FormattedMessage
                        id="teacherfaq.teacherEdBodyHTML"
                        values={{a: ScratchEdLink}}
                    /></dd>
                    <dt><FormattedMessage id="teacherfaq.teacherFeaturesTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.teacherFeaturesBody" /></dd>
                    <ul>
                        <li><FormattedMessage id="teacherfaq.teacherFeaturesConvert" /></li>
                        <li><FormattedMessage id="teacherfaq.teacherMoveStudents" /></li>
                        <li><FormattedMessage id="teacherfaq.teacherMultipleClasses" /></li>
                        <li><FormattedMessage id="teacherfaq.teacherLMSs" /></li>
                        <li><FormattedMessage id="teacherfaq.teacherLimitStudent" /></li>
                    </ul>
                    <dd><FormattedMessage id="teacherfaq.teacherWillNotImplement" /></dd>
                </dl>
            </section>
            <section id="student-accounts">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="teacherfaq.studentAccountsTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="teacherfaq.studentVerifyTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.studentVerifyBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentAddExistingTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.studentAddExistingBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentForgetTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.studentForgetBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentUnsharedTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.studentUnsharedBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentDeleteTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="teacherfaq.studentDeleteBody"
                            values={{
                                accountSettingsLink: (
                                    <a href="https://scratch.mit.edu/accounts/settings/">
                                        <FormattedMessage id="teacherfaq.accountSettings" />
                                    </a>
                                )
                            }}
                        />
                    </dd>
                    <dt><FormattedMessage id="teacherfaq.studentMultipleTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.studentMultipleBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentTransferTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.studentTransferBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.studentEndTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.studentEndBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.student250Title" /></dt>
                    <dd>
                        <FormattedMessage
                            id="teacherfaq.student250Body"
                            values={{
                                myClassesLink: (
                                    <a href="https://scratch.mit.edu/educators/classes/">
                                        <FormattedMessage id="teacherfaq.myClasses" />
                                    </a>
                                )
                            }}
                        />
                    </dd>
                    <dt><FormattedMessage id="teacherfaq.studentDataTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.studentDataBody" /></dd>
                    <dd>
                        <FormattedMessage
                            id="teacherfaq.studentDataBody2"
                            values={{
                                privacyPolicyLink: (
                                    <a href="https://scratch.mit.edu/privacy_policy">
                                        <FormattedMessage id="teacherfaq.privacyPolicy" />
                                    </a>
                                )
                            }}
                        />
                    </dd>
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
                    <dd><FormattedMessage id="teacherfaq.commHiddenBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.commWhoTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.commWhoBody" /></dd>
                    <dt><FormattedMessage id="teacherfaq.commTurnOffCommentsTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="teacherfaq.commTurnOffCommentsBody"
                            values={{
                                desktopLink: (
                                    <a href="https://scratch.mit.edu/download">
                                        Scratch Desktop app
                                    </a>
                                )
                            }}
                        />
                    </dd>
                    <dt><FormattedMessage id="teacherfaq.commBlockGamesTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.commBlockGamesBody1" /></dd>
                    <dd><FormattedMessage id="teacherfaq.commBlockGamesBody2" /></dd>
                    <dt><FormattedMessage id="teacherfaq.commInappropriateTitle" /></dt>
                    <dd><FormattedMessage id="teacherfaq.commInappropriateBody" /></dd>
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
