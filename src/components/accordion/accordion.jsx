const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./accordion.scss');

class Accordion extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
        this.state = {
            isOpen: false
        };
    }
    handleClick (e) {
        e.preventDefault();
        this.setState({isOpen: !this.state.isOpen});
    }
    render () {
        const classes = classNames({
            content: true,
            open: this.state.isOpen
        });
        return (
            <div className="accordion">
                <this.props.titleAs
                    className="title"
                    onClick={this.handleClick}
                >
                    {this.props.title}
                </this.props.titleAs>
                <this.props.contentAs className={classes}>
                    {this.props.content}
                </this.props.contentAs>
            </div>
        );
    }
}

Accordion.propTypes = {
    content: PropTypes.node,
    title: PropTypes.string
};

Accordion.defaultProps = {
    contentAs: 'div',
    titleAs: 'div'
};

module.exports = Accordion;
