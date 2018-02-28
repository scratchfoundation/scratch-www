const React = require('react');
const render = require('../../lib/render.jsx');

require('./preview.css');
const GUI = require('scratch-gui').default;

class Preview extends React.Component {
    componentDidMount () {
        // handle project id in URI
    }
    render () {
        return (
            // will need a container to set 'dir' attribute RTL if lang is rtl.
            <GUI className="gui" />
        );
    }
}

render(<Preview />, document.getElementById('app'));
