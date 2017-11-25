import React from 'react';

import Navigation from '../../../navigation/conference/2017/navigation.jsx';
import Footer from '../../../footer/conference/2017/footer.jsx';

require('../page.scss');

var Page = React.createClass({
    type: 'Page',
    render: function () {
        return (
            <div className="page mod-conference">
                <div id="navigation">
                    <Navigation />
                </div>
                <div id="view">
                    {this.props.children}
                </div>
                <div id="footer">
                    <Footer />
                </div>
            </div>
        );
    }
});

export default Page;
