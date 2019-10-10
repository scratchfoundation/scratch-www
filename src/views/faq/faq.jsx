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
                    <dd><FormattedMessage
                        id="faq.aboutScratchBody"
                        values={{aboutScratchLink: (
                            <a href="/about"><FormattedMessage id="faq.aboutScratchLinkText" /></a>
                        )}}
                    /></dd>

                    <dt><FormattedMessage id="faq.makeGameTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.makeGameBody"
                        values={{ideasLink: (
                            <a href="/ideas"><FormattedMessage id="faq.ideasLinkText" /></a>
                        )}}
                    /></dd>

                    <dt><FormattedMessage id="faq.whoUsesScratchTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.whoUsesScratchBody"
                        values={{scratchJrLink: (
                            <a href="https://www.scratchjr.org">ScratchJr</a>
                        )}}
                    /></dd>

                    <dt><FormattedMessage id="faq.requirementsTitle" /></dt>
                    <dd><FormattedMessage id="faq.requirementsBody" /></dd>
                    <b><FormattedMessage id="faq.requirementsDesktop" /></b>
                    <ul>
                        <li><FormattedMessage id="faq.requirementsDesktopChrome" /></li>
                        <li><FormattedMessage id="faq.requirementsDesktopEdge" /></li>
                        <li><FormattedMessage id="faq.requirementsDesktopFirefox" /></li>
                        <li><FormattedMessage id="faq.requirementsDesktopSafari" /></li>
                        <li><FormattedMessage id="faq.requirementsDesktopIE" /></li>
                    </ul>
                    <b><FormattedMessage id="faq.requirementsTablet" /></b>
                    <ul>
                        <li><FormattedMessage id="faq.requirementsTabletChrome" /></li>
                        <li><FormattedMessage id="faq.requirementsTabletSafari" /></li>
                    </ul>
                    <FormattedMessage id="faq.requirementsNote" />
                    <ul>
                        <li><FormattedMessage
                            id="faq.requirementsNoteDesktop"
                            values={{downloadLink: (
                                <a href="/download"><FormattedMessage id="faq.scratchApp" /></a>
                            )}}
                        /></li>
                        <li><FormattedMessage id="faq.requirementsNoteWebGL" /></li>
                        <li><FormattedMessage id="faq.requirementsNoteTablets" /></li>
                    </ul>
                    <dt><FormattedMessage id="faq.offlineTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.offlineBody"
                        values={{downloadLink: (
                            <a href="/download"><FormattedMessage id="faq.scratchApp" /></a>
                        )}}
                    /></dd>

                    <dt><FormattedMessage id="faq.uploadOldTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.uploadOldBody"
                        values={{scratch2Link: (
                            <a href="/download/scratch2">
                                <FormattedMessage id="faq.scratch2" />
                            </a>
                        )}}
                    /></dd>

                    <dt><FormattedMessage id="faq.scratchCostTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.scratchCostBody"
                        values={{donateLink: (
                            <a href="https://secure.donationpay.org/scratchfoundation/">
                                <FormattedMessage id="faq.donateLinkText" />
                            </a>
                        )}}
                    /></dd>

                    <dt><FormattedMessage id="faq.mediaLabTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.mediaLabBody"
                        values={{
                            llkLink: (
                                <a href="https://llk.media.mit.edu/">
                                    <FormattedMessage id="faq.llkLinkText" />
                                </a>
                            ),
                            mediaLabLink: (
                                <a href="https://www.media.mit.edu/">
                                    <FormattedMessage id="faq.mediaLabLinkText" />
                                </a>
                            )
                        }}
                    /></dd>
                </dl>
            </section>
            <section id="scratch3">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.scratch3Title" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.aboutScratch3Title" /></dt>
                    <dd><FormattedMessage id="faq.aboutScratch3Body" /></dd>
                    <dt><FormattedMessage id="faq.reportBugsScratch3Title" /></dt>
                    <dd><FormattedMessage
                        id="faq.reportBugsScratch3Body"
                        values={{forumsLink: (
                            <a href="https://scratch.mit.edu/discuss/3/">
                                <FormattedMessage id="faq.forumsLinkText" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.languagesScratch3Title" /></dt>
                    <dd>
                        <FormattedMessage id="faq.languagesScratch3Body1" />
                        <br /><br />
                        <FormattedMessage
                            id="faq.languagesScratch3Body2"
                            values={{
                                transifexLink: (
                                    <a href="https://www.transifex.com/llk/scratch-editor/">
                                        <FormattedMessage id="faq.transifexLinkText" />
                                    </a>
                                ),
                                emailLink: (
                                    <a href="mailto:translate@scratch.mit.edu">
                                        translate@scratch.mit.edu
                                    </a>
                                )
                            }}
                        />
                    </dd>
                    <dt><FormattedMessage id="faq.removedBlocksScratch3Title" /></dt>
                    <dd>
                        <FormattedMessage
                            id="faq.removedBlocksScratch3Body"
                            values={{extensionsFAQLink: (
                                <a href="#scratch-extensions"><FormattedMessage id="faq.scratchExtensionsTitle" /></a>
                            )}}
                        />
                    </dd>
                    <dt><FormattedMessage id="faq.newBlocksScratch3Title" /></dt>
                    <dd><FormattedMessage id="faq.newBlocksScratch3Body" /></dd>
                    <ul>
                        <li><FormattedMessage id="faq.newBlocksSoundEffect" /></li>
                        <li><FormattedMessage id="faq.newBlocksOperators" /></li>
                        <li><FormattedMessage id="faq.newBlocksPen" /></li>
                        <li><FormattedMessage id="faq.newBlocksGlide" /></li>
                        <li><FormattedMessage id="faq.newBlocksExtensions" /></li>

                    </ul>
                    <dt><FormattedMessage id="faq.biggerBlocksScratch3Title" /></dt>
                    <dd><FormattedMessage id="faq.biggerBlocksScratch3Body" /></dd>
                    <dt><FormattedMessage id="faq.paintEditorScratch3Title" /></dt>
                    <dd><FormattedMessage id="faq.paintEditorScratch3Body" /></dd>
                    <ul>
                        <li><FormattedMessage id="faq.paintEditorLayout" /></li>
                        <li><FormattedMessage id="faq.paintEditorTools" /></li>
                        <li><FormattedMessage id="faq.paintEditorColors" /></li>
                        <li><FormattedMessage id="faq.paintEditorVector" /></li>
                        <li><FormattedMessage id="faq.paintEditorLayers" /></li>
                        <li><FormattedMessage id="faq.paintEditorGradients" /></li>

                    </ul>
                    <dt><FormattedMessage id="faq.soundEditorScratch3Title" /></dt>
                    <dd><FormattedMessage id="faq.soundEditorScratch3Body" /></dd>
                    <ul>
                        <li><FormattedMessage id="faq.soundEditorRecording" /></li>
                        <li><FormattedMessage id="faq.soundEditorTrimming" /></li>
                        <li><FormattedMessage id="faq.soundEditorEffects" /></li>
                    </ul>
                    <dt><FormattedMessage id="faq.tipsWindwScratch3Title" /></dt>
                    <dd><FormattedMessage id="faq.tipsWindowScratch3Body" /></dd>

                </dl>
            </section>
            <section id="remix">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.remixTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.remixDefinitionTitle" /></dt>
                    <dd><FormattedMessage id="faq.remixDefinitionBody" /></dd>
                    <dt><FormattedMessage id="faq.remixableTitle" /></dt>
                    <dd><FormattedMessage id="faq.remixableBody" /></dd>
                    <dt><FormattedMessage id="faq.creativeCommonsTitle" /></dt>
                    <dd><FormattedMessage id="faq.creativeCommonsBody" /></dd>
                    <dt><FormattedMessage id="faq.fairUseTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.fairUseBody"
                        values={{ccLink: (
                            <a href="https://search.creativecommons.org/">
                                <FormattedMessage id="faq.ccLinkText" />
                            </a>
                        )}}
                    /></dd>
                </dl>
            </section>
            <section id="accounts">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.accountsTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.whyAccountTitle" /></dt>
                    <dd><FormattedMessage id="faq.whyAccountBody" /></dd>

                    <dt><FormattedMessage id="faq.createAccountTitle" /></dt>
                    <dd><FormattedMessage id="faq.createAccountBody" /></dd>

                    <dt><FormattedMessage id="faq.howToConfirmTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.howToConfirmBody"
                        values={{contactLink: (
                            <a href="/contact-us"><FormattedMessage id="faq.contactLinkText" /></a>
                        )}}
                    /></dd>

                    <dt><FormattedMessage id="faq.checkConfirmedTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.checkConfirmedBody"
                        values={{settingsLink: (
                            <a href="/accounts/email_change">
                                <FormattedMessage id="faq.settingsLinkText" />
                            </a>
                        )}}
                    /></dd>

                    <dt><FormattedMessage id="faq.requireConfirmTitle" /></dt>
                    <dd><FormattedMessage id="faq.requireConfirmBody" /></dd>
                    <dt><FormattedMessage id="faq.forgotPasswordTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.forgotPasswordBody"
                        values={{resetLink: (
                            <a href="/accounts/password_reset/">
                                <FormattedMessage id="faq.resetLinkText" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.changePasswordTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.changePasswordBody"
                        values={{changeLink: (
                            <a href="/accounts/password_change/">
                                <FormattedMessage id="faq.changeLinkText" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.changeEmailTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.changeEmailBody"
                        values={{changeEmailLink: (
                            <a href="/accounts/email_change/">
                                <FormattedMessage id="faq.settingsLinkText" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.newScratcherTitle" /></dt>
                    <dd><FormattedMessage id="faq.newScratcherBody" /></dd>
                    <dt><FormattedMessage id="faq.multipleAccountTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.multipleAccountBody"
                        values={{cgLink: (
                            <a href="/community_guidelines">
                                <FormattedMessage id="general.guidelines" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.multipleLoginTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.multipleLoginBody"
                        values={{cgLink: (
                            <a href="/community_guidelines">
                                <FormattedMessage id="general.guidelines" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.changeUsernameTitle" /></dt>
                    <dd><FormattedMessage id="faq.changeUsernameBody" /></dd>
                    <dt><FormattedMessage id="faq.shareInfoTitle" /></dt>
                    <dd><FormattedMessage id="faq.shareInfoBody" /></dd>
                    <dt><FormattedMessage id="faq.deleteAccountTitle" /></dt>
                    <dd><FormattedMessage id="faq.deleteAccountBody" /></dd>
                </dl>
            </section>
            <section id="permissions">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.permissionsTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.scratchFreeTitle" /></dt>
                    <dd><FormattedMessage id="faq.scratchFreeBody" /></dd>
                    <dt><FormattedMessage id="faq.scratchScreenshotTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.scratchScreenshotBody"
                        values={{licenseLink: (
                            <a href="https://creativecommons.org/licenses/by-sa/2.0/deed.en">
                                <FormattedMessage id="faq.licenseLinkText" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.scratchDescriptionTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.scratchDescriptionBody"
                        values={{sfLink: (
                            <a href="https://www.scratchfoundation.org/">
                                <FormattedMessage id="general.scratchFoundation" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.presentScratchTitle" /></dt>
                    <dd><FormattedMessage id="faq.presentScratchBody" /></dd>
                    <dt><FormattedMessage id="faq.supportMaterialTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.supportMaterialBody"
                        values={{licenseLink: (
                            <a href="https://creativecommons.org/licenses/by-sa/2.0/deed.en">
                                <FormattedMessage id="faq.licenseLinkText" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.sellProjectsTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.sellProjectsBody"
                        values={{licenseLink: (
                            <a href="https://creativecommons.org/licenses/by-sa/2.0/deed.en">
                                <FormattedMessage id="faq.licenseLinkText" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.sourceCodeTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.sourceCodeBody"
                        values={{
                            guiLink: (
                                <a href="https://github.com/LLK/scratch-gui">GitHub</a>
                            ),
                            flashLink: (
                                <a href="https://github.com/LLK/scratch-flash">
                                    <FormattedMessage id="faq.scratch2" />
                                </a>
                            ),
                            scratch14Link: (
                                <a href="https://github.com/LLK/Scratch_1.4">
                                    <FormattedMessage id="faq.scratch14" />
                                </a>
                            ),
                            developersLink: (
                                <a href="/developers">
                                    <FormattedMessage id="general.forDevelopers" />
                                </a>
                            )
                        }}
                    /></dd>
                </dl>
            </section>
            <section id="inappropriate-content">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.inappropriateContentTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.okayToShareTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.okayToShareBody"
                        values={{cgLink: (
                            <a href="/community_guidelines">
                                <FormattedMessage id="general.guidelines" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.reportContentTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.reportContentBody"
                        values={{contactLink: (
                            <a href="/contact-us">
                                <FormattedMessage id="general.contactUs" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.noFlameTitle" /></dt>
                    <dd><FormattedMessage id="faq.noFlameBody" /></dd>
                    <dt><FormattedMessage id="faq.reviewContentTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.reviewContentBody"
                        values={{cgLink: (
                            <a href="/community_guidelines">
                                <FormattedMessage id="general.guidelines" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.blockedAccountTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.blockedAccountBody"
                        values={{cgLink: (
                            <a href="/community_guidelines">
                                <FormattedMessage id="general.guidelines" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.stolenAccountTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.stolenAccountBody"
                        values={{
                            contactLink: (
                                <a href="/contact-us">
                                    <FormattedMessage id="general.contactUs" />
                                </a>
                            ),
                            cgLink: (
                                <a href="/community_guidelines">
                                    <FormattedMessage id="general.guidelines" />
                                </a>
                            )
                        }}
                    /></dd>
                </dl>
            </section>
            <section id="scratch-extensions">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.scratchExtensionsTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.aboutExtensionsTitle" /></dt>
                    <dd><FormattedMessage id="faq.aboutExtensionsBody" /></dd>
                    <dt><FormattedMessage id="faq.howToAddExtensionsTitle" /></dt>
                    <dd><FormattedMessage id="faq.howToAddExtensionsBody" /></dd>
                    <dt><FormattedMessage id="faq.createExtensionsTitle" /></dt>
                    <dd><FormattedMessage id="faq.createExtensionsBody" /></dd>
                    <dt><FormattedMessage id="faq.scratchXTitle" /></dt>
                    <dd><FormattedMessage id="faq.scratchXBody" /></dd>
                </dl>
            </section>
            <section id="clouddata">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.cloudDataTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.cloudDataInfoTitle" /></dt>
                    <dd><FormattedMessage id="faq.cloudDataInfoBody" /></dd>
                    <dt><FormattedMessage id="faq.storedCloudInfoTitle" /></dt>
                    <dd><FormattedMessage id="faq.storedCloudInfoBody" /></dd>
                    <dt><FormattedMessage id="faq.onlyNumbersTitle" /></dt>
                    <dd><FormattedMessage id="faq.onlyNumbersBody" /></dd>
                    <dt><FormattedMessage id="faq.reportCloudTitle" /></dt>
                    <dd><FormattedMessage id="faq.reportCloudBody" /></dd>
                    <dt><FormattedMessage id="faq.chatRoomTitle" /></dt>
                    <dd><FormattedMessage id="faq.chatRoomBody" /></dd>
                    <dt><FormattedMessage id="faq.makeCloudVarTitle" /></dt>
                    <dd><FormattedMessage id="faq.makeCloudVarBody" /></dd>
                    <dt><FormattedMessage id="faq.changeCloudVarTitle" /></dt>
                    <dd><FormattedMessage id="faq.changeCloudVarBody" /></dd>
                    <dt><FormattedMessage id="faq.newScratcherCloudTitle" /></dt>
                    <dd><FormattedMessage id="faq.newScratcherCloudBody" /></dd>
                    <dt><FormattedMessage id="faq.multiplayerTitle" /></dt>
                    <dd><FormattedMessage id="faq.multiplayerBody" /></dd>
                </dl>
            </section>
            <section id="schools">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.schoolsTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.howTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.howBody"
                        values={{educatorsLink: (
                            <a href="/educators">
                                <FormattedMessage id="faq.educatorsLinkText" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.noInternetTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.noInternetBody"
                        values={{downloadLink: (
                            <a href="/download">
                                <FormattedMessage id="faq.scratchApp" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.communityTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.communityBody"
                        values={{cgLink: (
                            <a href="/community_guidelines">
                                <FormattedMessage id="general.guidelines" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.teacherAccountTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.teacherAccountBody"
                        values={{eduFaqLink: (
                            <a href="/educators/faq">
                                <FormattedMessage id="faq.eduFaqLinkText" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.requestTitle" /></dt>
                    <dd><FormattedMessage
                        id="faq.requestBody"
                        values={{educatorsLink: (
                            <a href="/educators">
                                <FormattedMessage id="faq.educatorsLinkText" />
                            </a>
                        )}}
                    /></dd>
                    <dt><FormattedMessage id="faq.dataTitle" /></dt>
                    <dd><FormattedMessage id="faq.dataBody" /></dd>
                    <dt><FormattedMessage id="faq.lawComplianceTitle" /></dt>
                    <dd>
                        <FormattedMessage id="faq.lawComplianceBody1" />
                        <br /><br />
                        <FormattedMessage
                            id="faq.lawComplianceBody2"
                            values={{downloadLink: (
                                <a href="/download">
                                    <FormattedMessage id="faq.scratchApp" />
                                </a>
                            )}}
                        />
                    </dd>
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
