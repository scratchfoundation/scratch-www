var React = require('react');
var injectIntl = require('react-intl').injectIntl;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var Box = require('../../components/box/box.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');
var Page = require('../../components/page/www/page.jsx');

require('./cards.scss');

var Cards = injectIntl(React.createClass({
    type: 'Cards',
    pdfLocaleMismatch: function (locale, pdf, englishPdf) {
        if (pdf === englishPdf && locale.indexOf('en') !== 0) {
            return true;
        }
        return false;
    },
    render: function () {
        var locale = this.props.intl.locale || 'en';
        var formatMessage = this.props.intl.formatMessage;
        var englishLinks = {
            'cards.starterLink': '//scratch.mit.edu/scratchr2/static/pdfs/help/Scratch2Cards.pdf',
            'cards.nameLink': '//scratch.mit.edu/scratchr2/static/pdfs/help/AnimateYourNameCards.pdf',
            'cards.pongLink': '//scratch.mit.edu/scratchr2/static/pdfs/help/PongCards.pdf',
            'cards.storyLink': '//scratch.mit.edu/scratchr2/static/pdfs/help/StoryCards.pdf',
            'cards.danceLink': '//scratch.mit.edu/scratchr2/static/pdfs/help/DanceCards.pdf',
            'cards.hideLink': '//scratch.mit.edu/scratchr2/static/pdfs/help/Hide-and-Seek-Cards.pdf'
        };
        var formattedLinks = {
            'cards.starterLink': formatMessage({id: 'cards.starterLink'}),
            'cards.nameLink': formatMessage({id: 'cards.nameLink'}),
            'cards.pongLink': formatMessage({id: 'cards.pongLink'}),
            'cards.storyLink': formatMessage({id: 'cards.storyLink'}),
            'cards.danceLink': formatMessage({id: 'cards.danceLink'}),
            'cards.hideLink': formatMessage({id: 'cards.hideLink'})
        };
        return (
            <div className="inner cards">
                <div className="intro cards-intro">
                    <div className="intro-content">
                        <h1><FormattedMessage id='cards.introHeader' /></h1>
                        <p><FormattedMessage id='cards.introContent' /></p>
                    </div>
                    <img src='/images/cards/card-use-overview.png' alt="Card Use Explanation" />
                </div>
                <div className='cards-container'>
                    <Box title={''}>
                        <FlexRow>
                            <div>
                                <h4><FormattedMessage id='cards.starter' /></h4>
                                <a href={formattedLinks['cards.starterLink']}>
                                    <img src="/images/cards/cards-starter.png" alt="" />
                                </a>
                                <a href={formattedLinks['cards.starterLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.starterLink'],
                                            englishLinks['cards.starterLink']
                                        )
                                    ) ? [
                                        <span> <FormattedMessage id='cards.english' /></span>
                                    ] : []}
                                </a>
                            </div>
                            <div>
                                <h4><FormattedMessage id='cards.name' /></h4>
                                <a href={formattedLinks['cards.nameLink']}>
                                    <img src="/images/cards/cards-name.png" alt="" />
                                </a>
                                <a href={formattedLinks['cards.nameLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.nameLink'],
                                            englishLinks['cards.nameLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div>
                                <h4><FormattedMessage id='cards.pong' /></h4>
                                <a href={formattedLinks['cards.pongLink']}>
                                    <img src="/images/cards/cards-pong.png" alt="" />
                                </a>
                                <a href={formattedLinks['cards.pongLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.pongLink'],
                                            englishLinks['cards.pongLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                        </FlexRow>
                        <FlexRow>
                            <div>
                                <h4><FormattedMessage id='cards.story' /></h4>
                                <a href={formattedLinks['cards.storyLink']}>
                                    <img src="/images/cards/cards-story.png" alt="" />
                                </a>
                                <a href={formattedLinks['cards.storyLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.storyLink'],
                                            englishLinks['cards.storyLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div>
                                <h4><FormattedMessage id='cards.dance' /></h4>
                                <a href={formattedLinks['cards.danceLink']}>
                                    <img src="/images/cards/cards-dance.png" alt="" />
                                </a>
                                <a href={formattedLinks['cards.danceLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.danceLink'],
                                            englishLinks['cards.danceLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div>
                                <h4><FormattedMessage id='cards.hide' /></h4>
                                <a href={formattedLinks['cards.hideLink']}>
                                    <img src="/images/cards/cards-hide.png" alt="" />
                                </a>
                                <a href={formattedLinks['cards.hideLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.hideLink'],
                                            englishLinks['cards.hideLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                        </FlexRow>
                    </Box>
                </div>
            </div>
        );
    }
}));

render(<Page><Cards /></Page>, document.getElementById('app'));
