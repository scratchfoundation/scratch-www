var React = require('react');
var render = require('../../lib/render.jsx');
var FormattedMessage = require('react-intl').FormattedMessage;

var Page = require('../../components/page/www/page.jsx');

require('./jobs.scss');

var Jobs = React.createClass({
    type: 'Jobs',
    render: function () {
        return (
            <div className="jobs">
                <div className="top">
                    <div className="inner">
                        <img src="/images/jobs.png" />
                        <h2><FormattedMessage id='jobs.titleQuestion' /></h2>
                    </div>
                </div>

                <div className="middle">
                    <div className="inner">
                        <h3><FormattedMessage id='jobs.joinScratchTeam' /></h3>
                        <p><FormattedMessage id='jobs.info' /></p>
                        <p><FormattedMessage id='jobs.workEnvironment' /></p>
                    </div>
                </div>

                <div className="bottom">
                    <div className="inner">
                        <h3><FormattedMessage id='jobs.openings' /></h3>
                        <ul>
                            <li>
                                <a href="/jobs/moderator">
                                    Community Moderator
                                </a>
                                <span>
                                    MIT Media Lab, Cambridge, MA (or Remote)
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

render(<Page><Jobs /></Page>, document.getElementById('app'));
