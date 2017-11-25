import React from 'react';
import classNames from 'classnames';

import Navigation from '../../navigation/www/navigation.jsx';
import Footer from '../../footer/www/footer.jsx';

var Page = React.createClass({
    type: 'Page',
    render: function () {
        var classes = classNames({
            'staging': process.env.SCRATCH_ENV == 'staging'
        });
        return (
            <div className="page">
                <div id="navigation" className={classes}>
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
