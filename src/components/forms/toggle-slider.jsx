const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./toggle-slider.scss');

const ToggleSlider = props => (
    <label className={classNames('toggle-switch', props.className)} >
        <input
            checked={props.checked}
            type="checkbox"
            onChange={props.onChange}
        />
        <span className="slider" />
    </label>
);

ToggleSlider.propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func
};

module.exports = ToggleSlider;
