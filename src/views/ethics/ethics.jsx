const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const Ethics = () => (
    <InformationPage
        title={
            <FormattedMessage id="ethics.title" />
        }
    >
        <div className="inner info-inner">
            <span className="nav-spacer" />

            <p><FormattedMessage id="ethics.intro1" /></p>
            <p><FormattedMessage id="ethics.intro2" /></p>

            <p><FormattedMessage
                id="ethics.principle1"
                values={{
                    title: (
                        <strong>
                            <FormattedMessage id="ethics.principle1Title" />
                        </strong>
                    ),
                    researchEmailLink: (
                        <a href="mailto:research@scratchfoundation.org">
                            research@scratchfoundation.org
                        </a>
                    )
                }}
            /></p>

            <p><FormattedMessage
                id="ethics.principle2"
                values={{
                    title: (
                        <strong>
                            <FormattedMessage id="ethics.principle2Title" />
                        </strong>
                    )
                }}
            /></p>

            <p><FormattedMessage
                id="ethics.principle3"
                values={{
                    title: (
                        <strong>
                            <FormattedMessage id="ethics.principle3Title" />
                        </strong>
                    )
                }}
            /></p>

            <span className="nav-spacer" />
        </div>
    </InformationPage>
);

render(<Page><Ethics /></Page>, document.getElementById('app'));
