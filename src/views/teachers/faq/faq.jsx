var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var injectIntl = require('react-intl').injectIntl;
var React = require('react');
var render = require('../../../lib/render.jsx');

var Page = require('../../../components/page/www/page.jsx');
var InformationPage = require('../../../components/informationpage/informationpage.jsx');

var TeacherFaq = injectIntl(React.createClass({
    type: 'TeacherFaq',
    render: function () {
        var formatMessage = this.props.intl.formatMessage;
        return (
            <InformationPage title={formatMessage({id: 'teacherfaq.title'})}>
                <div className="inner info-inner">
                    <section id="teacher-accounts">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='teacherfaq.title' /></h2>
                        <dl>
                            <dt><FormattedMessage id='teacherfaq.teacherWhatTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.teacherWhatBody' /></dd>
                            <iframe width="565" height="318" src="https://www.youtube.com/embed/7Hl9GxA1zwQ"
                            frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                            <dt><FormattedMessage id='teacherfaq.teacherQuestionsTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.teacherQuestionsBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.teacherConvertTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.teacherConvertBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.teacherGoogleTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.teacherGoogleBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.teacherEdTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.teacherEdBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.teacherWaitTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.teacherWaitBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.teacherPersonalTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.teacherPersonalBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.teacherMultipleTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.teacherMultipleBody' /></dd>
                        </dl>
                    </section>
                    <section id="student-accounts">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='teacherfaq.studentAccountsTitle' /></h2>
                        <dl>
                            <dt><FormattedMessage id='teacherfaq.studentVerifyTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.studentVerifyBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.studentEndTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.studentEndBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.studentForgetTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.studentForgetBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.studentUnsharedTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.studentUnsharedBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.studentDeleteTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.studentDeleteBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.studentAddTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.studentAddBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.studentMultipleTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.studentMultipleBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.studentDiscussTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.studentDiscussBody' /></dd>
                        </dl>
                    </section>
                    <section id="community">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='teacherfaq.commTitle' /></h2>
                        <dl>
                            <dt><FormattedMessage id='teacherfaq.commHiddenTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.commHiddenBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.commWhoTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.commWhoBody' /></dd>
                            <dt><FormattedMessage id='teacherfaq.commInappropriateTitle' /></dt>
                            <dd><FormattedHTMLMessage id='teacherfaq.commInappropriateBody' /></dd>
                        </dl>
                    </section>
                </div>
                <nav>
                    <ol>
                        <li>
                            <a href="#teacher-accounts">
                                <FormattedMessage id='teacherfaq.title' />
                            </a>
                        </li>
                        <li>
                            <a href="#student-accounts">
                                <FormattedMessage id='teacherfaq.studentAccountsTitle' />
                            </a>
                        </li>
                        <li>
                            <a href="#community">
                                <FormattedMessage id='teacherfaq.commTitle' />
                            </a>
                        </li>
                    </ol>
                </nav>
            </InformationPage>
        );
    }
}));

render(<Page><TeacherFaq /></Page>, document.getElementById('app'));
