const FormattedDate = require('react-intl').FormattedDate;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const render = require('../../../../lib/render.jsx');

const FlexRow = require('../../../../components/flex-row/flex-row.jsx');
const Page = require('../../../../components/page/conference/2019/page.jsx');
const TitleBanner = require('../../../../components/title-banner/title-banner.jsx');

require('../../../../components/forms/button.scss');
require('./index.scss');

const ConferenceSplash = () => (
    <div className="index mod-2019">
        <TitleBanner className="mod-conference mod-2019">
            <div>
                <h1 className="title-banner-h1 mod-2019">
                    <FormattedMessage id="conference-2019.title" />
                </h1>
                <div className="title-banner-image mod-2019" />
            </div>
        </TitleBanner>
        <div className="conf2019-description conf2019-band">
            <h3 className="conf2019-description title-banner-h3 mod-2019">
                <FormattedMessage id="conference-2019.descA" />
            </h3>
            <h3 className="conf2019-description title-banner-h3 mod-2019">
                <FormattedMessage id="conference-2019.descB" />
            </h3>
            <h3 className="conf2019-description title-banner-h3 mod-2019">
                <FormattedMessage id="conference-2019.descC" />
            </h3>
            <h3 className="conf2019-description title-banner-h3 mod-2019">
                <FormattedMessage id="conference-2019.descD" />
            </h3>
        </div>
        <div className="conf2019-title-band conf2019-schedule-band">
            <img
                alt="Envelope Icon"
                className="conf2019-large-icon-image"
                src="/svgs/conference/index/calendar-icon-color.svg"
            />
            <h3 className="conf2019-title-band">
                <FormattedMessage id="conference-2019.seeBelow" />
            </h3>
        </div>
        <div className="inner">
            <section className="conf2019-panel mod-chile">
                <FlexRow className="conf2019-panel-title">
                    <img
                        alt="Chile Flag"
                        className="conf2019-panel-flag"
                        src="/svgs/conference/flags/cl.svg"
                    />
                    <div className="conf2019-panel-title-text">
                        <h3>Scratch al Sur Conferencia Chile 2019</h3>
                    </div>
                </FlexRow>
                <p className="conf2019-panel-desc">
                    <FormattedMessage id="conference-2019.chileDesc" />
                </p>
                <table className="conf2019-panel-details">
                    <tbody>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Calendar Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/calendar-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2019, 4, 30)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2019, 4, 31)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.location" /></td>
                            <td>{'Santiago, Chile'}</td>
                        </tr>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Audience Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/audience-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.audience" /></td>
                            <td><FormattedMessage id="conference-2019.chileAudience" /></td>
                        </tr>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Language Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/language-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.language" /></td>
                            <td><FormattedMessage id="conference-2019.spanishWithSimultaneous" /></td>
                        </tr>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Language Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/hashtag-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.hashtag" /></td>
                            <td>{'#ScratchalSur'}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2019-conf mod-2019-conf-website-button"
                    href="http://www.scratchalsur.org"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <FormattedMessage id="conference-2019.website" />
                </a>
            </section>
            <section className="conf2019-panel mod-uk">
                <FlexRow className="conf2019-panel-title">
                    <img
                        alt="EU Flag"
                        className="conf2019-panel-flag"
                        src="/svgs/conference/flags/eu.svg"
                    />
                    <div className="conf2019-panel-title-text">
                        <h3><FormattedMessage id="conference-2019.ukTitle" /></h3>
                    </div>
                </FlexRow>
                <p className="conf2019-panel-desc">
                    <FormattedMessage id="conference-2019.ukDesc" />
                </p>
                <table className="conf2019-panel-details">
                    <tbody>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Calendar Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/calendar-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2019, 7, 23)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2019, 7, 25)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.location" /></td>
                            <td>{'Cambridge, United Kingdom'}</td>
                        </tr>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Audience Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/audience-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.audience" /></td>
                            <td><FormattedMessage id="conference-2019.ukAudience" /></td>
                        </tr>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Language Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/language-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.language" /></td>
                            <td><FormattedMessage id="general.english" /></td>
                        </tr>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Language Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/hashtag-icon-solid.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.hashtag" /></td>
                            <td>{'#ScratchEurope'}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2019-conf mod-2019-conf-website-button"
                    href="https://scratchconferenceeurope.raspberrypi.org/"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <FormattedMessage id="conference-2019.website" />
                </a>
            </section>
            <section className="conf2019-panel mod-kenya mod-last">
                <FlexRow className="conf2019-panel-title">
                    <img
                        alt="Kenya Flag"
                        className="conf2019-panel-flag"
                        src="/svgs/conference/flags/ke.svg"
                    />
                    <div className="conf2019-panel-title-text">
                        <h3><FormattedMessage id="conference-2019.kenyaTitle" /></h3>
                    </div>
                </FlexRow>
                <p className="conf2019-panel-desc">
                    <FormattedMessage id="conference-2019.kenyaPostpone" />
                </p>
            </section>
        </div>
        <div className="conf2019-title-band conf2019-mailing-list">
            <img
                alt="Envelope Icon"
                className="conf2019-large-icon-image"
                src="/svgs/conference/index/envelope-icon.svg"
            />
            <h3 className="conf2019-mailing-list">
                <FormattedMessage id="conference-2019.joinMailingList" />
            </h3>
            <a
                className="button mod-2019-conf mod-2019-conf-maillist-button"
                href="https://us9.list-manage.com/subscribe?u=96e741c12c99f46f1f3e95e09&id=149bd1a4c2"
                rel="noopener noreferrer"
                target="_blank"
            >
                <FormattedMessage id="conference-2019.joinMailingListButtonText" />
            </a>
        </div>
    </div>
);

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
