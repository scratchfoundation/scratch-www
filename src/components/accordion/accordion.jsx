import classNames from 'classnames';
import React from 'react';

require('./accordion.scss');

var Accordion = React.createClass({
    type: 'Accordion',
    getDefaultProps: function () {
        return {
            titleAs: 'div',
            contentAs: 'div'
        };
    },
    getInitialState: function () {
        return {
            isOpen: false
        };
    },
    toggleContent: function () {
        this.setState({isOpen: !this.state.isOpen});
    },
    render: function () {
        var classes = classNames({
            'content': true,
            'open': this.state.isOpen
        });
        return (
            <div className="accordion">
                <this.props.titleAs className="title"
                     onClick={this.toggleContent}>
                    {this.props.title}
                </this.props.titleAs>
                <this.props.contentAs className={classes}>
                    {this.props.content}
                </this.props.contentAs>
            </div>
        );
    }
});

export default Accordion;
