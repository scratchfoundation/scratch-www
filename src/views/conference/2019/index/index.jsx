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
            <div className="title-banner-image mod-2019" />
            <h1 className="title-banner-h1 mod-2019">
                <FormattedMessage id="conference-2019.title" />
            </h1>
            <h3 className="title-banner-h3 mod-2019 conf2019-description">
                <FormattedMessage id="conference-2019.desc" />
            </h3>
        </TitleBanner>
        <h3 className="conf2019-title-band">
            <FormattedMessage id="conference-2019.nextMITConference" />
            <br />
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
                                    src="/svgs/conference/index/calendar-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2019, 5, 30)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2019, 5, 31)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon.svg"
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
                                    src="/svgs/conference/index/audience-icon.svg"
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
                                    src="/svgs/conference/index/language-icon.svg"
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
                                    src="/svgs/conference/index/language-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.hashtag" /></td>
                            <td>{'#ScratchalSur'}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2019-panel"
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
                                    src="/svgs/conference/index/calendar-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2019, 7, 8)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2019, 7, 13)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon.svg"
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
                                    src="/svgs/conference/index/audience-icon.svg"
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
                                    src="/svgs/conference/index/language-icon.svg"
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
                                    src="/svgs/conference/index/language-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.hashtag" /></td>
                            <td>{'#scratch2019afr'}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2019-panel"
                    href="https://www.scratchafrica.com"
                >
                    <FormattedMessage id="conference-2019.website" />
                </a>
            </section>
            <section className="conf2019-panel mod-uk">
                <FlexRow className="conf2019-panel-title">
                    <img
                        alt="EU Flag"
                        className="conf2019-panel-flag"
                        src="/svgs/conference/flags/fr.svg"
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
                                    src="/svgs/conference/index/calendar-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2019, 6, 18)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2019, 6, 21)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2019-panel-row">
                            <td className="conf2019-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2019-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon.svg"
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
                                    src="/svgs/conference/index/audience-icon.svg"
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
                                    src="/svgs/conference/index/language-icon.svg"
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
                                    src="/svgs/conference/index/language-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2019.hashtag" /></td>
                            <td>{'#scratchconference'}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <p>
                <FormattedMessage
                    id="conference-2019.joinMailingList"
                    values={{joinMailingListLink: (
                        <a href="/?????????????"><FormattedMessage id="conference-2019.joinMailingListLinkText" /></a>
                    )}}
                />
            </p>
        </div>
    </div>
);

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
