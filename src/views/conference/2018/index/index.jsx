const React = require('react');
const render = require('../../../../lib/render.jsx');

const Button = require('../../../../components/forms/button.jsx');
const FlexRow = require('../../../../components/flex-row/flex-row.jsx');
const Page = require('../../../../components/page/conference/2018/page.jsx');
const TitleBanner = require('../../../../components/title-banner/title-banner.jsx');

require('./index.scss');

const ConferenceSplash = () => (
    <div className="index mod-2016">
        <TitleBanner className="mod-conference">
            <h1>
                Scratch: The Next Generation
            </h1>
            <h3>
                July 26-28, 2018 | Cambridge, MA, USA
            </h3>
            <h3>
                <a href="http://www.media.mit.edu/events/medialabtalk/">
                    Watch the keynotes live 7/26-7/28 at 9:30 a.m. EDT
                </a>
            </h3>
            <p>
                <a href="/conference/2018/schedule">
                    <Button>
                        See the Schedule
                    </Button>
                </a>
            </p>
        </TitleBanner>
        <section className="inner">
            <FlexRow>
                <div>
                    <h3>
                        <a href="/conference/2018/expect">
                            <img
                                alt="expect-image"
                                src="/images/conference/expect/what-to-expect.png"
                            />
                            What to Expect
                        </a>
                    </h3>
                    <p>
                        Learn more about participating in Scratch@MIT
                    </p>
                </div>
                <div>
                    <h3>
                        <a href="/conference/2018/plan">
                            <img
                                alt="plan-image"
                                src="/images/conference/plan/plan-your-visit.png"
                            />
                            Plan Your Visit
                        </a>
                    </h3>
                    <p>
                        Information on traveling, staying, and exploring around the Media Lab
                    </p>
                </div>
                <div>
                    <h3>
                        <a href="/conference/2018/schedule">
                            <img
                                alt="schedule"
                                src="/images/conference/schedule/2018/schedule.png"
                            />
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

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
