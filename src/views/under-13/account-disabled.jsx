const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const Under13AccountDisabled = () => (
    <InformationPage
        title={
            <FormattedMessage id="under13AccountDisabled.title" />
        }
    >
        <div className="inner info-inner">
            <span className="nav-spacer" />

            <p><FormattedMessage id="under13AccountDisabled.description" /></p>

            <span className="nav-spacer" />
        </div>
    </InformationPage>
);

render(<Page><Under13AccountDisabled /></Page>, document.getElementById('app'));
