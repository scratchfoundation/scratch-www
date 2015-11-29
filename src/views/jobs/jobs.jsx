var React = require('react');
var render = require('../../lib/render.jsx');

require('./jobs.scss');

var Jobs = React.createClass({
    type: 'Jobs',
    render: function () {
        return (
            <div className="inner">
                <div className="top">
                    <img src="/images/jobs.png" />
                    <p>Want to work on an innovative project that is transforming the ways young people create,
                    share, and learn?</p>
                </div>
                <div className="middle">
                    <div className="info">
                        <div className="leftcolumn">
                        <div className="thin-heading">
                            <p>Join the Scratch Team!</p>
                        </div>
                        <p>With Scratch, young people from all backgrounds are learning to program their own interactive
                        stories, games, and animations. Children and teens from around the world have created and shared
                        more than 5 million projects in the rapidly-growing Scratch online community.
                        </p>
                        <p>We’re seeking curious and motivated people to join our Scratch Team at the MIT Media Lab.
                        We&#39;re a diverse group of educators, designers, and developers, who work together in a
                        playful, creative environment full of LEGO bricks, craft materials, and maker tools. We
                        strongly value diversity, collaboration, and respect in the workplace.
                        </p>
                        </div>
                        <div className="rightcolumn">
                        <img src="/images/scratch_team.png" />
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="thin-heading">
                            <p>Current Job Openings</p>
                    </div>
                    <p><a href="/jobs/learning-developer">Learning Resource Developer </a>
                    <i>(MIT Media Lab, Cambridge, MA)</i></p>
                    <p><a href="/jobs/moderator">Community Moderator </a><i>(MIT Media Lab, Cambrige, MA or Remote)</i>
                    </p>
                </div>
            </div>
        );
    }
});

render(<Jobs />, document.getElementById('view'));
