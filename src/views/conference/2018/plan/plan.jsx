const bindAll = require('lodash.bindall');
const React = require('react');

const Button = require('../../../../components/forms/button.jsx');
const FlexRow = require('../../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../../components/title-banner/title-banner.jsx');

const render = require('../../../../lib/render.jsx');
const Page = require('../../../../components/page/conference/2018/page.jsx');


require('./plan.scss');

class ConferencePlan extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleQuestion'
        ]);
        this.state = {
            dorm: false
        };
    }
    toggleQuestion (element) {
        this.setState({element: !this.state[element]});
    }
    render () {
        return (
            <div className="plan">
                <TitleBanner className="mod-conference">
                    <h1>
                        Plan Your Visit
                    </h1>
                    <div className="title-icon">
                        <img
                            alt="plan-image"
                            src="/images/conference/plan/plan-your-visit.png"
                        />
                    </div>
                </TitleBanner>
                <div className="inner">
                    <section className="lodging">
                        <FlexRow className="uneven">
                            <div className="long">
                                <h2>Lodging</h2>
                                <p>
                                    MIT partners with several hotels in the area who offer discounts to{' '}
                                    participants attending MIT events, including:
                                </p>
                                <FlexRow>
                                    <FlexRow className="column">
                                        <p>
                                            <a href="http://bit.ly/P0kTKy">
                                                Boston Marriott Cambridge
                                            </a>
                                            <br />
                                            <span>(Kendall Square, 0.4 miles from the MIT Media Lab)</span>
                                        </p>
                                        <p>
                                            <a href="http://bit.ly/2459rhL">
                                                Holiday Inn Express and Suites
                                            </a>
                                            <br />
                                            <span>(Lechmere Station, 1.6 miles)</span>
                                        </p>
                                    </FlexRow>
                                    <FlexRow className="column">
                                        <p>
                                            <a href="http://bit.ly/1qbQNmO">
                                                Residence Inn
                                            </a>
                                            <br />
                                            <span>(Kendall Square, 0.3 miles)</span>
                                        </p>
                                        <p>
                                            <a href="http://lemerid.ie/1Kt3TDF">
                                                Le Meridien
                                            </a>
                                            <br />
                                            <span>(between Central and Kendall Squares, 0.9 miles)</span>
                                        </p>
                                    </FlexRow>
                                </FlexRow>
                                <p>
                                    To reserve a room at one of these hotels, call the hotel and request the{' '}
                                    &#34;MIT discount&#34;. Advance booking is strongly recommended, as{' '}
                                    summer is a busy time in Boston. All MIT rates are subject to availability.
                                </p>
                                <p>
                                    If you are looking for additional accommodation options, we also recommend the {' '}
                                    <a href="http://www.marriott.com/meeting-event-hotels/group-corporate-travel/groupCorp.mi?resLinkData=Scratch%20Conference%5EBOSAR%60sccscca%7Csccsccb%60229%60USD%60false%604%607/25/18%607/28/18%607/4/18&app=resvlink&stop_mobi=yes">
                                        AC Hotel Boston Cambridge
                                    </a> (7.1 miles from the MIT Media Lab),{' '}
                                    <a href="https://secure3.hilton.com/en_US/dt/reservation/book.htm?inputModule=HOTEL&ctyhocn=BOSCODT&spec_plan=CDTMIT&arrival=20180725&departure=20180728&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT">
                                        DoubleTree by Hilton Hotel Boston - Downtown
                                    </a> (3.3 miles),{' '}
                                    and <a href="https://www.hotelboston.com/">
                                        Hotel Boston
                                    </a> with the code MITSC2018 (5.3 miles).{' '}
                                </p>
                                <p>
                                    You might also consider home-share options such as Airbnb.
                                </p>
                            </div>
                            <div className="short">
                                <img
                                    alt="Lodging Illustration"
                                    src="/images/conference/plan/lodging.png"
                                />
                            </div>
                        </FlexRow>
                    </section>
                    <section className="transportation">
                        <FlexRow className="uneven">
                            <div className="long">
                                <h2>Transportation</h2>
                                <p>
                                    The <a href="https://whereis.mit.edu/?go=E14">MIT Media Lab</a> is located{' '}
                                    in Kendall Square, Cambridge, MA, a 5-minute walk from the Kendall/MIT stop of{' '}
                                    MBTA Red Line subway. Cambridge is a bike-friendly, walkable city, and{' '}
                                    public transportation is encouraged. The MBTA provides free services from{' '}
                                    Boston Logan Airport to the South Station subway stop as well.
                                </p>
                                <p>
                                    Learn about{' '}
                                    <a href="https://www.media.mit.edu/posts/directions-and-parking/">
                                        driving, parking, and public transportation options
                                    </a> around the MIT Media Lab.
                                </p>
                                <p>
                                    <a href="http://web.mit.edu/facilities/transportation/parking/visitors/public_parking.html">
                                        Public parking facilities
                                    </a> are available near campus for a fee.
                                </p>
                                <p>
                                    Learn about additional{' '}
                                    <a href="http://www.cityofboston.gov/transportation/modes.asp">
                                        transportation options in Cambridge and Boston
                                    </a>.
                                </p>
                            </div>
                            <div className="short">
                                <img
                                    alt="Transportation Illustration"
                                    src="/images/conference/plan/transportation.png"
                                />
                            </div>
                        </FlexRow>
                    </section>
                    <section className="explore">
                        <h2>Exploring Cambridge</h2>
                        <div>
                            <p>
                                Boston is a city full of history and diverse neighborhoods. Check some{' '}
                                of these attractions to experience the city’s rich cultural offerings:
                            </p>
                            <ul>
                                <li>
                                    <a href="http://www.trolleytours.com/boston/">
                                        Beantown Trolley Tour
                                    </a>
                                </li>
                                <li>
                                    <a href="http://www.bostonducktours.com/">
                                        Boston Duck Tours
                                    </a>
                                </li>
                                <li>
                                    <a href="http://www.bostonteapartyship.com/">
                                        Boston Tea Party Ship &amp; Museum
                                    </a>
                                </li>
                                <li>
                                    <a href="http://www.faneuilhallmarketplace.com/">
                                        Faneuil Hall Marketplace
                                    </a>
                                </li>
                                <li>
                                    <a href="http://www.thefreedomtrail.org/">
                                        Freedom Trail Walking Tours
                                    </a>
                                </li>
                                <li>
                                    <a href="http://www.hmnh.harvard.edu/">
                                        Harvard Museum of Natural History
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.icaboston.org/">
                                        Institute of Contemporary Art
                                    </a>
                                </li>
                                <li>
                                    <a href="http://www.gardnermuseum.org/home">
                                        Isabella Stewart Gardner  Museum
                                    </a>
                                </li>
                                <li>
                                    <a href="http://www.jfklibrary.org/">
                                        John F. Kennedy Library &amp; Museum
                                    </a>
                                </li>
                                <li>
                                    <a href="http://web.mit.edu/museum/">
                                        MIT Museum
                                    </a>
                                </li>
                                <li>
                                    <a href="http://www.mfa.org/">
                                        Museum of Fine Arts
                                    </a>
                                </li>
                                <li>
                                    <a href="http://www.mos.org/">
                                        Museum Of Science
                                    </a>
                                </li>
                                <li>
                                    <a href="http://www.neaq.org/index.php">
                                        New England Aquarium
                                    </a>
                                </li>
                                <li>
                                    <a href="https://ussconstitutionmuseum.org/">
                                        USS Constitution
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p>
                                Try some Scratch Team favorites for snacking and dining around the Lab:
                            </p>
                            <ul>
                                <li>
                                    A4 Pizza
                                </li>
                                <li>
                                    Abigail’s
                                </li>
                                <li>
                                    Bailey and Sage
                                </li>
                                <li>
                                    Clover
                                </li>
                                <li>
                                    Commonwealth
                                </li>
                                <li>
                                    Legal Seafood
                                </li>
                                <li>
                                    Meadhall
                                </li>
                                <li>
                                    Sebastian’s
                                </li>
                                <li>
                                    Tatte
                                </li>
                                <li>
                                    Za
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="faq last">
                        <FlexRow className="uneven">
                            <div className="long">
                                <h2>FAQ</h2>
                                <dl>
                                    <dt>
                                        The conference is sold out. What can I do?
                                    </dt>
                                    <dd>
                                        Scratch@MIT is sold out and at capacity. Regrettably, we are{' '}
                                        unable to add any additional guests. Please keep in mind that{' '}
                                        you must have registered on Eventbrite to attend Scratch@MIT;{' '}
                                        people who are not registered / do not have a ticket will not be{' '}
                                        able to attend the conference.
                                    </dd>

                                    <dt>
                                        I missed the submission deadline. Can I still submit a proposal for{' '}
                                        the conference?
                                    </dt>
                                    <dd>
                                        We are no longer accepting proposal submissions.
                                    </dd>

                                    <dt>
                                        I can only attend one day of the conference. Do you offer single-day{' '}
                                        registration?
                                    </dt>
                                    <dd>
                                        Sorry, we are not offering single-day tickets.
                                    </dd>

                                    <dt>
                                        Can I receive a visa letter?
                                    </dt>
                                    <dd>
                                        Yes. Contact us at{' '}
                                        <a href="mailto:conference@scratch.mit.edu">conference@scratch.mit.edu</a>{' '}
                                        and we can email you a letter.
                                    </dd>

                                    <dt>
                                        In previous years, there was an event on Wednesday evening before the{' '}
                                        conference. Will you be hosting something similar this year?
                                    </dt>
                                    <dd>
                                        There will be an informal, optional reception the evening of Wednesday,{' '}
                                        July 25. Participants may register early at this time as well.
                                    </dd>

                                    <dt>
                                        What should I bring?
                                    </dt>
                                    <dd>
                                        Plan to bring your personal device (laptops are preferred) and power cord.{' '}
                                        Presenters should plan to bring all additional presentation materials{' '}
                                        (we will provide projectors and screens). Snacks and beverages will be{' '}
                                        available throughout the day.
                                    </dd>
                                </dl>
                            </div>
                            <div className="short">
                                <h3>Have Additional Questions?</h3>
                                <a href="mailto:conference@scratch.mit.edu">
                                    <Button>Email Us</Button>
                                </a>
                            </div>
                        </FlexRow>
                    </section>
                </div>
            </div>
        );
    }
}

render(<Page><ConferencePlan /></Page>, document.getElementById('app'));
