var classNames = require('classnames');
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');
var render = require('../../lib/render.jsx');

var Button = require('../../components/forms/button.jsx');
var Box = require('../../components/box/box.jsx');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');

require('./hoc.scss');

var Hoc = React.createClass({
    type: 'Hoc',

    getInitialState: function () {
        return {
            bgClass: ''
        };
    },
    onCardEnter: function (bgClass) {
        this.setState({
            bgClass: bgClass
        });
    },
    render: function () {
        var classes = classNames(
            'top-banner',
            this.state.bgClass
        );
        return (
            <div>
                <div className={classes}>
                    <h1>
                        <FormattedMessage
                            id='hoc.title'
                            defaultMessage={'Get Creative with Coding'} />
                    </h1>
                    <p>
                        <FormattedMessage
                            id='hoc.subTitle'
                            defaultMessage={
                                'With Scratch, you can program your own stories, games, and animations — ' +
                                'and share them online.'
                            } />
                    </p>

                    <section>
                        <div className="card-deck">
                            <div className="card">
                                <a href="/projects/editor/?tip_bar=name">
                                    <div className="card-info" onMouseEnter={this.onCardEnter.bind(this, 'name-bg')}>
                                        <img src="/images/hoc2015/name-tutorial.jpg" />
                                        <Button>
                                            <FormattedMessage
                                                id='general.tipsAnimateYourNameTitle'
                                                defaultMessage={'Animate Your Name'} />
                                        </Button>
                                    </div>
                                </a>
                            </div>

                            <div className="card" onMouseEnter={this.onCardEnter.bind(this, 'wbb-bg')}>
                                <a href="/hide/">
                                    <div className="card-info">
                                        <img src="/images/hoc2015/hide-seek-tutorial.jpg" />
                                        <Button>
                                            <FormattedMessage
                                                id='general.tipsHideAndSeekTitle'
                                                defaultMessage={'Hide-and-Seek Game'} />
                                        </Button>
                                    </div>
                                </a>
                            </div>

                            <div className="card" onMouseEnter={this.onCardEnter.bind(this, 'dance-bg')}>
                                <a href="/projects/editor/?tip_bar=dance">
                                    <div className="card-info">
                                        <img src="/images/hoc2015/dance-tutorial.jpg" />
                                        <Button>
                                            <FormattedMessage
                                                id='general.tipsDanceTitle'
                                                defaultMessage={'Dance, Dance, Dance'} />
                                        </Button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </section>
                    
                    <SubNavigation>
                        <li className="description">
                            <FormattedMessage
                                id='hoc.findOutMore'
                                defaultMessage={'Find out more'} />:
                        </li>
                        <a href="/about/">
                            <li>
                                <FormattedMessage
                                    id='footer.about'
                                    defaultMessage={'About Scratch'} />
                            </li>
                        </a>
                        <a href="/parents/">
                            <li>
                                <FormattedMessage
                                    id='general.forParents'
                                    defaultMessage={'For Parents'} />
                            </li>
                        </a>
                        <a href="/educators/">
                            <li>
                                <FormattedMessage
                                    id='general.forEducators'
                                    defaultMessage={'For Educators'} />
                            </li>
                        </a>
                    </SubNavigation>
                </div>

                

                <div className="inner">
                    <Box title={''}>
                        <section id="teacher" className="one-up">
                            <div className="column">
                                <h3>
                                    <FormattedMessage
                                        id='hoc.activityCardsHeader'
                                        defaultMessage={'Activity Cards and Guides'} />
                                </h3>
                                <p>
                                    <FormattedHTMLMessage
                                        id='hoc.activityCardsInfo1'
                                        defaultMessage={
                                            'Want tips and ideas for these Hour of Code&trade; activities? ' +
                                            'Use the activity cards to get ideas for creating with ' +
                                            'Scratch. Facilitator guides can help you plan ' +
                                            'a group activity.'
                                        } />
                                </p>
                            </div>

                            <div className="resource">
                                <img src="/svgs/tips-card.svg" />
                                <div className="resource-info">
                                    <h5>
                                        <FormattedMessage
                                            id='general.tipsAnimateYourNameTitle'
                                            defaultMessage={'Animate Your Name'} />
                                    </h5>
                                    <a href="/scratchr2/static/pdfs/help/AnimateYourNameCards.pdf">
                                        <FormattedMessage
                                            id='hoc.activityCards'
                                            defaultMessage={'Activity Cards'} />
                                    </a>
                                    <a href="/scratchr2/static/pdfs/help/AnimateYourNameGuide.pdf">
                                        <FormattedMessage
                                            id='hoc.facilitatorGuide'
                                            defaultMessage={'Facilitator Guide'} />
                                    </a>
                                </div>
                            </div>

                            <div className="resource">
                                <img src="/svgs/tips-card.svg" />
                                <div className="resource-info">
                                    <h5>
                                        <FormattedMessage
                                            id='general.tipsHideAndSeekTitle'
                                            defaultMessage={'Hide-and-Seek Game'} />
                                    </h5>
                                    <a href="/scratchr2/static/pdfs/help/Hide-and-Seek-Cards.pdf">
                                        <FormattedMessage
                                            id='hoc.activityCards'
                                            defaultMessage={'Activity Cards'} />
                                    </a>
                                    <a href="/scratchr2/static/pdfs/help/Hide-and-Seek-Guide.pdf">
                                        <FormattedMessage
                                            id='hoc.facilitatorGuide'
                                            defaultMessage={'Facilitator Guide'} />
                                    </a>
                                </div>
                            </div>
                            
                            <div className="resource">
                                <img src="/svgs/tips-card.svg" />
                                <div className="resource-info">
                                    <h5>
                                        <FormattedMessage
                                            id='general.tipsDanceTitle'
                                            defaultMessage={'Dance, Dance, Dance'} />
                                    </h5>
                                    <a href="/scratchr2/static/pdfs/help/DanceCards.pdf">
                                        <FormattedMessage
                                            id='hoc.activityCards'
                                            defaultMessage={'Activity Cards'} />
                                    </a>
                                    <a href="/scratchr2/static/pdfs/help/DanceGuide.pdf">
                                        <FormattedMessage
                                            id='hoc.facilitatorGuide'
                                            defaultMessage={'Facilitator Guide'} />
                                    </a>
                                </div>
                            </div>
                        </section>

                        <section className="two-up">
                            <div className="column">
                                <h3>
                                    <FormattedMessage
                                        id='hoc.helpScratch'
                                        defaultMessage={'Help with Scratch'} />
                                </h3>
                                <p>
                                    <FormattedHTMLMessage
                                        id='hoc.helpScratchDescription'
                                        defaultMessage={
                                            'You can find tutorials and helpful hints in the ' +
                                            '<a href="/projects/editor/?tip_bar=home">Tips Window</a>. ' +
                                            'For more resources, see <a href="/help/">Scratch Help</a>'
                                        } />
                                </p>
                            </div>
                            <div className="column">
                                <img src="/images/hoc2015/tips-test-animation.gif" />
                            </div>
                        </section>

                        <section className="one-up">
                            <div className="column">
                                <h3>
                                    <FormattedMessage
                                        id='hoc.moreActivities'
                                        defaultMessage={'Want More Activities?'} />
                                </h3>
                                <p>
                                    <FormattedHTMLMessage
                                        id='hoc.moreDescription'
                                        defaultMessage={
                                            'Check out these other tutorials. Or remix one of our ' +
                                            '<a href="/starter_projects/">Starter Projects</a>'
                                        } />
                                 </p>
                            </div>

                            <div className="card-deck">
                                <div className="card">
                                    <a href="/projects/editor/?tip_bar=getStarted">
                                        <div className="card-info">
                                            <img src="/images/hoc2015/getting-started-tutorial.jpg" />
                                            <Button>
                                                <FormattedMessage
                                                    id='general.tipsGetStarted'
                                                    defaultMessage={'Getting Started'} />
                                            </Button>
                                        </div>
                                    </a>
                                </div>

                                <div className="card">
                                    <a href="/bearstack/">
                                        <div className="card-info">
                                            <img src="/images/hoc2015/bearstack-tutorial.jpg" />
                                            <Button>
                                                <FormattedMessage
                                                    id='general.tipsBearstack'
                                                    defaultMessage={'Bearstack Story'} />
                                            </Button>
                                        </div>
                                    </a>
                                </div>

                                <div className="card">
                                    <a href="/hoops">
                                        <div className="card-info">
                                            <img src="/images/hoc2015/bball-tutorial.jpg" />
                                            <Button>
                                                <FormattedMessage
                                                    id='general.tipsBBallHoops'
                                                    defaultMessage={'B-Ball Hoops'} />
                                            </Button>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </section>

                        <section className="one-up">
                            <div className="column">
                                <h3>
                                    <FormattedMessage
                                        id='hoc.addToStudios'
                                        defaultMessage={'Add Your Projects to Studios'} />
                                </h3>
                                <p>
                                    <FormattedHTMLMessage
                                        id='hoc.addToStudiosDescription'
                                        defaultMessage={
                                            'These studios include projects created by young people ' +
                                            'around the world. Take a look at the studios to get inspired - ' +
                                            'or submit your own projects to the studios!'
                                        } />
                                 </p>
                            </div>

                            <div className="studio">
                                <img src="/svgs/studio.svg" />
                                <div className="studio-info">
                                    <a href="/studios/432299/">
                                        <h5>
                                            <FormattedMessage
                                                id='general.tipsAnimateYourNameTitle'
                                                defaultMessage={'Animate Your Name'} />
                                        </h5>
                                    </a>
                                </div>
                            </div>

                            <div className="studio">
                                <img src="/svgs/studio.svg" />
                                <div className="studio-info">
                                    <a href="/studios/1672166/">
                                        <h5>
                                            <FormattedMessage
                                                id='hoc.studioWeBareBears'
                                                defaultMessage={'We Bare Bears Studio'} />
                                        </h5>
                                    </a>
                                </div>
                            </div>

                            <div className="studio">
                                <img src="/svgs/studio.svg" />
                                <div className="studio-info">
                                    <a href="/studios/1065372/">
                                        <h5>
                                            <FormattedMessage
                                                id='general.tipsDanceTitle'
                                                defaultMessage={'Dance, Dance, Dance'} />
                                        </h5>
                                    </a>
                                </div>
                            </div>

                            <div className="studio">
                                <img src="/svgs/studio.svg" />
                                <div className="studio-info">
                                    <a href="/studios/1672164/">
                                        <h5>
                                            <FormattedMessage
                                                id='hoc.studioAlice'
                                                defaultMessage={'Alice in Wonderland Studio'} />
                                        </h5>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </Box>

                    <section className="one-up">
                        <h3>
                            <FormattedMessage
                                id='general.collaborators'
                                defaultMessage={'Collaborators'} />
                        </h3>
                        <div className="logos">
                            <a href="http://scratched.gse.harvard.edu/">
                                <img src="/images/hoc2015/scratchEd-logo.png" />
                            </a>
                            <a href="https://code.org/">
                                <img src="/images/hoc2015/code-org-logo.png" />
                            </a>
                            <a href="http://www.cartoonnetwork.com/">
                                <img src="/images/hoc2015/cn-logo.png" />
                            </a>
                            <a href="http://www.madewithcode.com/">
                                <img src="/images/hoc2015/made-with-code-logo.png" />
                            </a>
                            <a href="http://www.paalive.org/">
                                <img src="/images/hoc2015/paa-logo.png" />
                            </a>
                            <a href="http://www.catrobat.org/">
                                <img src="/images/hoc2015/pocketcode-logo.png" />
                            </a>
                        </div>

                        <div className="trademark">
                            <p className="legal">
                                <FormattedHTMLMessage
                                    id='hoc.officialNotice'
                                    defaultMessage={
                                        'The "Hour of Code&trade;" is a nationwide initiative by ' +
                                        '<a href="http://csedweek.org">Computer Science Education Week</a> ' +
                                        'and <a href="http://code.org">Code.org</a> to introduce millions of ' +
                                        'students to one hour of computer science and computer programming.'
                                    } />
                            </p>
                        </div>
                    </section>
                </div>

                <img src = "https://code.org/api/hour/begin_scratch.png" />
            </div>
        );
    }
});

render(<Hoc />, document.getElementById('view'));
