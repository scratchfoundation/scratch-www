const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const Dmca = () => (
    <InformationPage title={'DMCA'}>
        <div className="inner info-inner">
            <span className="nav-spacer" />

            <p><FormattedMessage id="dmca.intro" /></p>
            <p>
                Copyright Agent / Mitchel Resnick<br />
                MIT Media Laboratory<br />
                77 Massachusetts Ave<br />
                Room E14-445A<br />
                Cambridge, MA 02139<br />
                Tel: (617) 253-9783
            </p>
            <p><FormattedMessage id="dmca.llkresponse" /></p>
            <p><FormattedMessage id="dmca.assessment" /></p>
            <p><FormattedMessage id="dmca.eyetoeye" /></p>
            <p><FormattedMessage id="dmca.afterfiling" /></p>

            <h3><FormattedMessage id="dmca.counternotification" /></h3>
            <p><FormattedMessage id="dmca.ifremoved" /></p>
            <p><FormattedMessage id="dmca.mailcounter" /></p>
            <p>
                Copyright Agent / Mitchel Resnick<br />
                MIT Media Laboratory<br />
                77 Massachusetts Ave<br />
                Room E14-445A<br />
                Cambridge, MA 02139<br />
                Tel: (617) 253-9783
            </p>
            <p><FormattedMessage id="dmca.mustinclude" /></p>
            <p>
                <ul>
                    <li><FormattedMessage id="dmca.fullname" /></li>
                    <li><FormattedMessage id="dmca.address" /></li>
                    <li><FormattedMessage id="dmca.phone" /></li>
                    <li><FormattedMessage id="dmca.email" /></li>
                    <li><FormattedMessage id="dmca.username" /></li>
                    <li><FormattedMessage id="dmca.projecturl" /></li>
                    <li><FormattedMessage id="dmca.statementerror" /></li>
                    <li><FormattedMessage id="dmca.statementjurisdiction" /></li>
                    <li><FormattedMessage id="dmca.signature" /></li>
                </ul>
            </p>
            <p><FormattedMessage id="dmca.valid" /></p>
            <p><FormattedMessage id="dmca.lawsuit" /></p>

            <h3><FormattedMessage id="dmca.repeat" /></h3>
            <p><FormattedMessage id="dmca.disableaccess" /></p>

            <span className="nav-spacer" />

        </div>
    </InformationPage>
);

render(<Page><Dmca /></Page>, document.getElementById('app'));
