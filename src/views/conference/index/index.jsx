var React = require('react');
var ReactDOM = require('react-dom');

var Button = require('../../../components/forms/button.jsx');
var FlexRow = require('../../../components/flex-row/flex-row.jsx');
var Page = require('../../../components/page/conference/page.jsx');
var TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./index.scss');

var ConferenceSplash = React.createClass({
    type: 'ConferenceSplash',

    render: function () {
        return (
            <div className="index">
                <TitleBanner>
                    <h1>
                        Many Paths, Many Styles
                    </h1>
                    <h3>
                        Scratch Conference 2016 | Cambridge, MA, USA
                    </h3>
                    <p>
                        <a href="//scratchconference2016.eventbrite.com">
                            <Button>
                                Register Now
                            </Button>
                        </a>
                    </p>
                </TitleBanner>
                <section className="inner">
                    <FlexRow>
                        <div>
                            <h3>
                                <a href="/conference/expect">
                                    <img src="/images/conference/expect/what-to-expect.png" alt="expect-image" />
                                    What to Expect
                                </a>
                            </h3>
                            <p>
                                Learn more about participating in Scratch@MIT
                            </p>
                        </div>
                        <div>
                            <h3>
                                <a href="/conference/plan">
                                    <img src="/images/conference/plan/plan-your-visit.png" alt="plan-image" />
                                    Plan Your Visit
                                </a>
                            </h3>
                            <p>
                                Information on traveling, staying, and exploring around the Media Lab
                            </p>
                        </div>
                        <div>
                            <h3>
                                <img src="/images/conference/schedule/coming-soon.png" alt="schedule-coming-soon" />
                                Schedule
                            </h3>
                            <p>
                                Stay tuned for the full schedule of events and sessions
                            </p>
                        </div>
                    </FlexRow>
                </section>
            </div>
        );
    }
});

ReactDOM.render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
