var React = require('react');
var Renderer = require('../../lib/renderer.jsx');

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

Renderer.render(<About />, document.getElementById('view'));
