const FormattedDate = require('react-intl').FormattedDate;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const render = require('../../../../lib/render.jsx');

// Using the 2021 page on purpose here since the layout of the page is the same
const Page = require('../../../../components/page/conference/2021/page.jsx');
const TitleBanner = require('../../../../components/title-banner/title-banner.jsx');

require('../../../../components/forms/button.scss');
require('./index.scss');

const conferenceDate = (<FormattedDate
    day="2-digit"
    month="long"
    value={new Date(2022, 6, 21)}
    year="numeric"
/>);

const ConferenceSplash = () => (
    <div className="index mod-2022">
        <TitleBanner className="mod-conference mod-2022">
            <div className="title-banner-image mod-2022" />
            <h1 className="title-banner-h1 mod-2022">
                <center>
                    <FormattedMessage id="conference-2022.title" />
                </center>
            </h1>
            <h3 className="title-banner-h3 mod-2022">
                {conferenceDate}
            </h3>
        </TitleBanner>
        <div className="inner">
            <section className="conf2022-panel mod-desc">
                <p className="conf2022-panel-desc">
                    <FormattedMessage id="conference-2022.desc1" />{' '}
                    <strong><FormattedMessage id="conference-2022.desc1a" /></strong>
                    <br />
                    <br />
                    <FormattedMessage id="conference-2022.desc3" />
                </p>
                <table className="conf2022-panel-details">
                    <tbody>
                        <tr className="conf2022-panel-row">
                            <td className="conf2022-panel-row-icon">
                                <img
                                    alt="Calendar Icon"
                                    className="conf2022-panel-row-icon-image"
                                    src="/svgs/conference/index/calendar-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2022.date" /></td>
                            <td>
                                {conferenceDate}{' '}
                                <FormattedMessage id="conference-2022.eventTime" />
                            </td>
                        </tr>
                        <tr className="conf2022-panel-row">
                            <td className="conf2022-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2022-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2022.location" /></td>
                            <td><FormattedMessage id="conference-2022.locationDetails" /></td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <center>
                    <FormattedMessage id="conference-2022.register" />
                </center>

            </section>
            <section className="conf2022-panel mod-stay">
                <p className="conf2022-panel-desc">
                    <FormattedMessage
                        id="conference-2022.stayDesc2"
                        values={{
                            emailLink: <a href="mailto:conference@scratch.mit.edu">
                                conference@scratch.mit.edu
                            </a>
                        }}
                    />
                    <br />
                    <br />
                    <FormattedMessage id="conference-2022.organizedBy" />
                </p>
            </section>
        </div>
    </div>
);

render(
    <Page
        footerOrganizedByMsgId="conference-2022.organizedBy"
    ><ConferenceSplash /></Page>, document.getElementById('app'));
