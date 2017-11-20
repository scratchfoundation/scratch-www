var FormattedDate = require('react-intl').FormattedDate;
var FormattedMessage = require('react-intl').FormattedMessage;
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var React = require('react');
var render = require('../../../../lib/render.jsx');

var FlexRow = require('../../../../components/flex-row/flex-row.jsx');
var Page = require('../../../../components/page/conference/2018/page.jsx');
var TitleBanner = require('../../../../components/title-banner/title-banner.jsx');

require('../../../../components/forms/button.scss');
require('./index.scss');

var ConferenceSplash = React.createClass({
    type: 'ConferenceSplash',

    render: function () {
        return (
            <div className='index mod-2018'>
                <TitleBanner className='mod-conference mod-2018'>
                    <div className='title-banner-image mod-2018'></div>
                    <h1 className='title-banner-h1 mod-2018'>
                        <center>
                          <FormattedHTMLMessage id='conference-2018.title' />
                        </center>
                    </h1>
                    <h3 className='title-banner-h3 mod-2018'>
                        <FormattedMessage id='conference-2018.dateDesc' />
                    </h3>
                </TitleBanner>
                <div className='inner'>
                    <section className='conf2018-panel mod-desc'>
                        <p className='conf2018-panel-desc'>
                            <FormattedHTMLMessage id='conference-2018.desc' />
                        </p>
                        <table className='conf2018-panel-details'>
                            <tbody>
                                <tr className='conf2018-panel-row'>
                                    <td className='conf2018-panel-row-icon'>
                                        <img
                                            className='conf2018-panel-row-icon-image'
                                            src='/svgs/conference/index/calendar-icon.svg'
                                            alt='Calendar Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2018.date' /></td>
                                    <td>
                                        <FormattedDate
                                            value={new Date(2018, 6, 26)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                        {' - '}
                                        <FormattedDate
                                            value={new Date(2018, 6, 28)}
                                            year='numeric'
                                            month='long'
                                            day='2-digit'
                                        />
                                        <FormattedMessage id='conference-2018.dateDescMore' />
                                    </td>
                                </tr>
                                <tr className='conf2018-panel-row'>
                                    <td className='conf2018-panel-row-icon'>
                                        <img
                                            className='conf2018-panel-row-icon-image'
                                            src='/svgs/conference/index/map-icon.svg'
                                            alt='Map Icon'
                                        />
                                    </td>
                                    <td><FormattedMessage id='conference-2018.location' /></td>
                                    <td><FormattedMessage id='conference-2018.locationDetails' /></td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section className='conf2018-panel'>
                        <p className='conf2018-panel-desc'>
                            <FormattedHTMLMessage id='conference-2018.sessionDesc' />
                        </p>
                        <p className='conf2018-panel-session'>
                            <p className='conf2018-panel-session'>
                                <FormattedHTMLMessage id='conference-2018.sessionItem1' />
                            </p>
                            <p className='conf2018-panel-session'>
                                <FormattedHTMLMessage id='conference-2018.sessionItem2' />
                            </p>
                            <p className='conf2018-panel-session'>
                                <FormattedHTMLMessage id='conference-2018.sessionItem3' />
                            </p>
                            <p className='conf2018-panel-session'>
                                <FormattedHTMLMessage id='conference-2018.sessionItem4' />
                            </p>
                        </p>
                        <a className='button mod-2018-panel' href='https://docs.google.com/forms/d/e/1FAIpQLSd7SkuQ-dfW-P3aArSQokK9GkKAUKufTVBHod_ElNIiFE9iBQ/viewform?usp=sf_link'>
                            <FormattedMessage id='conference-2018.proposal' />
                        </a>
                    </section>
                    <section className='conf2018-panel mod-registration'>
                        <FlexRow className='conf2018-panel-title'>
                            <div className='conf2018-panel-title-text'>
                                <h3><FormattedMessage id='conference-2018.registrationTitle' /></h3>
                            </div>
                        </FlexRow>
                        <p className='conf2018-panel-desc'>
                            <FormattedMessage id='conference-2018.registrationEarly' />
                            <br/>
                            <FormattedMessage id='conference-2018.registrationStandard' />
                        </p>
                    </section>
                    <section className='conf2018-panel mod-questions'>
                        <p className='conf2018-panel-desc'>
                            <FormattedHTMLMessage id='conference-2018.questions' />
                        </p>
                    </section>
                </div>
            </div>
        );
    }
});

render(<Page><ConferenceSplash /></Page>, document.getElementById('app'));
