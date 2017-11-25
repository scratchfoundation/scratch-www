import classNames from 'classnames';
import {FormattedRelative} from 'react-intl';
import React from 'react';

import FlexRow from '../flex-row/flex-row.jsx';

require('./social-message.scss');

var SocialMessage = React.createClass({
    type: 'SocialMessage',
    propTypes: {
        as: React.PropTypes.string,
        datetime: React.PropTypes.string.isRequired,
        iconSrc: React.PropTypes.string,
        iconAlt: React.PropTypes.string,
        imgClassName: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            as: 'li'
        };
    },
    render: function () {
        var classes = classNames(
            'social-message',
            this.props.className
        );
        var imgClass = classNames(
            'social-message-icon',
            this.props.imgClassName
        );
        return (
            <this.props.as className={classes}>
                <FlexRow className="mod-social-message">
                    <div className="social-message-content">
                        {typeof this.props.iconSrc !== 'undefined' ? [
                            <img
                                key="social-message-icon"
                                className={imgClass}
                                src={this.props.iconSrc}
                                alt={this.props.iconAlt}
                            />
                        ] : []}
                        <div>
                            {this.props.children}
                        </div>
                    </div>
                    <span className="social-message-date">
                        <FormattedRelative value={new Date(this.props.datetime)} />
                    </span>
                </FlexRow>
            </this.props.as>
        );
    }
});

export default SocialMessage;
