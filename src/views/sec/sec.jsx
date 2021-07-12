const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');
const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');

const render = require('../../lib/render.jsx');
const Page = require('../../components/page/www/page.jsx');

require('./sec.scss');

const EducationCollaborative = () => (
    <div className="education-collaborative">
        <TitleBanner className="masthead">
            <div className="inner">
                <FlexRow className="masthead-info uneven">
                    <div className="long">
                        <h1 className="title-banner-h1">
                            <FormattedMessage id="sec.title" />
                        </h1>
                        <p className="title-banner-p intro">
                            <FormattedMessage id="sec.intro"/> | <FormattedMessage id="sec.yearRange"/>
                        </p>
                    </div>
                    <img
                        alt=""
                        className="title-banner-img short"
                        src="/images/sec/SEC-top-image.png"
                    />
                </FlexRow>
            </div>
        </TitleBanner>
        <div className="inner sec-faq">
            <section id="projects">
                <h3><FormattedMessage id="sec.letterA" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org1"
                        values={{
                            org1Listing: (
                                <a
                                    href="https://www.ansep.net/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org1LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org2"
                        values={{
                            org2Listing: (
                                <a
                                    href="https://arhub.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org2LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterB" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org3"
                        values={{
                            org3Listing: (
                                <a
                                    href="https://bootuppd.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org3LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org4"
                        values={{
                            org4Listing: (
                                <a
                                    href="https://bridgestoscience.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org4LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterC" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org5"
                        values={{
                            org5Listing: (
                                <a
                                    href="https://www.rcu.msstate.edu/CyberEducation.aspx"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org5LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org6"
                        values={{
                            org6Listing: (
                                <a
                                    href="https://www.acaoparceiros.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org6LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org7"
                        values={{
                            org7Listing: (
                                <a
                                    href="https://www.codeclubau.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org7LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org8"
                        values={{
                            org8Listing: (
                                <a
                                    href="https://www.code-crew.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org8LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterD" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org9"
                        values={{
                            org9Listing: (
                                <a
                                    href="https://www.deafkidscode.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org9LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org10"
                        values={{
                            org10Listing: (
                                <a
                                    href="https://www.facebook.com/DeafTechnologyFoundation/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org10LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org11"
                        values={{
                            org11Listing: (
                                <a
                                    href="https://www.digitalharbor.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org11LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterF" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org12"
                        values={{
                            org12Listing: (
                                <a
                                    href="https://www.uj.ac.za/Pages/default.aspx"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org12LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterH" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org13"
                        values={{
                            org13Listing: (
                                <a
                                    href="https://www.husd.us/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org13LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org14"
                        values={{
                            org14Listing: (
                                <a
                                    href="https://www.humbleisd.net/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org14LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterI" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org15"
                        values={{
                            org15Listing: (
                                <a
                                    href="https://www.iamthecode.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org15LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org16"
                        values={{
                            org16Listing: (
                                <a
                                    href="https://www.ilce.edu.mx/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org16LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterK" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org17"
                        values={{
                            org17Listing: (
                                <a
                                    href="https://kidscodejeunesse.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org17LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterL" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org18"
                        values={{
                            org18Listing: (
                                <a
                                    href="https://www.lomieheardmagnet.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org18LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org19"
                        values={{
                            org19Listing: (
                                <a
                                    href="https://www.othelloschools.org/lutacaga"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org19LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterM" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org20"
                        values={{
                            org20Listing: (
                                <a
                                    href="http://www.makerereinnovationsociety.org/?i=1"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org20LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org21"
                        values={{
                            org21Listing: (
                                <a
                                    href="https://mouse.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org21LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterN" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org22"
                        values={{
                            org22Listing: (
                                <a
                                    href="https://www.nsbe.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org22LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org23"
                        values={{
                            org23Listing: (
                                <a
                                    href="https://nefstem.domains.unf.edu/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org23LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org24"
                        values={{
                            org24Listing: (
                                <a
                                    href="http://cs4all.nyc/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org24LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org25"
                        values={{
                            org25Listing: (
                                <a
                                    href="https://nysci.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org25LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterO" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org26"
                        values={{
                            org26Listing: (
                                <a
                                    href="https://www.odysseyedufoundation.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org26LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterP" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org27"
                        values={{
                            org27Listing: (
                                <a
                                    href="https://www.playpattern.com/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org27LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterQ" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org28"
                        values={{
                            org28Listing: (
                                <a
                                    href="https://www.questalliance.net/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org28LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterS" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org29"
                        values={{
                            org29Listing: (
                                <a
                                    href="https://www.schoolnet.org.za/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org29LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org30"
                        values={{
                            org30Listing: (
                                <a
                                    href="https://www.sistemathead.com/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org30LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org31"
                        values={{
                            org31Listing: (
                                <a
                                    href="https://www.sistersofcode.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org31LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org32"
                        values={{
                            org32Listing: (
                                <a
                                    href="https://www.steamlabsafrica.com/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org32LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org33"
                        values={{
                            org33Listing: (
                                <a
                                    href="https://stemimpactcenterkenya.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org33LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org34"
                        values={{
                            org34Listing: (
                                <a
                                    href="http://www.streetlightschools.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org34LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterT" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org35"
                        values={{
                            org35Listing: (
                                <a
                                    href="https://tannerschool.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org35LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org36"
                        values={{
                            org36Listing: (
                                <a
                                    href="https://www.teachathonetwork.com/coverpage"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org36LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterU" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org37"
                        values={{
                            org37Listing: (
                                <a
                                    href="https://udigital.udg.edu/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org37LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.org38"
                        values={{
                            org38Listing: (
                                <a
                                    href="https://www.digitalmikmaq.com/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org38LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterW" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org39"
                        values={{
                            org39Listing: (
                                <a
                                    href="https://www.tacc.utexas.edu/epic/weteachcs"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org39LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <h3><FormattedMessage id="sec.letterY" /></h3>
                <p>
                    <FormattedMessage
                        id="sec.org40"
                        values={{
                            org40Listing: (
                                <a
                                    href="http://www.youthfortechnology.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <FormattedMessage id="sec.org40LinkText" />
                                </a>
                            )
                        }}
                    />
                </p>

            </section>

        </div>
        <TitleBanner className="masthead">
            <div className="inner">
                <FlexRow className="masthead-info uneven">
                    <div className="long">
                        <h1><FormattedMessage id="sec.title" /></h1>
                        <p className="title-banner-p intro">
                            <FormattedMessage id="sec.partnerOrgsTitle"/> | <FormattedMessage id="sec.yearRange"/>
                        </p>
                    </div>
                    <img
                        alt=""
                        className="title-banner-img short"
                        src="/images/sec/SEC-bottom-image.png"
                    />
                </FlexRow>
            </div>
        </TitleBanner>
        <div className="inner sec-faq">
            <section id="expectations-for-sec">
                    <p><FormattedMessage id="sec.partnerOrgs1" /></p>
                    <p><FormattedMessage id="sec.partnerOrgs2" /></p>
                    <p><FormattedMessage id="sec.partnerOrgs3" /></p>
                    <p><FormattedMessage id="sec.partnerOrgs4" /></p>
                    <p><FormattedMessage id="sec.partnerOrgs5" /></p>
                    <p><FormattedMessage id="sec.partnerOrgs6" /></p>
            </section>
        </div>
        <section className="band">
            <div className="inner">
                <h4 className="applyBanner"><FormattedMessage id="sec.applyBanner" /></h4>
            </div>
        </section>
    </div>
);

render(<Page><EducationCollaborative /></Page>, document.getElementById('app'));
