const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const MediaQuery = require('react-responsive').default;
const PropTypes = require('prop-types');
const React = require('react');

const frameless = require('../../lib/frameless');

require('./masonrygrid.scss');

class MasonryGrid extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'reorderColumns'
        ]);
    }
    reorderColumns (items, cols) {
        const a1 = [];
        const a2 = [];
        const a3 = [];
        let i = 0;
        // only implemented for 2 and 3 columns so far - easy to extend if needed
        if (cols > 1 && cols < 4) {
            for (i = 0; i < items.length; i++){
                const col = (i + cols) % cols;
                if (col === 0) {
                    a1.push(items[i]);
                } else if (col === 1) {
                    a2.push(items[i]);
                } else if (col === 2) {
                    a3.push(items[i]);
                }
            }
            return a1.concat(a2, a3);
        }
        return items;
    }
    render () {
        return (
            <this.props.as className={classNames('masonry', this.props.className)}>
                <MediaQuery maxWidth={frameless.mobileIntermediate - 1}>
                    {this.props.children}
                </MediaQuery>
                <MediaQuery
                    maxWidth={frameless.desktop - 1}
                    minWidth={frameless.mobileIntermediate}
                >
                    {this.reorderColumns(this.props.children, 2)}
                </MediaQuery>
                <MediaQuery minWidth={frameless.desktop}>
                    {this.reorderColumns(this.props.children, 3)}
                </MediaQuery>
            </this.props.as>
        );
    }
}

MasonryGrid.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

MasonryGrid.defaultProps = {
    as: 'div'
};

module.exports = MasonryGrid;
