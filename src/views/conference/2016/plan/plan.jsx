const bindAll = require('lodash.bindall');
const React = require('react');

const Button = require('../../../../components/forms/button.jsx');
const FlexRow = require('../../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../../components/title-banner/title-banner.jsx');

const Page = require('../../../../components/page/conference/2016/page.jsx');
const render = require('../../../../lib/render.jsx');

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
                                    MIT partners with several hotels in the area:
                                </p>
                                <FlexRow>
                                    <FlexRow className="column">
                                        <p>
                                            <a href="http://bit.ly/P0kTKy">
                                                Boston Marriott Cambridge
                                            </a>
                                            <br />
                                            <span>(Kendall Square)</span>
                                        </p>
                                        <p>
                                            <a href="http://bit.ly/2459rhL">
                                                Holiday Inn Express and Suites
                                            </a>
                                            <br />
                                            <span>(Lechmere Station)</span>
                                        </p>
                                    </FlexRow>
                                    <FlexRow className="column">
                                        <p>
                                            <a href="http://bit.ly/1qbQNmO">
                                                Residence Inn
                                            </a>
                                            <br />
                                            <span>(Kendall Square)</span>
                                        </p>
                                        <p>
                                            <a href="http://lemerid.ie/1Kt3TDF">
                                                Le Meridien
                                            </a>
                                            <br />
                                            <span>(between Central and Kendall Squares)</span>
                                        </p>
                                    </FlexRow>
                                </FlexRow>
                                <p>
                                    To reserve a room, <b>call the hotel and request the{' '}
                                    &#34;MIT discount&#34;</b> (subject to availability).
                                </p>
                                <p>
                                    We also suggest the{' '}
                                    <a href="http://bit.ly/1Ss6jKP">
                                        Best Western Hotel Tria
                                    </a>{' '}
                                    located near Alewife Station on the Red Line subway line{' '}
                                    (note: no MIT discount available), and home-share options such as Airbnb.{' '}
                                    Find an extended list of accommodations{' '}
                                    <a href="http://www.media.mit.edu/contact/accommodations">
                                        here
                                    </a>.
                                </p>
                                <p>
                                    For those seeking a lower-cost option, there are limited single and double{' '}
                                    dorms available at{' '}
                                    <a href="http://www.northeastern.edu/">
                                        Northeastern University
                                    </a> in downtown Boston off of the Orange Line. To request a dorm room,{' '}
                                    please email{' '}
                                    <a href="mailto:conference@scratch.mit.edu">
                                        conference@scratch.mit.edu
                                    </a> with the subject line “Conference dorm room” before June 1. Please{' '}
                                    note that the dorms are a half-hour commute from MIT via{' '}
                                    <a href="http://www.mbta.com/schedules_and_maps/subway/">
                                        public transportation
                                    </a>.
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
                                    <a href="http://www.media.mit.edu/contact/directions/public-transportation">
                                        public transportation
                                    </a> is encouraged. The MBTA provides free services from Boston Logan Airport{' '}
                                    to the South Station subway stop as well.
                                </p>
                                <p>
                                    <a href="http://www.media.mit.edu/contact/directions/parking">
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
                                        Who is this conference for?
                                    </dt>
                                    <dd>
                                        The Scratch Conference is a gathering of adult educators, developers,{' '}
                                        researchers, and others who focus on helping young people create and{' '}
                                        learn with Scratch.
                                    </dd>

                                    <dt>
                                        I missed the submission deadline. Can I still submit a proposal for{' '}
                                        the conference?
                                    </dt>
                                    <dd>
                                        Proposal submissions are now closed.
                                    </dd>

                                    <dt>
                                        I can only attend one day of the conference. Do you offer single-day{' '}
                                        registration?
                                    </dt>
                                    <dd>
                                        We are not offering single-day tickets.
                                    </dd>

                                    <dt>
                                        Can I receive a visa letter?
                                    </dt>
                                    <dd>
                                        Yes. Contact us at conference@scratch.mit.edu and we can email you a letter.
                                    </dd>

                                    <dt>
                                        What should I bring?
                                    </dt>
                                    <dd>
                                        Plan to bring your personal device (laptops are preferred) and power cord.{' '}
                                        Presenters should plan to bring all additional presentation materials (we{' '}
                                        will provide projectors and screens). Breakfast and lunch will be served;{' '}
                                        snacks and beverages will be available throughout the day.
                                    </dd>

                                    <dt>
                                        How can I cancel my registration?
                                    </dt>
                                    <dd>
                                        Contact us at a conference@scratch.mit.edu with your registration number,{' '}
                                        and we&#39;ll take care of it for you.
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
