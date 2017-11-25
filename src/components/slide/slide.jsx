import classNames from 'classnames';
import React from 'react';

require('./slide.scss');

var Slide = React.createClass({
    displayName: 'Slide',
    render: function () {
        return (
            <div className={classNames(['slide', this.props.className])}>
                {this.props.children}
            </div>
        );
    }
});

export default Slide;
