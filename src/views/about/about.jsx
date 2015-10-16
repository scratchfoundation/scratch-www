var React = require('react');
var render = require('../../lib/render.jsx');

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

render(<About />, document.getElementById('view'));
