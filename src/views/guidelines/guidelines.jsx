var React = require('react');
var render = require('../../lib/render.jsx');
var Page = require('../../components/page/page.jsx');

require('./guidelines.scss');

var Guidelines = React.createClass({
    type: 'Guidelines',
    render: function () {
        return (
            <div className="body">
                <div className="top">
                    <h1>Scratch Community Guidelines</h1>
                </div>
                <div className="bottom">
                    <p>We need everyone's help to keep Scratch a friendly and creative 
                    community where people with different backgrounds and interests feel welcome.</p>
                    <ul>
                        <li><b>Be respectful.</b><p> When sharing projects or posting 
                        comments, remember that people of many different ages and 
                        backgrounds will see what you've shared.</p></li>
                        <li><b>Be constructive.</b><p> When commenting on others' projects, 
                        say something you like about it and offer suggestions.</p></li>
                        <li><b>Share.</b><p> You are free to remix projects, ideas, images, 
                        or anything else you find on Scratch - and anyone can use anything 
                        that you share. Be sure to give credit when you remix.</p></li>
                        <li><b>Keep personal info private.</b><p> For safety reasons, 
                        don't use real names or post contact info like phone numbers or 
                        addresses.</p></li>
                        <li><b>Be honest.</b><p> Don't try to impersonate other Scratchers, 
                        spread rumors, or otherwise try to trick the community.</p></li>
                        <li><b>Help keep the site friendly.</b><p> If you think a project or 
                        comment is mean, insulting, too violent, or otherwise inappropriate, 
                        click "Report" to let us know about it.</p></li>
                    </ul>
                    <p>Scratch welcomes people of all ages, races, ethnicities, religions, sexual orientations, and gender identities.</p>
                    <img src="//cdn.scratch.mit.edu/scratchr2/static/__59036f4a23f9f535f48b54afa64f0d97__//images/help/spritesforcommunityguid.png" alt="lineosprites"/>
                </div>    
            </div>
        );
    }
});

render(<Page><Guidelines /></Page>, document.getElementById('app'));
