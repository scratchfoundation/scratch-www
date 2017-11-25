import React from 'react';
import render from '../../lib/render.jsx';
import {FormattedMessage} from 'react-intl';

import Page from '../../components/page/www/page.jsx';

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
                                <a href="https://www.media.mit.edu/about/job-opportunities/junior-web-designer-scratch/">
                                    Junior Designer
                                </a>
                                <span>
                                    MIT Media Lab, Cambridge, MA
                                </span>
                            </li>
                            <li>
                                <a href="https://www.media.mit.edu/about/job-opportunities/qa-engineer-scratch/">
                                    QA Engineer
                                </a>
                                <span>
                                    MIT Media Lab, Cambridge, MA
                                </span>
                            </li>
                            <li>
                                <a href="https://www.media.mit.edu/about/job-opportunities/senior-backend-engineer-scratch-1/">
                                    Senior Backend Engineer
                                </a>
                                <span>
                                    MIT Media Lab, Cambridge, MA
                                </span>
                            </li>
                            <li>
                                <a href="https://www.media.mit.edu/about/job-opportunities/learning-resources/">
                                    Learning Resource Designer
                                </a>
                                <span>
                                    MIT Media Lab, Cambridge, MA
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
