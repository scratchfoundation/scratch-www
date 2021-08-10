const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
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
                            <FormattedMessage id="sec.intro" /> | <FormattedMessage id="sec.yearRange" />
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
                <h3>A</h3>
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
                                    Alaska Native Science & Engineering Program
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
                                    Arkansas Regional Innovation Hub
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>B</h3>
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
                                    BootUp PD
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
                                    Bridges to Science
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>C</h3>
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
                                    Center for Cyber Education at Mississippi State University
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
                                    Creative Community Learning Brasil Space Action Partners
                                     / Projeto Social Ação Parceiros
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
                                    Code Club Australia
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
                                    CodeCrew
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>D</h3>
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
                                    Deaf Kids Code
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
                                    Deaf Technology Foundation
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
                                    Digital Harbor Foundation
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>F</h3>
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
                                    Faculty of Education Team at University of Johannesburg
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>H</h3>
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
                                    Hayward Unified School District
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
                                    Humble Independent School District (ISD)
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>I</h3>
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
                                    iamtheCODE
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
                                    ILCE Instituto Latino Americano de la Comunicación Educativa
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>K</h3>
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
                                    Kids Code Jeunesse
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>L</h3>
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
                                    Lomie G. Heard Elementary School
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
                                    Lutacaga Elementary
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>M</h3>
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
                                    Makerere Innovation Society
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
                                    Mouse
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>N</h3>
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
                                    National Society of Black Engineers
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
                                    href="https://www.unf.edu/coehs/NEFSTEM/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    NEFSTEM Center, University of North Florida
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
                                    New York City Department of Education - CSforAllNYC
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
                                    New York Hall of Science
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>O</h3>
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
                                    Odyssey Educational Foundation
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>P</h3>
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
                                    Play Pattern
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>Q</h3>
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
                                    Quest Alliance
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>S</h3>
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
                                    Schoolnet South Africa
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
                                    Sistema THEAD
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
                                    Sisters of Code
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
                                    STEAMLabs Africa
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
                                    STEM Impact Center Kenya
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
                                    Streetlight Schools
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>T</h3>
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
                                    Tanner Elementary
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
                                    Teachathon Foundation
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>U</h3>
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
                                    UdiGitalEdu
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
                                    Ulnooweg - Digital Mi&#39;kmaq
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>W</h3>
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
                                    WeTeach_CS, Center for Cyber Education at University of Texas Austin
                                </a>
                            )
                        }}
                    />
                </p>
                <h3>Y</h3>
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
                                    Youth for Technology Foundation
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
                            <FormattedMessage id="sec.partnerOrgsTitle" /> | <FormattedMessage id="sec.yearRange" />
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
                <p>
                    <FormattedMessage
                        id="sec.partnerOrg1"
                        values={{
                            partnerOrg1Listing: (
                                <a
                                    href="https://www.raspberrypi.org/about/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Raspberry Pi Foundation
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.partnerOrg2"
                        values={{
                            partnerOrg2Listing: (
                                <a
                                    href="https://dschool.stanford.edu/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Stanford d. School
                                </a>
                            ),
                            partnerOrg2FormerName: (
                                'School of Intercultural Computing'
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.partnerOrg3"
                        values={{
                            partnerOrg3Listing: (
                                <a
                                    href="http://cps.edu/cs"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Chicago Public Schools
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.partnerOrg4"
                        values={{
                            partnerOrg4Listing: (
                                <a
                                    href="https://stemnola.com/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    STEM Nola
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.partnerOrg5"
                        values={{
                            partnerOrg5Listing: (
                                <a
                                    href="https://www.aprendizagemcriativa.org/pt-br"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Brazilian Creative Learning Network (BCLN)
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.partnerOrg6"
                        values={{
                            partnerOrg6Listing: (
                                <a
                                    href="https://www.exploratorium.edu/tinkering/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    The Tinkering Studio
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id="sec.partnerOrg7"
                        values={{
                            partnerOrg7Listing: (
                                <a
                                    href="https://microbit.org/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Micro:bit Educational Foundation
                                </a>
                            )
                        }}
                    />
                </p>
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
