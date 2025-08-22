const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const render = require('../../lib/render.jsx');

const externalLinks = require('../../lib/external-links.js');
const Button = require('../../components/forms/button.jsx');
const Page = require('../../components/page/www/page.jsx');
const Video = require('../../components/video/video.jsx');
const injectIntl = require('react-intl').injectIntl;

require('./about.scss');

const About = injectIntl(() => (
    <div className="inner about">
        <h1><FormattedMessage id="general.aboutScratch" /></h1>

        <div className="masthead">
            <div>
                <p><FormattedMessage
                    id="about.introOne"
                    values={{foundationLink: (
                        <a
                            href={externalLinks.scratchFoundation.homepage}
                            rel="noreferrer noopener"
                            target="_blank"
                        >
                            <FormattedMessage id="about.foundationText" />
                        </a>
                    )}}
                /></p>
                <p><FormattedMessage id="about.introTwo" /></p>
                <p><FormattedMessage id="about.introThree" /></p>

                <ul>
                    <li><a
                        href={externalLinks.scratchFoundation.forFamilies}
                    ><FormattedMessage id="about.introParents" /></a></li>
                    <li><a
                        href={externalLinks.scratchFoundation.forEducators}
                    ><FormattedMessage id="about.introEducators" /></a></li>
                    <li><a
                        href={externalLinks.scratchFoundation.impact}
                    ><FormattedMessage id="about.introLearnMore" /></a></li>
                </ul>
            </div>

            <div className="video-container">
                <Video
                    className="about-scratch-video"
                    videoId="sucupcznsp"
                />
            </div>
        </div>

        <div className="body">
            <h2><FormattedMessage id="about.support" /></h2>
            <p><FormattedMessage
                id="about.supportDescription1"
                values={{
                    supportersLink: (
                        <a
                            href={externalLinks.scratchFoundation.supporters}
                            rel="noreferrer noopener"
                            target="_blank"
                        >
                            <FormattedMessage id="about.supportersLinkText" />
                        </a>
                    )
                }}
            /></p>
            <p style={{fontStyle: 'italic', fontWeight: 'bold'}}><FormattedMessage id="about.supportDescription2" /></p>
            <p><FormattedMessage id="about.supportDescription3" /></p>
            <a
                href={externalLinks.scratchFoundation.donate}
                rel="noreferrer noopener"
                target="_blank"
            >
                <Button className="about-button">
                    <FormattedMessage id="about.donateButton" />
                </Button>
            </a>
        </div>
    </div>
));

render(<Page><About /></Page>, document.getElementById('app'));
