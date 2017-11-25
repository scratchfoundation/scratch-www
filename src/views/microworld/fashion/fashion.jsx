import React from 'react'; // eslint-disable-line
import render from '../../../lib/render.jsx';
import Microworld from '../../../components/microworld/microworld.jsx';
import Page from '../../../components/page/www/page.jsx';

import microworldData from './fashion.json';

render(<Page><Microworld microworldData={microworldData} /></Page>, document.getElementById('app'));
