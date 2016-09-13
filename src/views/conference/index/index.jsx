var React = require('react');
var render = require('../../../lib/render.jsx');

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
                        August 4 - 6, 2016 | Cambridge, MA, USA
                    </h3>
                    <p>
                        <a href="/conference/schedule">
                            <Button>
                                See the Schedule
                            </Button>
                        </a>
                    </p>
                    <p className="sub-button">
                        <b>
                            <a href="https://youtu.be/alsfSTVn2es?list=PLpfxVARjkP-8chnTrjtDeo88Pcz6-xf_B" target="_blank">
                                Watch videos of the keynote sessions
                            </a>
                        </b>
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
                                <a href="/conference/schedule">
                                    <img src="/images/conference/schedule/schedule.png" alt="schedule" />
                                    Schedule
                                </a>
                            </h3>
                            <p>
                                Full schedule of events and sessions
                            </p>
                        </div>
                    </FlexRow>
                </section>
            </div>
        );
    }
});

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
