var React = require('react');
var render = require('../../lib/render.jsx');
var Box = require('../../components/box/box.jsx');

require('./parents.scss');

var Parents = React.createClass({
    type: 'Parents',
    render: function () {
        return (
            <div className="inner">
                <h1> <img src="/images/help/cat1.png"> </img> For Parents</h1>
                <div className="intro">
                    <p> Scratch is a programming language and an online community where children can program and share
                     interactive media such as stories, games, and animation with people from all over the world.
                    As children create with Scratch, they learn to think creatively, work collaboratively, and reason
                    systematically. Scratch is designed and maintained by the Lifelong Kindergarten group at the
                    MIT Media Lab.</p>
                </div>
                <div className="video">
                    <iframe src="https://player.vimeo.com/video/65583694?title=0&byline=0&portrait=0" width="445" height="250" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
                <div className="information">
                    <div className="leftcolumn">
                        <h2>Who Uses Scratch?</h2>
                        <img src="/images/about/who-uses-scratch.jpg"></img>
                        <p>Scratch is designed especially for ages 8 to 16, but is used by people of all ages. Millions of people are creating Scratch projects in a wide variety of settings, including homes, schools, museums, libraries, and community centers.</p>
                        <h2>Around the World</h2>
                        <img src="/images/about/around-the-world.png"></img>
                        <p>Scratch is used in more than 150 different countries and available in more than 40 languages. To change languages, click the menu at the bottom of the page. Or, in the Project Editor, click the globe at the top of the page. To add or improve a translation, see the <a href="http://wiki.scratch.mit.edu/wiki/How_to_Translate_Scratch">translation</a> page.</p>
                        <h2>Quotes</h2>
                        <img src="images/about/quotes.gif"></img>
                        <p>The Scratch Team has received many emails from youth, parents, and educators expressing thanks for Scratch. Want to see what people are saying? You can read a collection of the <a href="/info/quotes">quotes</a> we&#39;ve received.</p>
                        <h2>Learn More About Scratch</h2>
                        <div className="moreinfolist">
                        <ul>
                            <li><a href="/help">Scratch Help Page</a></li>
                            <li><a href="/info/faq">Frequently Asked Questions</a></li>
                            <li><a href="/parents">Information for Parents</a></li>
                            <li><a href="/credits">Scratch Credits</a></li>
                        </ul>
                        </div>
                     </div>
                     <div className="rightcolumn">
                        <Box>
                        </Box>
                    </div>
                </div>
            </div>
        );
    }
});

render(<Parents />, document.getElementById('view'));
