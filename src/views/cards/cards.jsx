var React = require('react');
var injectIntl = require('react-intl').injectIntl;
var FormattedMessage = require('react-intl').FormattedMessage;
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var render = require('../../lib/render.jsx');

var Box = require('../../components/box/box.jsx');

require('./cards.scss');

var Cards = injectIntl(React.createClass({
    type: 'Cards',
    render: function () {
        var locale = window._locale || 'en';
        var formatMessage = this.props.intl.formatMessage;
        var englishLinks = {
            'cards.allCardsLink': 'https://scratch.mit.edu/scratchr2/static/pdfs/help/Scratch2Cards.pdf'
        };
        return (
            <div className="inner">
                <div className="intro">
                    <div className="intro-content">
                        <h1><FormattedMessage id='cards.introHeader' /></h1>
                        <p><FormattedMessage id='cards.introContent' /></p>
                        <p>
                            <a href={formatMessage({id: 'cards.allCardsLink'})}>
                                <FormattedMessage id='cards.introAllCards' />
                            </a>
                        </p>
                        {(
                            locale.indexOf('en') === -1 &&
                            formatMessage({id: 'cards.allCardsLink'}) === englishLinks['cards.allCardsLink']
                        ) ? [
                            <p>
                                <FormattedHTMLMessage id='cards.introWikiSupport' />
                            </p>
                        ] : []}
                        {(
                            locale.indexOf('en') === -1 &&
                            formatMessage({id: 'cards.allCardsLink'}) !== englishLinks['cards.allCardsLink']
                        ) ? [
                            <p>
                                <a href={englishLinks['cards.allCardsLink']}>
                                    <FormattedMessage id='cards.introAllCards' />&nbsp;
                                    (<FormattedMessage id='cards.introAllCardsEnglish' />)
                                </a>
                            </p>
                        ] : []}
                    </div>
                    <img src='//scratch.mit.edu/scratchr2/static/images/help/card-use-overview.png' />
                </div>
                <div className='cards-container'>
                    <Box title={''}>
                        <div>
                            <h4><FormattedMessage id='cards.dance' /></h4>
                            <a href={formatMessage({id: 'cards.danceLink'})}>
                                <img src={formatMessage({id: 'cards.danceThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.danceLink'})}>
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.name' /></h4>
                            <a href={formatMessage({id: 'cards.nameLink'})}>
                                <img src={formatMessage({id: 'cards.nameThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.nameLink'})}>
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.hide' /></h4>
                            <a href={formatMessage({id: 'cards.hideLink'})}>
                                <img src={formatMessage({id: 'cards.hideThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.hideLink'})}>
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.changeColor' /></h4>
                            <a href={formatMessage({id: 'cards.changeColorLink'})}>
                                <img src={formatMessage({id: 'cards.changeColorThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.changeColorLink'})}>
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.moveToBeat' /></h4>
                            <a href={formatMessage({id: 'cards.moveToBeatLink'})}>
                                <img src={formatMessage({id: 'cards.moveToBeatThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.moveToBeatLink'})} class="inline-icon-left">
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.keyMoves' /></h4>
                            <a href={formatMessage({id: 'cards.keyMovesLink'})}>
                                <img src={formatMessage({id: 'cards.keyMovesThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.keyMovesLink'})} class="inline-icon-left">
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.saySomething' /></h4>
                            <a href={formatMessage({id: 'cards.saySomethingLink'})}>
                                <img src={formatMessage({id: 'cards.saySomethingThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.saySomethingLink'})} class="inline-icon-left">
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.glide' /></h4>
                            <a href={formatMessage({id: 'cards.glideLink'})}>
                                <img src={formatMessage({id: 'cards.glideThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.glideLink'})} class="inline-icon-left">
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.followMouse' /></h4>
                            <a href={formatMessage({id: 'cards.followMouseLink'})}>
                                <img src={formatMessage({id: 'cards.followMouseThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.followMouseLink'})} class="inline-icon-left">
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.danceTwist' /></h4>
                            <a href={formatMessage({id: 'cards.danceTwistLink'})}>
                                <img src={formatMessage({id: 'cards.danceTwistThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.danceTwistLink'})} class="inline-icon-left">
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.whirl' /></h4>
                            <a href={formatMessage({id: 'cards.whirlLink'})}>
                                <img src={formatMessage({id: 'cards.whirlThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.whirlLink'})} class="inline-icon-left">
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.animateIt' /></h4>
                            <a href={formatMessage({id: 'cards.animateItLink'})}>
                                <img src={formatMessage({id: 'cards.animateItThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.animateItLink'})} class="inline-icon-left">
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.movingAnimation' /></h4>
                            <a href={formatMessage({id: 'cards.movingAnimationLink'})}>
                                <img src={formatMessage({id: 'cards.movingAnimationThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.movingAnimationLink'})}>
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.surpriseButton' /></h4>
                            <a href={formatMessage({id: 'cards.surpriseButtonLink'})}>
                                <img src={formatMessage({id: 'cards.surpriseButtonThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.surpriseButtonLink'})}>
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                        <div>
                            <h4><FormattedMessage id='cards.keepScore' /></h4>
                            <a href={formatMessage({id: 'cards.keepScoreLink'})}>
                                <img src={formatMessage({id: 'cards.keepScoreThumb'})} />
                            </a>
                            <a href={formatMessage({id: 'cards.keepScoreLink'})} class="inline-icon-left">
                                <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className='pdf-icon' />
                                <FormattedMessage id='cards.viewCard' />
                            </a>
                        </div>
                    </Box>
                </div>
            </div>
        );
    }
}));

render(<Cards />, document.getElementById('view'));
