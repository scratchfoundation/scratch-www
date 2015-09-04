var React = require('react');

require('./main.scss');

var Navigation = require('./components/navigation/navigation.jsx');
var Footer = require('./components/footer/footer.jsx');

React.render(<Navigation />, document.getElementById('navigation'));
React.render(<Footer />, document.getElementById('footer'));
