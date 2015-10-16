var Render = require('./lib/render.jsx');

require('./main.scss');

var Navigation = require('./components/navigation/navigation.jsx');
var Footer = require('./components/footer/footer.jsx');

Render(<Navigation />, document.getElementById('navigation'));
Render(<Footer />, document.getElementById('footer'));
