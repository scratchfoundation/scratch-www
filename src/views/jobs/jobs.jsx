var React = require('react');
var render = require('../../lib/render.jsx');
var FormattedMessage = require('react-intl').FormattedMessage;

require('./jobs.scss');

var Jobs = React.createClass({
    type: 'Jobs',
    render: function () {
        return (
            <div className="inner">
                <div className="top">
                    <img src="/images/jobs.png" />
                    <p>
                        <FormattedMessage id='jobs.titleQuestion' />
                    </p>
                </div>
                <div className="middle">
                    <div className="info">
                        <div className="leftcolumn">
                        <div className="thin-heading">
                            <p>
                                <FormattedMessage id='jobs.joinScratchTeam' />
                            </p>
                        </div>
                        <p>
                            <FormattedMessage id='jobs.info' />
                        </p>
                        <p>
                            <FormattedMessage id='jobs.workEnvironment' />
                        </p>
                        </div>
                        <div className="rightcolumn">
                        <img src="/images/scratch_team.png" />
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="thin-heading">
                            <p>
                                <FormattedMessage id='jobs.openings' />
                            </p>
                    </div>
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
        );
    }
});

render(<Jobs />, document.getElementById('view'));
