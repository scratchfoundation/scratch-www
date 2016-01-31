var React = require('react');
var render = require('../../lib/render.jsx');
var FormattedMessage = require('react-intl').FormattedMessage;

require('./jobs.scss');

var Jobs = React.createClass({
    type: 'Jobs',
    render: function () {
        return (
            <div>
                <div className="top">
                    <div className="inner">
                        <img src="/images/jobs.png" />
                        <h1><FormattedMessage id='jobs.titleQuestion' /></h1>
                    </div>
                </div>

                <div className="middle">
                    <div className="inner">
                        <h2><FormattedMessage id='jobs.joinScratchTeam' /></h2>
                        <p><FormattedMessage id='jobs.info' /></p>
                        <p><FormattedMessage id='jobs.workEnvironment' /></p>
                    </div>
                </div>

                <div className="bottom">
                    <div className="inner">
                        <h2><FormattedMessage id='jobs.openings' /></h2>
                        <p>
                            <a href="/jobs/learning-developer">
                                <FormattedMessage id='jobs.learningDeveloper' />
                            </a>
                            <i> (MIT Media Lab, Cambridge, MA)</i>
                        </p>
                        <p>
                            <a href="/jobs/moderator">
                                <FormattedMessage id='jobs.moderator' />
                            </a>
                            <i> (MIT Media Lab, Cambrige, MA or Remote)</i>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
});

render(<Jobs />, document.getElementById('view'));
