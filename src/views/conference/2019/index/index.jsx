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
            <h3 className="conf2019-description title-banner-h3 mod-2019 conf2019-bold">
                <FormattedMessage id="conference-2019.nextMITConference" />
            </h3>
        </div>
        <h3 className="conf2019-title-band">
            <FormattedMessage id="conference-2019.seeBelow" />
        </h3>
        <div className="inner">
            <section className="conf2019-panel mod-chile">
                <FlexRow className="conf2019-panel-title">
                    <img
                        alt="Chile Flag"
                        className="conf2019-panel-flag"
                        src="/svgs/conference/flags/cl.svg"
                    />
                    <div className="conf2019-panel-title-text">
                        <h3><FormattedMessage id="conference-2019.chileTitle" /></h3>
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
                            <td>{'Español (Spanish) - simultaneous translation during plenary sessions'}</td>
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
                >
                    <FormattedMessage id="conference-2019.website" />
                </a>
            </section>
            <section className="conf2019-panel mod-kenya">
                <FlexRow className="conf2019-panel-title">
                    <img
                        alt="Kenya Flag"
                        className="conf2019-panel-flag"
                        src="/svgs/conference/flags/hu.svg"
                    />
                    <div className="conf2019-panel-title-text">
                        <h3><FormattedMessage id="conference-2019.kenyaTitle" /></h3>
                        <h4><FormattedMessage id="conference-2019.kenyaSubTitle" /></h4>
                    </div>
                </FlexRow>
                <p className="conf2019-panel-desc">
                    <FormattedMessage id="conference-2019.kenyaDesc" />
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
                                    value={new Date(2019, 6, 8)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2019, 6, 13)}
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
                            <td>{'Nairobi, Kenya'}</td>
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
                            <td><FormattedMessage id="conference-2019.kenyaAudience" /></td>
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
                            <td>{'English'}</td>
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
                            <td>{'#scratch2019afr'}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2019-conf mod-2019-conf-website-button"
                    href="https://www.scratchafrica.com"
                >
                    <FormattedMessage id="conference-2019.website" />
                </a>
            </section>
            <section className="conf2019-panel mod-uk mod-last">
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
                            <td>{'English'}</td>
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
                    href="https://www.raspberrypi.org/blog/announcing-scratch-conference-europe-2019/"
                >
                    <FormattedMessage id="conference-2019.website" />
                </a>
            </section>
        </div>
        <div className="conf2019-title-band conf2019-mailing-list">
            <h3 className="conf2019-mailing-list">
                <FormattedMessage id="conference-2019.joinMailingList" />
            </h3>
            <a
                className="button mod-2019-conf mod-2019-conf-maillist-button"
                href="https://docs.google.com/document/d/1M_LJqOjAxxYFm3j-D8WbvFtWhZJgPCbZ5aNGSA2KZyc/edit?ts=5c65f2c4#"
            >
                <FormattedMessage id="conference-2019.joinMailingListButtonText" />
            </a>
        </div>
    </div>
);

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
