const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

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

                    <dt><FormattedMessage id="faq.requirementsTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.requirementsBody" /></dd>

                    <dt><FormattedMessage id="faq.offlineTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.offlineBody" /></dd>

                    <dt><FormattedMessage id="faq.uploadOldTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.uploadOldBody" /></dd>

                    <dt><FormattedMessage id="faq.recordVideoTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.recordVideoBody" /></dd>

                    <dt><FormattedMessage id="faq.scratchCostTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.scratchCostBody" /></dd>

                    <dt><FormattedMessage id="faq.mediaLabTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.mediaLabBody" /></dd>
                </dl>
            </section>
            <section id="privacy">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.privacyTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.accountInfoTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.accountInfoList" /></dd>
                    <ul>
                        <li><FormattedHTMLMessage id="faq.privacyUsername" /></li>
                        <li><FormattedHTMLMessage id="faq.privacyCountry" /></li>
                        <li><FormattedHTMLMessage id="faq.privacyBirthdate" /></li>
                        <li><FormattedHTMLMessage id="faq.privacyGender" /></li>
                        <li><FormattedHTMLMessage id="faq.privacyEmail" /></li>
                    </ul>
                    <dd><FormattedHTMLMessage id="faq.accountPublicInfo" /></dd>
                    <dt><FormattedMessage id="faq.dataCollectionTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.dataCollectionOne" /></dd>
                    <dt><FormattedMessage id="faq.rentInfoTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.rentInfoBody" /></dd>
                    <dt><FormattedMessage id="faq.viewUnsharedTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.viewUnsharedBody" /></dd>
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
                    <dt><FormattedMessage id="faq.confirmedAccountTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.confirmedAccountBody" /></dd>
                    <dt><FormattedMessage id="faq.checkConfirmedTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.checkConfirmedBody" /></dd>
                    <dt><FormattedMessage id="faq.howToConfirmTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.howToConfirmBody" /></dd>
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
                    <dt><FormattedMessage id="faq.cloudLagTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.cloudLagBody" /></dd>
                </dl>
            </section>
            <section id="schools">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="faq.schoolsTitle" /></h2>
                <dl>
                    <dt><FormattedMessage id="faq.howTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.howBody" /></dd>
                    <dt><FormattedMessage id="faq.ageTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.ageBody" /></dd>
                    <dt><FormattedMessage id="faq.noInternetTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.noInternetBody" /></dd>
                    <dt><FormattedMessage id="faq.communityTitle" /></dt>
                    <dd><FormattedMessage id="faq.communityBody" /></dd>
                    <dt><FormattedMessage id="faq.teacherAccountTitle" /></dt>
                    <dd><FormattedMessage id="faq.teacherAccountBody" /></dd>
                    <dt><FormattedMessage id="faq.requestTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.requestBody" /></dd>
                    <dt><FormattedMessage id="faq.edTitle" /></dt>
                    <dd><FormattedHTMLMessage id="faq.edBody" /></dd>
                    <dt><FormattedMessage id="faq.dataTitle" /></dt>
                    <dd><FormattedMessage id="faq.dataBody" /></dd>
                    <dt><FormattedMessage id="faq.lawComplianceTitle" /></dt>
                    <dd><FormattedMessage id="faq.lawComplianceBody" /></dd>
                </dl>
                <i><FormattedHTMLMessage id="faq.schoolsMoreInfo" /></i>
            </section>
        </div>
        <nav>
            <ol>
                <li><a href="#about-scratch"><FormattedMessage id="faq.aboutTitle" /></a></li>
                <li><a href="#privacy"><FormattedMessage id="faq.privacyTitle" /></a></li>
                <li><a href="#remix"><FormattedMessage id="faq.remixTitle" /></a></li>
                <li><a href="#accounts"><FormattedMessage id="faq.accountsTitle" /></a></li>
                <li><a href="#permissions"><FormattedMessage id="faq.permissionsTitle" /></a></li>
                <li><a href="#inappropriate-content">
                    <FormattedMessage id="faq.inappropriateContentTitle" />
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
