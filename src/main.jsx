var Renderer = require('./lib/renderer.jsx');

require('./main.scss');

var Navigation = require('./components/navigation/navigation.jsx');
var Footer = require('./components/footer/footer.jsx');

Renderer.render(<Navigation />, document.getElementById('navigation'));
Renderer.render(<Footer />, document.getElementById('footer'));
