import React from 'react';

require('./footer.scss');

var FooterBox = React.createClass({
    type: 'FooterBox',
    render: function () {
        return (
            <div className="inner">
                {this.props.children}
            </div>
        );
    }
});

export default FooterBox;
