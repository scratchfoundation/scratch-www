const FormattedDate = require('react-intl').FormattedDate;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const render = require('../../../../lib/render.jsx');

const FlexRow = require('../../../../components/flex-row/flex-row.jsx');
const Page = require('../../../../components/page/conference/2017/page.jsx');
const TitleBanner = require('../../../../components/title-banner/title-banner.jsx');

require('../../../../components/forms/button.scss');
require('./index.scss');

const ConferenceSplash = () => (
    <div className="index mod-2017">
        <TitleBanner className="mod-conference mod-2017">
            <div className="title-banner-image mod-2017" />
            <h1 className="title-banner-h1 mod-2017">
                <FormattedMessage id="conference-2017.title" />
            </h1>
            <h3 className="title-banner-h3 mod-2017">
                <FormattedMessage id="conference-2017.desc" />
            </h3>
        </TitleBanner>
        <h3 className="conf2017-title-band">
            <FormattedMessage id="conference-2017.seeBelow" />
        </h3>
        <div className="inner">
            <section className="conf2017-panel mod-france">
                <FlexRow className="conf2017-panel-title">
                    <img
                        alt="France Flag"
                        className="conf2017-panel-flag"
                        src="/svgs/conference/flags/fr.svg"
                    />
                    <div className="conf2017-panel-title-text">
                        <h3><FormattedMessage id="conference-2017.franceTitle" /></h3>
                        <h4><FormattedMessage id="conference-2017.franceSubTitle" /></h4>
                    </div>
                </FlexRow>
                <p className="conf2017-panel-desc">
                    <FormattedMessage id="conference-2017.franceDesc" />
                </p>
                <table className="conf2017-panel-details">
                    <tbody>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Calendar Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/calendar-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2017, 6, 18)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2017, 6, 21)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.location" /></td>
                            <td>{'Bordeaux, France'}</td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Audience Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/audience-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.audience" /></td>
                            <td><FormattedMessage id="conference-2017.franceAudience" /></td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Language Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/language-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.language" /></td>
                            <td>{'English'}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2017-panel"
                    href="http://scratch2017bdx.org"
                >
                    <FormattedMessage id="conference-2017.website" />
                </a>
            </section>
            <section className="conf2017-panel mod-hungary">
                <FlexRow className="conf2017-panel-title">
                    <img
                        alt="Hungary Flag"
                        className="conf2017-panel-flag"
                        src="/svgs/conference/flags/hu.svg"
                    />
                    <div className="conf2017-panel-title-text">
                        <h3><FormattedMessage id="conference-2017.hungaryTitle" /></h3>
                    </div>
                </FlexRow>
                <p className="conf2017-panel-desc">
                    <FormattedMessage id="conference-2017.hungaryDesc" />
                </p>
                <table className="conf2017-panel-details">
                    <tbody>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Calendar Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/calendar-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2017, 7, 24)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2017, 7, 25)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.location" /></td>
                            <td>{'Budapest, Hungary'}</td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Audience Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/audience-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.audience" /></td>
                            <td><FormattedMessage id="conference-2017.hungaryAudience" /></td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Language Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/language-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.language" /></td>
                            <td>{'English'}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2017-panel"
                    href="https://events.epam.com/events/scratch-2017"
                >
                    <FormattedMessage id="conference-2017.website" />
                </a>
            </section>
            <section className="conf2017-panel mod-costarica">
                <FlexRow className="conf2017-panel-title">
                    <img
                        alt="Costa Rica Flag"
                        className="conf2017-panel-flag"
                        src="/svgs/conference/flags/cr.svg"
                    />
                    <div className="conf2017-panel-title-text">
                        <h3><FormattedMessage id="conference-2017.costaricaTitle" /></h3>
                        <h4><FormattedMessage id="conference-2017.costaricaSubTitle" /></h4>
                    </div>
                </FlexRow>
                <p className="conf2017-panel-desc">
                    <FormattedMessage id="conference-2017.costaricaDesc" />
                </p>
                <table className="conf2017-panel-details">
                    <tbody>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Calendar Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/calendar-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2017, 10, 12)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.location" /></td>
                            <td>{'San José, Costa Rica'}</td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Audience Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/audience-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.audience" /></td>
                            <td><FormattedMessage id="conference-2017.costaricaAudience" /></td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Language Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/language-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.language" /></td>
                            <td>{'Español (Spanish)'}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2017-panel"
                    href="https://scratchcostarica.com/"
                >
                    <FormattedMessage id="conference-2017.website" />
                </a>
            </section>
            <section className="conf2017-panel mod-chile">
                <FlexRow className="conf2017-panel-title">
                    <img
                        alt="Chile Flag"
                        className="conf2017-panel-flag"
                        src="/svgs/conference/flags/cl.svg"
                    />
                    <div className="conf2017-panel-title-text">
                        <h3><FormattedMessage id="conference-2017.chileTitle" /></h3>
                        <h4><FormattedMessage id="conference-2017.chileSubTitle" /></h4>
                    </div>
                </FlexRow>
                <p className="conf2017-panel-desc">
                    <FormattedMessage id="conference-2017.chileDesc" />
                </p>
                <table className="conf2017-panel-details">
                    <tbody>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Calendar Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/calendar-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2017, 7, 31)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2017, 8, 1)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.location" /></td>
                            <td>{'Santiago, Chile'}</td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Audience Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/audience-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.audience" /></td>
                            <td><FormattedMessage id="conference-2017.chileAudience" /></td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Language Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/language-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.language" /></td>
                            <td>{'Español (Spanish) - simultaneous translation during plenary sessions'}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2017-panel"
                    href="http://www.scratchalsur.org"
                >
                    <FormattedMessage id="conference-2017.website" />
                </a>
            </section>
            <section className="conf2017-panel mod-brasil">
                <FlexRow className="conf2017-panel-title">
                    <img
                        alt="Brasil Flag"
                        className="conf2017-panel-flag"
                        src="/svgs/conference/flags/br.svg"
                    />
                    <div className="conf2017-panel-title-text">
                        <h3><FormattedMessage id="conference-2017.brasilTitle" /></h3>
                    </div>
                </FlexRow>
                <p className="conf2017-panel-desc">
                    <FormattedMessage id="conference-2017.brasilDesc" />
                </p>
                <table className="conf2017-panel-details">
                    <tbody>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Calendar Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/calendar-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2017, 9, 5)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2017, 9, 7)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.location" /></td>
                            <td>{'São Paulo, Brasil'}</td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Audience Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/audience-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.audience" /></td>
                            <td><FormattedMessage id="conference-2017.brasilAudience" /></td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Language Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/language-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.language" /></td>
                            <td>{'Português (Portuguese)'}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2017-panel"
                    href="http://scratchbrasil.org/"
                >
                    <FormattedMessage id="conference-2017.website" />
                </a>
            </section>
            <section className="conf2017-panel mod-china mod-last">
                <FlexRow className="conf2017-panel-title">
                    <img
                        alt="China Flag"
                        className="conf2017-panel-flag"
                        src="/svgs/conference/flags/cn.svg"
                    />
                    <div className="conf2017-panel-title-text">
                        <h3><FormattedMessage id="conference-2017.chinaTitle" /></h3>
                    </div>
                </FlexRow>
                <p className="conf2017-panel-desc">
                    <FormattedMessage id="conference-2017.chinaDesc" />
                </p>
                <table className="conf2017-panel-details">
                    <tbody>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Calendar Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/calendar-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.date" /></td>
                            <td>
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2017, 4, 20)}
                                    year="numeric"
                                />
                                {' - '}
                                <FormattedDate
                                    day="2-digit"
                                    month="long"
                                    value={new Date(2017, 4, 21)}
                                    year="numeric"
                                />
                            </td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Map Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/map-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.location" /></td>
                            <td>{'Shanghai, China'}</td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Audience Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/audience-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.audience" /></td>
                            <td><FormattedMessage id="conference-2017.chinaAudience" /></td>
                        </tr>
                        <tr className="conf2017-panel-row">
                            <td className="conf2017-panel-row-icon">
                                <img
                                    alt="Language Icon"
                                    className="conf2017-panel-row-icon-image"
                                    src="/svgs/conference/index/language-icon.svg"
                                />
                            </td>
                            <td><FormattedMessage id="conference-2017.language" /></td>
                            <td>{'中文 (Chinese)'}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    className="button mod-2017-panel"
                    href="http://scratchconference2017.sxl.cn/"
                >
                    <FormattedMessage id="conference-2017.website" />
                </a>
            </section>
        </div>
    </div>
);

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
