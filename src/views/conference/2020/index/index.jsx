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
                    <FormattedMessage id="conference-2020.desc1" />
                    <br />
                    <br />
                    <FormattedMessage id="conference-2020.desc2" />
                </p>
                <table className="conf2020-panel-details">
                    <tbody>
                        <tr className="conf2020-panel-row">
                            <td className="conf2020-panel-row-icon">
                                <img
                                    alt="Calendar Icon"
                                    className="conf2020-panel-row-icon-image"
                                    src="/svgs/conference/index/calendar-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2020.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2020, 6, 22)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2020, 6, 25)}
                                    year="numeric"
                                />
                                <FormattedMessage id="conference-2020.dateDescMore" />
                            </td>
                        </tr>
                        <tr className="conf2020-panel-row">
                            <td className="conf2020-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2020-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2020.location" /></td>
                            <td><FormattedMessage id="conference-2020.locationDetails" /></td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section className="conf2020-panel">
                <p className="conf2020-panel-desc">
                    <FormattedMessage id="conference-2020.sessionDesc" />
                </p>
                <p className="conf2020-panel-session">
                    <p className="conf2020-panel-session">
                        <b>
                            <FormattedMessage id="conference-2020.sessionItem1Title" />
                        </b>{' '}
                        <FormattedMessage id="conference-2020.sessionItem1Desc" />
                    </p>
                    <p className="conf2020-panel-session">
                        <b>
                            <FormattedMessage id="conference-2020.sessionItem2Title" />
                        </b>{' '}
                        <FormattedMessage id="conference-2020.sessionItem2Desc" />
                    </p>
                    <p className="conf2020-panel-session">
                        <b>
                            <FormattedMessage id="conference-2020.sessionItem3Title" />
                        </b>{' '}
                        <FormattedMessage id="conference-2020.sessionItem3Desc" />
                    </p>
                    <p className="conf2020-panel-session">
                        <b>
                            <FormattedMessage id="conference-2020.sessionItem4Title" />
                        </b>{' '}
                        <FormattedMessage id="conference-2020.sessionItem4Desc" />
                    </p>
                    <p className="conf2020-panel-deadline">
                        <FormattedMessage id="conference-2020.proposalDeadline" />
                    </p>
                </p>
                <a
                    className="button mod-2020-panel"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdVH_izvaWsAtDsAnKbYauDZinsGo2YpCIhp2c4sly8UHmcyA/viewform"
                >
                    <FormattedMessage id="conference-2020.proposal" />
                </a>
            </section>
            <section className="conf2020-panel mod-registration">
                <FlexRow className="conf2020-panel-title">
                    <div className="conf2020-panel-title-text">
                        <h3><FormattedMessage id="conference-2020.registrationTitle" /></h3>
                    </div>
                </FlexRow>
                <p className="conf2020-panel-desc">
                    <FormattedMessage id="conference-2020.registrationFee" />
                    <br />
                    <FormattedMessage id="conference-2020.registrationOpen" />
                </p>
            </section>
            <section className="conf2020-panel mod-questions">
                <p className="conf2020-panel-desc">
                    <FormattedMessage
                        id="conference-2020.questions"
                        values={{
                            emailLink: <a href="mailto:conference@scratch.mit.edu">
                                conference@scratch.mit.edu
                            </a>
                        }}
                    />
                </p>
            </section>
        </div>
    </div>
);

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
