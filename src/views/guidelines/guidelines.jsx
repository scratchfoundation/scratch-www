var React = require('react');
var render = require('../../lib/render.jsx');
var Page = require('../../components/page/page.jsx');

require('./guidelines.scss');

var Guidelines = React.createClass({
    type: 'Guidelines',
    render: function() {
        return (
        
        );
    }
});

render(<Page><Guidelines /></Page>, document.getElementById('app'));
