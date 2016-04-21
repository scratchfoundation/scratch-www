var React = require('react');
var injectIntl = require('react-intl').injectIntl;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var Box = require('../../components/presentation/box/box.jsx');
var FlexRow = require('../../components/presentation/flex-row/flex-row.jsx');
var Page = require('../../components/container/page/www/page.jsx');

require('./cards.scss');

var Cards = injectIntl(React.createClass({
    type: 'Cards',
    render: function () {
        var locale = window._locale || 'en';
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
            <div className="inner">
                <div className="intro cards">
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
                                        formattedLinks['cards.starterLink'] === englishLinks['cards.starterLink'] &&
                                        locale !== 'en'
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
                                        formattedLinks['cards.nameLink'] === englishLinks['cards.nameLink'] &&
                                        locale !== 'en'
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
                                        formattedLinks['cards.pongLink'] === englishLinks['cards.pongLink'] &&
                                        locale !== 'en'
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
                                        formattedLinks['cards.storyLink'] === englishLinks['cards.storyLink'] &&
                                        locale !== 'en'
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
                                        formattedLinks['cards.danceLink'] === englishLinks['cards.danceLink'] &&
                                        locale !== 'en'
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
                                        formattedLinks['cards.hideLink'] === englishLinks['cards.hideLink'] &&
                                        locale !== 'en'
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
