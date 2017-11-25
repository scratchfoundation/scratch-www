import {FormattedDate} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import React from 'react';
import render from '../../../../lib/render.jsx';

import FlexRow from '../../../../components/flex-row/flex-row.jsx';
import Page from '../../../../components/page/conference/2017/page.jsx';
import TitleBanner from '../../../../components/title-banner/title-banner.jsx';

require('../../../../components/forms/button.scss');
require('./index.scss');

var ConferenceSplash = React.createClass({
    type: 'ConferenceSplash',

    render: function () {
        return (
            <div className='index mod-2017'>
                <TitleBanner className='mod-conference mod-2017'>
                    <div className='title-banner-image mod-2017'></div>
                    <h1 className='title-banner-h1 mod-2017'>
                        <FormattedMessage id='conference-2017.title' />
                    </h1>
                    <h3 className='title-banner-h3 mod-2017'>
                        <FormattedMessage id='conference-2017.desc' />
                    </h3>
                </TitleBanner>
                <h3 className='conf2017-title-band'>
                    <FormattedMessage id='conference-2017.seeBelow' />
                </h3>
                <div className='inner'>
                    <section className='conf2017-panel mod-france'>
                        <FlexRow className='conf2017-panel-title'>
                            <img
                                className='conf2017-panel-flag'
                                src='/svgs/conference/flags/fr.svg'
                                alt='France Flag'
                            />
                            <div className='conf2017-panel-title-text'>
                                <h3><FormattedMessage id='conference-2017.franceTitle' /></h3>
                                <h4><FormattedMessage id='conference-2017.franceSubTitle' /></h4>
                            </div>
                        </FlexRow>
                        <p className='conf2017-panel-desc'>
                            <FormattedMessage id='conference-2017.franceDesc' />
                        </p>
                        <table className='conf2017-panel-details'>
                            <tbody>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/calendar-icon.svg'
                                            alt='Calendar Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.date' /></td>
                                    <td>
                                        <FormattedDate
                                            value={new Date(2017, 6, 18)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                        {' - '}
                                        <FormattedDate
                                            value={new Date(2017, 6, 21)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                    </td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/map-icon.svg'
                                            alt='Map Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.location' /></td>
                                    <td>{'Bordeaux, France'}</td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/audience-icon.svg'
                                            alt='Audience Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.audience' /></td>
                                    <td><FormattedMessage id='conference-2017.franceAudience' /></td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/language-icon.svg'
                                            alt='Language Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.language' /></td>
                                    <td>{'English'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <a className='button mod-2017-panel' href='http://scratch2017bdx.org'>
                            <FormattedMessage id='conference-2017.website' />
                        </a>
                    </section>
                    <section className='conf2017-panel mod-hungary'>
                        <FlexRow className='conf2017-panel-title'>
                            <img
                                className='conf2017-panel-flag'
                                src='/svgs/conference/flags/hu.svg'
                                alt='Hungary Flag'
                            />
                            <div className='conf2017-panel-title-text'>
                                <h3><FormattedMessage id='conference-2017.hungaryTitle' /></h3>
                            </div>
                        </FlexRow>
                        <p className='conf2017-panel-desc'>
                            <FormattedMessage id='conference-2017.hungaryDesc' />
                        </p>
                        <table className='conf2017-panel-details'>
                            <tbody>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/calendar-icon.svg'
                                            alt='Calendar Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.date' /></td>
                                    <td>
                                        <FormattedDate
                                            value={new Date(2017, 7, 24)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                        {' - '}
                                        <FormattedDate
                                            value={new Date(2017, 7, 25)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                    </td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/map-icon.svg'
                                            alt='Map Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.location' /></td>
                                    <td>{'Budapest, Hungary'}</td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/audience-icon.svg'
                                            alt='Audience Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.audience' /></td>
                                    <td><FormattedMessage id='conference-2017.hungaryAudience' /></td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/language-icon.svg'
                                            alt='Language Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.language' /></td>
                                    <td>{'English'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <a className='button mod-2017-panel' href='https://events.epam.com/events/scratch-2017'>
                            <FormattedMessage id='conference-2017.website' />
                        </a>
                    </section>
                    <section className='conf2017-panel mod-costarica'>
                        <FlexRow className='conf2017-panel-title'>
                            <img
                                className='conf2017-panel-flag'
                                src='/svgs/conference/flags/cr.svg'
                                alt='Costa Rica Flag'
                            />
                            <div className='conf2017-panel-title-text'>
                                <h3><FormattedMessage id='conference-2017.costaricaTitle' /></h3>
                                <h4><FormattedMessage id='conference-2017.costaricaSubTitle' /></h4>
                            </div>
                        </FlexRow>
                        <p className='conf2017-panel-desc'>
                            <FormattedMessage id='conference-2017.costaricaDesc' />
                        </p>
                        <table className='conf2017-panel-details'>
                            <tbody>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/calendar-icon.svg'
                                            alt='Calendar Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.date' /></td>
                                    <td>
                                        <FormattedDate
                                            value={new Date(2017, 10, 12)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                    </td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/map-icon.svg'
                                            alt='Map Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.location' /></td>
                                    <td>{'San José, Costa Rica'}</td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/audience-icon.svg'
                                            alt='Audience Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.audience' /></td>
                                    <td><FormattedMessage id='conference-2017.costaricaAudience' /></td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/language-icon.svg'
                                            alt='Language Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.language' /></td>
                                    <td>{'Español (Spanish)'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <a className='button mod-2017-panel' href='https://scratchcostarica.com/'>
                            <FormattedMessage id='conference-2017.website' />
                        </a>
                    </section>
                    <section className='conf2017-panel mod-chile'>
                        <FlexRow className='conf2017-panel-title'>
                            <img
                                className='conf2017-panel-flag'
                                src='/svgs/conference/flags/cl.svg'
                                alt='Chile Flag'
                            />
                            <div className='conf2017-panel-title-text'>
                                <h3><FormattedMessage id='conference-2017.chileTitle' /></h3>
                                <h4><FormattedMessage id='conference-2017.chileSubTitle' /></h4>
                            </div>
                        </FlexRow>
                        <p className='conf2017-panel-desc'>
                            <FormattedMessage id='conference-2017.chileDesc' />
                        </p>
                        <table className='conf2017-panel-details'>
                            <tbody>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/calendar-icon.svg'
                                            alt='Calendar Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.date' /></td>
                                    <td>
                                        <FormattedDate
                                            value={new Date(2017, 7, 31)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                        {' - '}
                                        <FormattedDate
                                            value={new Date(2017, 8, 1)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                    </td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/map-icon.svg'
                                            alt='Map Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.location' /></td>
                                    <td>{'Santiago, Chile'}</td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/audience-icon.svg'
                                            alt='Audience Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.audience' /></td>
                                    <td><FormattedMessage id='conference-2017.chileAudience' /></td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/language-icon.svg'
                                            alt='Language Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.language' /></td>
                                    <td>{'Español (Spanish) - simultaneous translation during plenary sessions'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <a className='button mod-2017-panel' href='http://www.scratchalsur.org'>
                            <FormattedMessage id='conference-2017.website' />
                        </a>
                    </section>
                    <section className='conf2017-panel mod-brasil'>
                        <FlexRow className='conf2017-panel-title'>
                            <img
                                className='conf2017-panel-flag'
                                src='/svgs/conference/flags/br.svg'
                                alt='Brasil Flag'
                            />
                            <div className='conf2017-panel-title-text'>
                                <h3><FormattedMessage id='conference-2017.brasilTitle' /></h3>
                            </div>
                        </FlexRow>
                        <p className='conf2017-panel-desc'>
                            <FormattedMessage id='conference-2017.brasilDesc' />
                        </p>
                        <table className='conf2017-panel-details'>
                            <tbody>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/calendar-icon.svg'
                                            alt='Calendar Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.date' /></td>
                                    <td>
                                        <FormattedDate
                                            value={new Date(2017, 9, 5)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                        {' - '}
                                        <FormattedDate
                                            value={new Date(2017, 9, 7)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                    </td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/map-icon.svg'
                                            alt='Map Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.location' /></td>
                                    <td>{'São Paulo, Brasil'}</td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/audience-icon.svg'
                                            alt='Audience Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.audience' /></td>
                                    <td><FormattedMessage id='conference-2017.brasilAudience' /></td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/language-icon.svg'
                                            alt='Language Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.language' /></td>
                                    <td>{'Português (Portuguese)'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <a className='button mod-2017-panel' href='http://scratchbrasil.org/'>
                            <FormattedMessage id='conference-2017.website' />
                        </a>
                    </section>
                    <section className='conf2017-panel mod-china mod-last'>
                        <FlexRow className='conf2017-panel-title'>
                            <img
                                className='conf2017-panel-flag'
                                src='/svgs/conference/flags/cn.svg'
                                alt='China Flag'
                            />
                            <div className='conf2017-panel-title-text'>
                                <h3><FormattedMessage id='conference-2017.chinaTitle' /></h3>
                            </div>
                        </FlexRow>
                        <p className='conf2017-panel-desc'>
                            <FormattedMessage id='conference-2017.chinaDesc' />
                        </p>
                        <table className='conf2017-panel-details'>
                            <tbody>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/calendar-icon.svg'
                                            alt='Calendar Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.date' /></td>
                                    <td>
                                        <FormattedDate
                                            value={new Date(2017, 4, 20)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                        {' - '}
                                        <FormattedDate
                                            value={new Date(2017, 4, 21)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                    </td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/map-icon.svg'
                                            alt='Map Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.location' /></td>
                                    <td>{'Shanghai, China'}</td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/audience-icon.svg'
                                            alt='Audience Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.audience' /></td>
                                    <td><FormattedMessage id='conference-2017.chinaAudience' /></td>
                                </tr>
                                <tr className='conf2017-panel-row'>
                                    <td className='conf2017-panel-row-icon'>
                                        <img
                                            className='conf2017-panel-row-icon-image'
                                            src='/svgs/conference/index/language-icon.svg'
                                            alt='Language Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2017.language' /></td>
                                    <td>{'中文 (Chinese)'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <a className='button mod-2017-panel' href='http://scratchconference2017.sxl.cn/'>
                            <FormattedMessage id='conference-2017.website' />
                        </a>
                    </section>
                </div>
            </div>
        );
    }
});

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
