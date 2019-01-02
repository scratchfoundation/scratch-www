const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const Faq = injectIntl(props => (
    <InformationPage title={props.intl.formatMessage({id: 'faq.title'})}>
        <div className="inner info-inner">
            <section id="about-scratch">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.aboutTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.aboutScratchTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.aboutScratchBody" /></dd>

                    <dt><FormattedMessage id="faq.makeGameTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.makeGameBody" /></dd>

                    <dt><FormattedMessage id="faq.whoUsesScratchTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.whoUsesScratchBody" /></dd>

                    <dt><FormattedMessage id="faq.requirementsTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.requirementsBody" /></dd>
                    <b><FormattedHTMLMessage id="faq.requirementsDesktop" /></b>
                    <ul>
                        <li><FormattedHTMLMessage id="faq.requirementsDesktopChrome" /></li>
                        <li><FormattedHTMLMessage id="faq.requirementsDesktopEdge" /></li>
                        <li><FormattedHTMLMessage id="faq.requirementsDesktopFirefox" /></li>
                        <li><FormattedHTMLMessage id="faq.requirementsDesktopSafari" /></li>
                        <li><FormattedHTMLMessage id="faq.requirementsDesktopIE" /></li>

                    </ul>
                    <b><FormattedHTMLMessage id="faq.requirementsTablet" /></b>
                    <ul>
                        <li><FormattedHTMLMessage id="faq.requirementsTabletChrome" /></li>
                        <li><FormattedHTMLMessage id="faq.requirementsTabletSafari" /></li>
                    </ul>
                    <FormattedMessage id="faq.requirementsNote" />
                    <ul>
                        <li><FormattedHTMLMessage id="faq.requirementsNoteDesktop" /></li>
                        <li><FormattedHTMLMessage id="faq.requirementsNoteWebGL" /></li>
                        <li><FormattedHTMLMessage id="faq.requirementsNoteTablets" /></li>
                    </ul>
                    <dt><FormattedMessage id="faq.offlineTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.offlineBody" /></dd>

                    <dt><FormattedMessage id="faq.uploadOldTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.uploadOldBody" /></dd>

                    <dt><FormattedMessage id="faq.scratchCostTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.scratchCostBody" /></dd>

                    <dt><FormattedMessage id="faq.mediaLabTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.mediaLabBody" /></dd>
                </dl>
            </section>
            <section id="scratch3">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.scratch3Title" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.aboutScratch3Title" /></dt>
                    <dd><FormattedHTMLMessage id="faq.aboutScratch3Body" /></dd>
                    <dt><FormattedMessage id="faq.reportBugsScratch3Title" /></dt>
                    <dd><FormattedHTMLMessage id="faq.reportBugsScratch3Body" /></dd>
                    <dt><FormattedMessage id="faq.languagesScratch3Title" /></dt>
                    <dd><FormattedHTMLMessage id="faq.languagesScratch3Body" /></dd>
                    <dt><FormattedMessage id="faq.removedBlocksScratch3Title" /></dt>
                    <dd><FormattedHTMLMessage id="faq.removedBlocksScratch3Body" /></dd>
                    <dt><FormattedMessage id="faq.newBlocksScratch3Title" /></dt>
                    <dd><FormattedHTMLMessage id="faq.newBlocksScratch3Body" /></dd>
                    <ul>
                        <li><FormattedHTMLMessage id="faq.newBlocksSoundEffect" /></li>
                        <li><FormattedHTMLMessage id="faq.newBlocksOperators" /></li>
                        <li><FormattedHTMLMessage id="faq.newBlocksPen" /></li>
                        <li><FormattedHTMLMessage id="faq.newBlocksGlide" /></li>
                        <li><FormattedHTMLMessage id="faq.newBlocksExtensions" /></li>

                    </ul>
                    <dt><FormattedMessage id="faq.biggerBlocksScratch3Title" /></dt>
                    <dd><FormattedHTMLMessage id="faq.biggerBlocksScratch3Body" /></dd>
                    <dt><FormattedMessage id="faq.paintEditorScratch3Title" /></dt>
                    <dd><FormattedHTMLMessage id="faq.paintEditorScratch3Body" /></dd>
                    <ul>
                        <li><FormattedHTMLMessage id="faq.paintEditorLayout" /></li>
                        <li><FormattedHTMLMessage id="faq.paintEditorTools" /></li>
                        <li><FormattedHTMLMessage id="faq.paintEditorColors" /></li>
                        <li><FormattedHTMLMessage id="faq.paintEditorVector" /></li>
                        <li><FormattedHTMLMessage id="faq.paintEditorLayers" /></li>
                        <li><FormattedHTMLMessage id="faq.paintEditorGradients" /></li>

                    </ul>
                    <dt><FormattedMessage id="faq.soundEditorScratch3Title" /></dt>
                    <dd><FormattedHTMLMessage id="faq.soundEditorScratch3Body" /></dd>
                    <ul>
                        <li><FormattedHTMLMessage id="faq.soundEditorRecording" /></li>
                        <li><FormattedHTMLMessage id="faq.soundEditorTrimming" /></li>
                        <li><FormattedHTMLMessage id="faq.soundEditorEffects" /></li>
                    </ul>
                    <dt><FormattedMessage id="faq.tipsWindwScratch3Title" /></dt>
                    <dd><FormattedHTMLMessage id="faq.tipsWindowScratch3Body" /></dd>

                </dl>
            </section>
            <section id="remix">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.remixTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.remixDefinitionTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.remixDefinitionBody" /></dd>
                    <dt><FormattedMessage id="faq.remixableTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.remixableBody" /></dd>
                    <dt><FormattedMessage id="faq.creativeCommonsTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.creativeCommonsBody" /></dd>
                    <dt><FormattedMessage id="faq.fairUseTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.fairUseBody" /></dd>
                </dl>
            </section>
            <section id="accounts">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.accountsTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.whyAccountTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.whyAccountBody" /></dd>

                    <dt><FormattedMessage id="faq.createAccountTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.createAccountBody" /></dd>

                    <dt><FormattedMessage id="faq.howToConfirmTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.howToConfirmBody" /></dd>

                    <dt><FormattedMessage id="faq.checkConfirmedTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.checkConfirmedBody" /></dd>

                    <dt><FormattedMessage id="faq.requireConfirmTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.requireConfirmBody" /></dd>
                    <dt><FormattedMessage id="faq.forgotPasswordTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.forgotPasswordBody" /></dd>
                    <dt><FormattedMessage id="faq.changePasswordTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.changePasswordBody" /></dd>
                    <dt><FormattedMessage id="faq.changeEmailTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.changeEmailBody" /></dd>
                    <dt><FormattedMessage id="faq.newScratcherTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.newScratcherBody" /></dd>
                    <dt><FormattedMessage id="faq.multipleAccountTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.multipleAccountBody" /></dd>
                    <dt><FormattedMessage id="faq.multipleLoginTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.multipleLoginBody" /></dd>
                    <dt><FormattedMessage id="faq.changeUsernameTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.changeUsernameBody" /></dd>
                    <dt><FormattedMessage id="faq.shareInfoTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.shareInfoBody" /></dd>
                    <dt><FormattedMessage id="faq.deleteAccountTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.deleteAccountBody" /></dd>
                </dl>
            </section>
            <section id="permissions">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.permissionsTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.scratchFreeTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.scratchFreeBody" /></dd>
                    <dt><FormattedMessage id="faq.scratchScreenshotTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.scratchScreenshotBody" /></dd>
                    <dt><FormattedMessage id="faq.scratchDescriptionTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.scratchDescriptionBody" /></dd>
                    <dt><FormattedMessage id="faq.presentScratchTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.presentScratchBody" /></dd>
                    <dt><FormattedMessage id="faq.supportMaterialTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.supportMaterialBody" /></dd>
                    <dt><FormattedMessage id="faq.sellProjectsTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.sellProjectsBody" /></dd>
                    <dt><FormattedMessage id="faq.sourceCodeTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.sourceCodeBody" /></dd>
                </dl>
            </section>
            <section id="inappropriate-content">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.inappropriateContentTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.okayToShareTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.okayToShareBody" /></dd>
                    <dt><FormattedMessage id="faq.reportContentTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.reportContentBody" /></dd>
                    <dt><FormattedMessage id="faq.noFlameTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.noFlameBody" /></dd>
                    <dt><FormattedMessage id="faq.reviewContentTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.reviewContentBody" /></dd>
                    <dt><FormattedMessage id="faq.blockedAccountTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.blockedAccountBody" /></dd>
                    <dt><FormattedMessage id="faq.stolenAccountTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.stolenAccountBody" /></dd>
                </dl>
            </section>
            <section id="scratch-extensions">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.scratchExtensionsTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.aboutExtensionsTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.aboutExtensionsBody" /></dd>
                    <dt><FormattedMessage id="faq.howToAddExtensionsTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.howToAddExtensionsBody" /></dd>
                    <dt><FormattedMessage id="faq.createExtensionsTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.createExtensionsBody" /></dd>
                    <dt><FormattedMessage id="faq.scratchXTitle" /></dt>
                    <dd><FormattedMessage id="faq.scratchXBody" /></dd>
                </dl>
            </section>
            <section id="clouddata">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.cloudDataTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.cloudDataInfoTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.cloudDataInfoBody" /></dd>
                    <dt><FormattedMessage id="faq.storedCloudInfoTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.storedCloudInfoBody" /></dd>
                    <dt><FormattedMessage id="faq.onlyNumbersTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.onlyNumbersBody" /></dd>
                    <dt><FormattedMessage id="faq.reportCloudTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.reportCloudBody" /></dd>
                    <dt><FormattedMessage id="faq.chatRoomTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.chatRoomBody" /></dd>
                    <dt><FormattedMessage id="faq.makeCloudVarTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.makeCloudVarBody" /></dd>
                    <dt><FormattedMessage id="faq.changeCloudVarTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.changeCloudVarBody" /></dd>
                    <dt><FormattedMessage id="faq.newScratcherCloudTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.newScratcherCloudBody" /></dd>
                    <dt><FormattedMessage id="faq.multiplayerTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.multiplayerBody" /></dd>
                </dl>
            </section>
            <section id="schools">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.schoolsTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.howTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.howBody" /></dd>
                    <dt><FormattedMessage id="faq.noInternetTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.noInternetBody" /></dd>
                    <dt><FormattedMessage id="faq.communityTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.communityBody" /></dd>
                    <dt><FormattedMessage id="faq.teacherAccountTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.teacherAccountBody" /></dd>
                    <dt><FormattedMessage id="faq.requestTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.requestBody" /></dd>
                    <dt><FormattedMessage id="faq.dataTitle" /></dt>
                    <dd><FormattedMessage id="faq.dataBody" /></dd>
                    <dt><FormattedMessage id="faq.lawComplianceTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.lawComplianceBody" /></dd>
                </dl>
            </section>
        </div>
        <nav>
            <ol>
                <li><a href="#about-scratch"><FormattedMessage id="faq.aboutTitle" /></a></li>
                <li><a href="#scratch3"><FormattedMessage id="faq.scratch3Title" /></a></li>
                <li><a href="#remix"><FormattedMessage id="faq.remixTitle" /></a></li>
                <li><a href="#accounts"><FormattedMessage id="faq.accountsTitle" /></a></li>
                <li><a href="#permissions"><FormattedMessage id="faq.permissionsTitle" /></a></li>
                <li><a href="#inappropriate-content">
                    <FormattedMessage id="faq.inappropriateContentTitle" />
                </a></li>
                <li><a href="#scratch-extensions">
                    <FormattedMessage id="faq.scratchExtensionsTitle" />
                </a></li>
                <li><a href="#clouddata"><FormattedMessage id="faq.cloudDataTitle" /></a></li>
                <li><a href="#schools"><FormattedMessage id="faq.schoolsTitle" /></a></li>
            </ol>
        </nav>
    </InformationPage>
));

Faq.propTypes = {
    intl: intlShape
};

render(<Page><Faq /></Page>, document.getElementById('app'));
