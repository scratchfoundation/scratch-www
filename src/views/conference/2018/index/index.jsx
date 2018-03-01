const FormattedDate = require('react-intl').FormattedDate;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const render = require('../../../../lib/render.jsx');

const Button = require('../../../../components/forms/button.jsx');
const FlexRow = require('../../../../components/flex-row/flex-row.jsx');
const Page = require('../../../../components/page/conference/2018/page.jsx');
const TitleBanner = require('../../../../components/title-banner/title-banner.jsx');

require('../../../../components/forms/button.scss');
require('./index.scss');

const ConferenceSplash = () => (
    <div className="index mod-2018">
        <TitleBanner className="mod-conference">
            <h1>
                <FormattedMessage id="conference-2018.subtitle" />
            </h1>
            <h3>
                <FormattedMessage id="conference-2018.dateDesc" />
            </h3>
            <p>
                <a href="https://scratch2018.eventbrite.com">
                    <Button className="mod-register">
                        <FormattedMessage id="conference-2018.registerNow" />
                    </Button>
                </a>
            </p>
        </TitleBanner>
        <div className="inner">
            <section className="info">
                <FlexRow className="uneven">
                    <div className="long">
                        <p>
                            <FormattedMessage id="conference-2018.desc1" />
                        </p>
    
                        <p>
                            <FormattedMessage id="conference-2018.desc2" />
                        </p>
                    </div>
                    <div className="short">
                        <p>
                            <b><FormattedMessage id="conference-2018.date" /></b>{' '}
                            {/* eslint-disable react/jsx-sort-props */}
                            <FormattedDate
                                value={new Date(2018, 6, 26)}
                                year="numeric"
                                month="long"
                                day="2-digit"
                            />
                            {' - '}
                            <FormattedDate
                                value={new Date(2018, 6, 28)}
                                year="numeric"
                                month="long"
                                day="2-digit"
                            />
                            {/* eslint-enable react/jsx-sort-props */}
                            <br />
                            <FormattedMessage id="conference-2018.dateDescMore" />
                            <br />
                            <b><FormattedMessage id="conference-2018.location" /></b>{' '}
                            <FormattedMessage id="conference-2018.locationDetails" />
                        </p>
                    </div>
                </FlexRow>
                <FlexRow className="uneven">
                    <div className="long">
                        <h3 id="info"><FormattedMessage id="conference-2018.registrationTitle" /></h3>
                        <p className="conf2018-panel-desc">
                            <b><FormattedMessage id="conference-2018.registrationEarly" /></b>
                            <br />
                            <b><FormattedMessage id="conference-2018.registrationStandard" /></b>
                        </p>
                        <p>
                            <a href="https://scratch2018.eventbrite.com">
                                <Button className="mod-register">
                                    <FormattedMessage id="conference-2018.registerNow" />
                                </Button>
                            </a>
                        </p>
                        <h3 id="questions"><FormattedMessage id="conference-2018.questionsTitle" /></h3>
                        <div>
                            <p className="conf2018-question">
                                <FormattedMessage id="conference-2018.submissionQ" />
                            </p>
                            <p className="conf2018-answer">
                                <FormattedMessage id="conference-2018.submissionAns" />
                            </p>
                        </div>
                        <div>
                            <p className="conf2018-question">
                                <FormattedMessage id="conference-2018.regQ" />
                            </p>
                            <p className="conf2018-answer">
                                <FormattedMessage id="conference-2018.regAns" />
                            </p>
                        </div>
                        <div>
                            <p className="conf2018-question">
                                <FormattedMessage id="conference-2018.accommodationsQ" />
                            </p>
                            <p className="conf2018-answer">
                                <FormattedMessage
                                    id="conference-2018.accommodationsAns1"
                                    values={{
                                        marriottLink: (
                                            <a href="http://www.marriott.com/hotels/travel/boscb-boston-marriott-cambridge/">
                                                Boston Marriott Cambridge
                                            </a>
                                        ),
                                        holidayinnLink: (
                                            <a href="http://www.hiexpress.com/hotels/us/en/reservation/searchresult?qAdlt=1&qBrs=6c.hi.ex.rs.ic.cp.in.sb.cw.cv.ul.vn&qChld=0&qDest=CAMBRIDGE%2CMA%2CUnited+States&qFRA=1&qGRM=0&qIta=99504425&qPSt=0&qRRSrt=rt&qRef=df&qRms=1&qRpn=1&qRpp=12&qSHp=1&qSmP=3&qSrt=sBR&qWch=0&srb_u=1&icdv=99504425&dp=true">
                                                Holiday Inn Express and Suites
                                            </a>
                                        ),
                                        residenceinnLink: (
                                            <a href="http://www.marriott.com/hotels/travel/boscm-residence-inn-boston-cambridge/">
                                                Residence Inn
                                            </a>
                                        ),
                                        lemeridienLink: (
                                            <a href="http://www.starwoodhotels.com/lemeridien/property/overview/index.html?propertyID=3253&language=en_US">
                                                Le Meridien
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                            <p className="conf2018-answer">
                                <FormattedMessage
                                    id="conference-2018.accommodationsAns2"
                                    values={{
                                        acLink: (
                                            <a href="http://www.marriott.com/meeting-event-hotels/group-corporate-travel/groupCorp.mi?resLinkData=Scratch%20Conference%5EBOSAR%60sccscca%7Csccsccb%60229%60USD%60false%604%607/25/18%607/28/18%607/4/18&app=resvlink&stop_mobi=yes">
                                                AC Hotel Boston Cambridge
                                            </a>
                                        ),
                                        doubletreeLink: (
                                            <a href="https://secure3.hilton.com/en_US/dt/reservation/book.htm?inputModule=HOTEL&ctyhocn=BOSCODT&spec_plan=CDTMIT&arrival=20180725&departure=20180728&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT">
                                                DoubleTree by Hilton Hotel Boston - Downtown
                                            </a>
                                        ),
                                        hotelbostonLink: (
                                            <a href="https://www.hotelboston.com/">
                                                Hotel Boston
                                            </a>
                                        ),
                                        mitLink: (
                                            <a href="http://www.media.mit.edu/contact/accommodations">
                                                <FormattedMessage id="conference-2018.here" />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                            <p className="conf2018-answer">
                                <FormattedMessage
                                    id="conference-2018.accommodationsAns3"
                                    values={{
                                        neuLink: (
                                            <a href="http://www.northeastern.edu/">
                                                Northeastern University
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                            <p className="conf2018-question">
                                <FormattedMessage id="conference-2018.suite" />
                            </p>
                            <p className="conf2018-answer">
                                <FormattedMessage id="conference-2018.single" />
                                {' - $80.00'}
                                <FormattedMessage id="conference-2018.pp" />
                                <br />
                                <FormattedMessage id="conference-2018.double" />
                                {' - $65.00'}
                                <FormattedMessage id="conference-2018.pp" />
                            </p>
                            <p className="conf2018-answer">
                                <FormattedMessage
                                    id="conference-2018.accommodationsAns4"
                                    values={{
                                        dormrequestLink: (
                                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSd8LRQyz9ZLXcpvjmYrnpAlN0_RVyYsgObUXQveI9_WpoDabw/viewform?usp=sf_link">
                                                <FormattedMessage id="conference-2018.dormRequestText" />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </div>
                        <div>
                            <p className="conf2018-question">
                                <FormattedMessage id="conference-2018.letterQ" />
                            </p>
                            <p className="conf2018-answer">
                                <FormattedMessage
                                    id="conference-2018.letterAns"
                                    values={{
                                        emailLink: (
                                            <a href="mailto:conference@scratch.mit.edu">
                                                conference@scratch.mit.edu
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </div>
                        <div>
                            <p className="conf2018-question">
                                <FormattedMessage id="conference-2018.preConfQ" />
                            </p>
                            <p className="conf2018-answer">
                                <FormattedMessage id="conference-2018.preConfAns" />
                            </p>
                        </div>
                        <div>
                            <p className="conf2018-question">
                                <FormattedMessage id="conference-2018.bringQ" />
                            </p>
                            <p className="conf2018-answer">
                                <FormattedMessage id="conference-2018.bringAns" />
                            </p>
                        </div>
                        <div>
                            <p className="conf2018-question">
                                <FormattedMessage id="conference-2018.moreQ" />
                            </p>
                            <p className="conf2018-answer">
                                <FormattedMessage
                                    id="conference-2018.moreAns"
                                    values={{
                                        emailLink: (
                                            <a href="mailto:conference@scratch.mit.edu">
                                                conference@scratch.mit.edu
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </div>
                    </div>
                    
                </FlexRow>
            </section>
        </div>
    </div>
);

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
