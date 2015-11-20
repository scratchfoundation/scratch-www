var React = require('react');
var render = require('../../lib/render.jsx');
var Box = require('../../components/box/box.jsx');

require('./parents.scss');

var Parents = React.createClass({
    type: 'Parents',
    render: function () {
        return (
            <div className="inner">
                <h1> For Parents</h1>
                <div className="intro">
                    <p> Scratch is a programming language and an online community where children can program and share
                     interactive media such as stories, games, and animation with people from all over the world.
                    As children create with Scratch, they learn to think creatively, work collaboratively, and reason
                    systematically. Scratch is designed and maintained by the Lifelong Kindergarten group at the
                    MIT Media Lab.</p>
                </div>
                <div className="video">
                    <iframe src="https://embed-ssl.ted.com/talks/mitch_resnick_let_s_teach_kids_to_code.html"
                    width="445"
                    height="250" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
                <div className="information">
                    <div className="leftcolumn">
                        <h2>What is the age range for Scratch?</h2>
                        <p>While Scratch is primarily designed for 8 to 16 year olds, it is also used by people of all
                         ages, including younger children with their parents.
                        </p>
                        <h2>What resources are available for learning Scratch?</h2>
                        <p>If you’re just getting started, there’s a
                        <a href="/projects/editor/?tip_bar=getStarted"> step-by-step</a> guide available inside Scratch,
                         or you can download the
                         <a href="https://cdn.scratch.mit.edu/scratchr2/static/__
                         59d83c26e1922339ead6acebfb10fd72__//pdfs/help/
                         Getting-Started-Guide-Scratch2.pdf"> Getting Started guide (PDF)</a>. The
                         <a href="/info/cards/"> Scratch Cards</a> provide a fun way
                         to learn more. For an overview of Scratch resources, see <a href="/help">Scratch Help</a>.
                        </p>
                        <h2>What is the Scratch online community?</h2>
                        <p>When participating in the Scratch online community, members can explore and experiment in
                         an open learning community with other Scratch members from all backgrounds, ages, and
                         interests. Members can share their work, get feedback, and learn from each other.
                        </p>
                        <h2>What are the guidelines for the Scratch online community?</h2>
                        <p>The MIT Scratch Team works with the community to maintain a friendly and
                         respectful environment for people of all ages, races, ethnicities, religions,
                         sexual orientations, and gender identities. You can help your child learn how to
                         participate by reviewing the
                         <a href="/guidelines"> community guidelines</a> together. Members are asked to comment
                         constructively and to help keep the website friendly by reporting any content that does not
                         follow the community guidelines. The Scratch Team works each day to manage activity on the
                         site and respond to reports, with the help of tools such as the
                         <a href="https://www.inversoft.com/products/profanity-filter"> CleanSpeak</a> profanity filter.
                        </p>
                        <h2>What is your privacy policy?</h2>
                        <p>To protect children&#39;s online privacy, we limit what we collect during the
                         signup process, and what we make public on the website. We don&#39;t sell or rent account
                         information to anyone. You can find out more about our privacy policy on our
                         <a href="/info/faq/#privacy"> frequently asked
                         questions page</a>.
                        </p>
                        <h2>Is there a way to use Scratch without participating online?</h2>
                        <p>Yes, the Scratch offline editor lets you create projects without joining or accessing the
                         online community. Visit the
                         <a href="/scratch2download"> Scratch 2.0 offline editor</a> download page for instructions on
                         how to install it on your computer. (If your computer does not support the latest version, try
                         the <a href="/scratch_1.4">Scratch 1.4 offline editor</a>.)
                        </p>
                        <h2>What are parents saying about Scratch?</h2>
                        <p>We often receive emails from parents thanking us for Scratch. Here are some examples:
                        </p>
                        <p><b>&quot;I just want to thank you all for making Scratch, and for providing it for free. </b>
                         My kids are doing amazing things that they see as fun yet I know is educational, valuable, and
                         worthwhile. Thank you so much!!!&quot;,
                        </p>
                        <p><b>&quot;My very shy but technical minded daughter has found this to be a fantastic, safe
                         outlet for her creativity.</b> She spends her free time creating ever more difficult animations
                         and sharing them with the scratch community. The forums provide her with a group of
                         like-minded individuals with which she can hold on a conversation... She now feels that
                         computers, graphic design and animation are something she would like to pursue in the future.
                         Your program has opened a whole new world to her in so many ways, and I thank you
                         wholeheartedly.&quot;,
                        </p>
                        <p><b>&quot;My son is learning more than I can imagine from your tool. </b>
                         He is not a natural logical
                         thinker but loves LEGO. Your LEGO-like building block structure has moved him forward by
                         light-years in his logical thinking skills...He can snap things together and begin to see the
                         logic reinforced by immediate feedback. Of course we work on some things together--instant
                         father and son time. This is just incredible. Just a big thanks to you and MIT.&quot;,
                        </p>
                        </div>
                     </div>
                    <div className="rightcolumn">
                        <Box title="Learning">
                            <div className="box-contents">
                                <div className="what-is-scratch">
                                    <p>For a one-page overview of what young people learn with Scratch, see
                                    <a href="https://llk.media.mit.edu/scratch/Learning-with-Scratch.pdf"> Learning
                                     with Scratch</a>.
                                     </p>
                                </div>
                            </div>
                        </Box>
                        <Box title="Community">
                            <div className="box-contents">
                                <div className="what-is-scratch">
                                    <p>We ask all participants on the site to follow the
                                    <a href="/guidelines"> Community Guidelines.</a></p>
                                    <p>We do not make private account information available to anyone.
                                     For more information, please see the
                                    <a href="/info/faq/#privacy">  Privacy Policy</a>.</p>
                                </div>
                            </div>
                        </Box>
                        <Box title="Questions?">
                            <div className="box-contents">
                                <p> To find out more about Scratch, please see
                                <a href="/help/faq"> Frequently Asked Questions</a>.</p>
                                <p> You can also ask questions in the <a href="/discuss">discussion forums</a>.</p>
                                <p> If you need to contact our staff team directly, click
                                <a href="/contact-us"> Contact Us</a> at the bottom of any page.</p>
                            </div>
                        </Box>
                    </div>
                </div>
        );
    }
});

render(<Parents />, document.getElementById('view'));
