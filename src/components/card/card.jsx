import classNames from 'classnames';
import React from 'react';

require('./card.scss');

var Card = React.createClass({
    displayName: 'Card',
    render: function () {
        return (
            <div className={classNames(['card', this.props.className])}>
                {this.props.children}
            </div>
        );
    }
});

export default Card;
