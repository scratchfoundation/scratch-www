var React = require('react');
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var Page = require('../../components/page/www/page.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');

require('./faq.scss');

var Faq = React.createClass({
    type: 'Faq',
    render: function () {
        return (
            <div className="faq">
                <TitleBanner className="masthead">
                    <div className="inner">
                        <h1>FAQ</h1>
                        <p className="intro"><FormattedMessage id='faq.intro' /></p>
                    </div>
                    <div className="band">
                        <SubNavigation className="inner">
                            <a href="#about-scratch">
                                <li>
                                    <FormattedMessage id='faq.aboutTitle' />
                                </li>
                            </a>
                            <a href="#privacy">
                                <li>
                                    <FormattedMessage id='faq.privacyTitle' />
                                </li>
                            </a>
                            <a href="#remix">
                                <li>
                                    <FormattedMessage id='faq.remixTitle' />
                                </li>
                            </a>
                            <a href="#accounts">
                                <li>
                                    <FormattedMessage id='faq.accountsTitle' />
                                </li>
                            </a>
                            <a href="#permissions">
                                <li>
                                    <FormattedMessage id='faq.permissionsTitle' />
                                </li>
                            </a>
                            <a href="#inappropriate-content">
                                <li>
                                    <FormattedMessage id='faq.inappropriateContentTitle' />
                                </li>
                            </a>
                            <a href="#clouddata">
                                <li>
                                    <FormattedMessage id='faq.cloudDataTitle' />
                                </li>
                            </a>
                        </SubNavigation>
                    </div>
                </TitleBanner>
                <div className="inner">
                    <section id="about-scratch">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='faq.aboutTitle' /></h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.aboutScratchTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.aboutScratchBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.makeGameTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.makeGameBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3 id="requirements"><FormattedMessage id='faq.requirementsTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.requirementsBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.offlineTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.offlineBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.uploadOldTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.uploadOldBody' /></p>
                            </div>
                       </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.recordVideoTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.recordVideoBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.scratchCostTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.scratchCostBody' /></p>
                            </div>
                        </FlexRow>
                       <FlexRow className="sidebar-row">
                           <div className="body-copy column">
                               <h3><FormattedMessage id='faq.mediaLabTitle' /></h3>
                               <p><FormattedHTMLMessage id='faq.mediaLabBody' /></p>
                           </div>
                        </FlexRow>
                    </section>

                    <section id="privacy">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='faq.privacyTitle' /></h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.accountInfoTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.accountInfoList' /></p>
                                <ul>
                                    <li><FormattedHTMLMessage id='faq.privacyUsername' /></li>
                                    <li><FormattedHTMLMessage id='faq.privacyCountry' /></li>
                                    <li><FormattedHTMLMessage id='faq.privacyBirthdate' /></li>
                                    <li><FormattedHTMLMessage id='faq.privacyGender' /></li>
                                    <li><FormattedHTMLMessage id='faq.privacyEmail' /></li>
                                </ul>
                                <p><FormattedHTMLMessage id='faq.accountPublicInfo' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.dataCollectionTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.dataCollectionOne' /></p>

                                <p><FormattedHTMLMessage id='faq.dataCollectionTwo' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.rentInfoTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.rentInfoBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.viewUnsharedTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.viewUnsharedBody' /></p>
                            </div>
                        </FlexRow>
                    </section>
                    <section id="remix">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='faq.remixTitle' /></h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.remixDefinitionTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.remixDefinitionBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.remixableTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.remixableBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.creativeCommonsTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.creativeCommonsBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                             <div className="body-copy column">
                                 <h3><FormattedMessage id='faq.fairUseTitle' /></h3>
                                 <p><FormattedHTMLMessage id='faq.fairUseBody' /></p>
                             </div>
                        </FlexRow>
                </section>
                <section id="accounts">
                    <span className="nav-spacer"></span>
                    <h2><FormattedMessage id='faq.accountsTitle' /></h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.confirmedAccountTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.confirmedAccountBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.checkConfirmedTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.checkConfirmedBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.howToConfirmTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.howToConfirmBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.requireConfirmTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.requireConfirmBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.forgotPasswordTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.forgotPasswordBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.changePasswordTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.changePasswordBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.changeEmailTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.changeEmailBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.newScratcherTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.newScratcherBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.multipleAccountTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.multipleAccountBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.multipleLoginTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.multipleLoginBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.changeUsernameTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.changeUsernameBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.shareInfoTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.shareInfoBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.deleteAccountTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.deleteAccountBody' /></p>
                            </div>
                        </FlexRow>
                    </section>
                    <section id="permissions">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='faq.permissionsTitle' /></h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.scratchFreeTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.scratchFreeBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.scratchScreenshotTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.scratchScreenshotBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.scratchDescriptionTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.scratchDescriptionBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.presentScratchTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.presentScratchBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.supportMaterialTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.supportMaterialBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.sellProjectsTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.sellProjectsBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.sourceCodeTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.sourceCodeBody' /></p>
                            </div>
                        </FlexRow>
                    </section>
                    <section id="inappropriate-content">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='faq.inappropriateContentTitle' /></h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.okayToShareTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.okayToShareBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.reportContentTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.reportContentBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.noFlameTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.noFlameBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.reviewContentTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.reviewContentBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.blockedAccountTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.blockedAccountBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.stolenAccountTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.stolenAccountBody' /></p>
                            </div>
                        </FlexRow>
                    </section>
                    <section id="clouddata">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='faq.cloudDataTitle' /></h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.cloudDataInfoTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.cloudDataInfoBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.storedCloudInfoTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.storedCloudInfoBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.onlyNumbersTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.onlyNumbersBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.reportCloudTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.reportCloudBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.chatRoomTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.chatRoomBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.makeCloudVarTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.makeCloudVarBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.changeCloudVarTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.changeCloudVarBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.newScratcherCloudTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.newScratcherCloudBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.multiplayerTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.multiplayerBody' /></p>
                            </div>
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='faq.cloudLagTitle' /></h3>
                                <p><FormattedHTMLMessage id='faq.cloudLagBody' /></p>
                            </div>
                        </FlexRow>
                    </section>
                </div>
            </div>
        );
    }
});

render(<Page><Faq /></Page>, document.getElementById('app'));
