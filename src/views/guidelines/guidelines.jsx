var React = require('react');

require('./guidelines.scss');
var Box = require('../../components/box/box.jsx');

var View = React.createClass({
    render: function () {
        return (
            <div className="inner">
            <Box title="Scratch Community Guidelines">
            <div className="box-contents">
                <p>We need everyone’s help to keep Scratch a friendly and creative community where people with
                    different backgrounds and interests feel welcome.</p>
                <ul>
                    <li>
                        <div className="boldwords">Be respectful.</div> When sharing projects or posting comments,
                            remember that people of many different ages and backgrounds will see what you’ve shared.
                    </li>
                    <li>
                        <div className="boldwords">Be constructive.</div> When commenting on others projects,
                            say something you like about it and offer suggestions.
                    </li>
                    <li>
                        <div className="boldwords">Share.</div> You are free to remix projects, ideas, images, or
                             anything else you find on Scratch – and anyone can use anything that you share. Be sure to
                             give credit when you remix.
                        </li>
                    <li>
                        <div className="boldwords">Keep personal info private.</div> For safety reasons, don&#39;t
                            use real names or post contact info like phone numbers or addresses.
                    </li>
                    <li>
                        <div className="boldwords">Be honest.</div> Don&#39;t try to impersonate other Scratchers,
                            spread rumors, or otherwise try to trick the community.
                    </li>
                    <li>
                        <div className="boldwords">Help keep the site friendly.</div> If you think a project or
                            comment is mean, insulting, too violent, or otherwise inappropriate, click “Report” to let
                            us know about it.
                    </li>
                </ul>
                <p>Scratch welcomes people of all ages, races, ethnicities, religions, sexual orientations, and gender
                    identities.</p>
                <div className="image">
                <img src="/images/gobo-friends.png"></img>
                </div>
                </div>
            </Box>
            </div>
        );
    }
});

React.render(<View />, document.getElementById('view'));
