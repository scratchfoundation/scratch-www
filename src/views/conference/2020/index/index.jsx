const FormattedDate = require('react-intl').FormattedDate;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const render = require('../../../../lib/render.jsx');

const FlexRow = require('../../../../components/flex-row/flex-row.jsx');
const Page = require('../../../../components/page/conference/2020/page.jsx');
const TitleBanner = require('../../../../components/title-banner/title-banner.jsx');

require('../../../../components/forms/button.scss');
require('./index.scss');

const ConferenceSplash = () => (
    <div className="index mod-2020">
        <TitleBanner className="mod-conference mod-2020">
            <div className="title-banner-image mod-2020" />
            <h1 className="title-banner-h1 mod-2020">
                <center>
                    <FormattedMessage id="conference-2020.title" />
                    <br />
                    <FormattedMessage id="conference-2020.subtitle" />
                </center>
            </h1>
            <h3 className="title-banner-h3 mod-2020">
                <FormattedMessage id="conference-2020.dateDesc" />
            </h3>
        </TitleBanner>
        <div className="inner">
            <section className="conf2020-panel mod-desc">
                <p className="conf2020-panel-desc">
                    <FormattedMessage id="conference-2020.desc1" />{' '}
                    <strong><FormattedMessage id="conference-2020.desc1a" /></strong>
                    <br />
                    <br />
                    <FormattedMessage id="conference-2020.desc3" />
                </p>
                <table className="conf2020-panel-details">
                    <tbody>
                        <tr className="conf2020-panel-row">
                            <td className="conf2020-panel-row-icon">
                                <img
                                    alt="Calendar Icon"
                                    className="conf2020-panel-row-icon-image"
                                    src="/svgs/conference/index/calendar-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2020.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2021, 6, 22)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2021, 6, 24)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2020-panel-row">
                            <td className="conf2020-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2020-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2020.location" /></td>
                            <td><FormattedMessage id="conference-2020.locationDetails" /></td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2020-panel"
                    href="http://scratch2020.eventbrite.com/"
                >
                    <FormattedMessage id="conference-2020.register" />
                </a>

            </section>
            <section className="conf2020-panel mod-stay">
                <p className="conf2020-panel-desc">
                    <FormattedMessage
                        id="conference-2020.stayDesc2"
                        values={{
                            emailLink: <a href="mailto:conference@scratch.mit.edu">
                                conference@scratch.mit.edu
                            </a>
                        }}
                    />
                    <br />
                    <br />
                    <FormattedMessage id="conference-2020.organizedBy" />
                </p>
            </section>
        </div>
    </div>
);

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
