import React from 'react';
import render from '../../../lib/render.jsx';

import {FormattedHTMLMessage} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import {injectIntl} from 'react-intl';

import Page from '../../../components/page/www/page.jsx';
import FlexRow from '../../../components/flex-row/flex-row.jsx';
import SubNavigation from '../../../components/subnavigation/subnavigation.jsx';
import TitleBanner from '../../../components/title-banner/title-banner.jsx';

require('./landing.scss');

var Landing = injectIntl(React.createClass({
    type: 'Landing',
    render: function () {
        return (
            <div className="educators">
                <TitleBanner className="masthead">
                    <div className="inner">
                        <h1 className="title-banner-h1">
                            <FormattedMessage id="teacherlanding.title" />
                        </h1>
                        <FlexRow className="masthead-info">
                            <p className="title-banner-p intro">
                                <FormattedMessage id="teacherlanding.intro" />
                            </p>
                            <div className="ted-talk">
                                <iframe src="https://www.youtube.com/embed/uPSuG063jhA?border=0&wmode=transparent"
                                    frameBorder="0" allowFullScreen></iframe>
                            </div>
                        </FlexRow>
                    </div>
                    <div className="band">
                        <SubNavigation className="inner">
                            <a href="#in-practice">
                                <li>
                                    <FormattedMessage id="teacherlanding.inPracticeTitle" />
                                </li>
                            </a>
                            <a href="#resources">
                                <li>
                                    <FormattedMessage id="teacherlanding.resourcesAnchor" />
                                </li>
                            </a>
                            <a href="#teacher-accounts">
                                <li>
                                    <FormattedMessage id="general.teacherAccounts" />
                                </li>
                            </a>
                        </SubNavigation>
                    </div>
                </TitleBanner>

                <div className="inner">
                    <section id="in-practice">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id="teacherlanding.inPracticeTitle" /></h2>
                        <p className="intro"><FormattedMessage id="teacherlanding.inPracticeIntro" /></p>
                        <FlexRow className="general-usage">
                            <p><FormattedHTMLMessage id="teacherlanding.generalUsageSettings" /></p>
                            <p><FormattedHTMLMessage id="teacherlanding.generalUsageGradeLevels" /></p>
                            <p><FormattedHTMLMessage id="teacherlanding.generalUsageSubjectAreas"/></p>
                        </FlexRow>
                    </section>
                    <section id="resources">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id="general.resourcesTitle" /></h2>
                        <FlexRow className="educator-community">
                            <div>
                                <h3><FormattedMessage id="teacherlanding.scratchEdTitle" /></h3>
                                <p>
                                    <FormattedHTMLMessage id="teacherlanding.scratchEdDescription" />
                                </p>
                            </div>
                            <div>
                                <h3><FormattedMessage id="teacherlanding.meetupTitle" /></h3>
                                <p>
                                    <FormattedHTMLMessage id="teacherlanding.meetupDescription" />
                                </p>
                            </div>
                        </FlexRow>
                        <h3 id="guides-header"><FormattedMessage id="teacherlanding.guidesTitle" /></h3>
                        <FlexRow className="guides-and-tutorials">
                            <div>
                                <a href="/tips">
                                    <img src="/svgs/teachers/v2-cards.svg" alt="cards icon" />
                                </a>
                                <p>
                                    <FormattedHTMLMessage id="teacherlanding.tttPage" />
                                </p>
                            </div>
                            <div>
                                <a href="/projects/editor/?tip_bar=home">
                                    <img src="/svgs/teachers/tips-window.svg" alt="tips window icon" />
                                </a>
                                <p>
                                    <FormattedHTMLMessage id="teacherlanding.tipsWindow" />
                                </p>
                            </div>
                            <div>
                                <a href="http://scratched.gse.harvard.edu/guide/">
                                    <img src="/svgs/teachers/creative-computing.svg" alt="creative computing icon" />
                                </a>
                                <p>
                                    <FormattedHTMLMessage id="teacherlanding.creativeComputing" />
                                </p>
                            </div>
                        </FlexRow>
                    </section>
                </div>
                <div id="teacher-accounts">
                    <div className="inner account-flex">
                        <div id="left">
                            <h2><FormattedMessage id="teacherlanding.accountsTitle" /></h2>
                            <p>
                                <FormattedHTMLMessage id="teacherlanding.accountsDescription" />
                            </p>
                            <SubNavigation className="teacher-account-buttons" align="left">
                                <a href="/educators/register">
                                    <li><FormattedMessage id="teacherlanding.requestAccount" /></li>
                                </a>
                            </SubNavigation>
                        </div>
                        <img src="/images/teachers/teacher-account.png" alt="teacher account" id="teacher-icon"/>
                    </div>
                </div>
            </div>
        );
    }
}));

render(<Page><Landing /></Page>, document.getElementById('app'));
