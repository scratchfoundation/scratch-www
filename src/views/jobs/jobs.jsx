const React = require('react');
const render = require('../../lib/render.jsx');
const FormattedMessage = require('react-intl').FormattedMessage;

const Page = require('../../components/page/www/page.jsx');

require('./jobs.scss');

const Jobs = () => (
    <div className="jobs">
        <div className="top">
            <div className="inner">
                <img src="/images/jobs.png" />
                <h2><FormattedMessage id="jobs.titleQuestion" /></h2>
            </div>
        </div>

        <div className="middle">
            <div className="inner">
                <h3><FormattedMessage id="jobs.joinScratchTeam" /></h3>
                <p><FormattedMessage id="jobs.info" /></p>
                <p><FormattedMessage id="jobs.workEnvironment" /></p>
            </div>
        </div>

        <div className="bottom">
            <div className="inner">
                <h3><FormattedMessage id="jobs.openings" /></h3>
                {/* <FormattedMessage id="jobs.nojobs" /> */}
                <ul>
                    <li>
                        <a href="https://scratch.mit.edu/jobs/moderator">
                            Community Moderator
                        </a>
                        <span>
                            Remote
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

render(<Page><Jobs /></Page>, document.getElementById('app'));
