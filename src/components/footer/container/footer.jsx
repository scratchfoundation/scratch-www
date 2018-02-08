const PropTypes = require('prop-types');
const React = require('react');

require('./footer.scss');

const FooterBox = props => (
    <div className="inner">
        {props.children}
    </div>
);

FooterBox.propTypes = {
    children: PropTypes.node
};

module.exports = FooterBox;
