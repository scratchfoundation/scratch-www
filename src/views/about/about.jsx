var React = require('react');
var Render = require('../../lib/render.jsx');

require('./about.scss');

var About = React.createClass({
    type: 'About',
    render: function () {
        return (
            <div>
                <h1>I am the about page!</h1>
            </div>
        );
    }
});

Render(<About />, document.getElementById('view'));
