const PropTypes = require('prop-types');
const React = require('react');
const oldtimeySound = require('./projector2.mp3');
import {connect} from 'react-redux';
import {isTimeTravel1920} from '../../redux/time-travel';

require('./oldtimey-mode.scss');

const OldTimeyMode = props => {
    if (!props.show) return null;
    return (
        <div className="oldtimey-mode">
            <audio
                src={oldtimeySound}
                ref={audio => {
                    audio && (audio.volume = 0.1); // eslint-disable-line no-unused-expressions
                }}
                autoPlay
                loop
            />
        </div>
    );
};

OldTimeyMode.propTypes = {
    show: PropTypes.bool
};


const mapStateToProps = state => ({
    // This is the button's mode, as opposed to the actual current state
    show: isTimeTravel1920(state)
});

module.exports = connect(
    mapStateToProps
)(OldTimeyMode);
