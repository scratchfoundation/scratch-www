const PropTypes = require('prop-types');
const React = require('react');
const FormattedDate = require('react-intl').FormattedDate;
const FormattedMessage = require('react-intl').FormattedMessage;
const FormattedTime = require('react-intl').FormattedTime;

const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./mod-info.scss');

const ModInfo = props => (
    <FlexRow className="mod-info">
            
        {/*  eslint-disable react/jsx-sort-props */}
        {props.revisedDate &&
            <div className="mod-date">
                <FormattedDate
                    value={Date.parse(props.revisedDate)}
                    day="2-digit"
                    month="short"
                    year="numeric"
                />
                {' - '}
                <FormattedTime
                    value={Date.parse(props.revisedDate)}
                    hour="numeric"
                    minute="numeric"
                    timeZoneName="short"
                />
            </div>
        }
        {/*  eslint-enable react/jsx-sort-props */}
        <div className="mod-sprites">
            <FormattedMessage
                id="project.numSprites"
                values={{
                    number: props.sprites
                }}
            />
        </div>
        <div className="mod-scripts">
            <FormattedMessage
                id="project.numScripts"
                values={{
                    number: props.scripts
                }}
            />
        </div>
    </FlexRow>
);

ModInfo.propTypes = {
    revisedDate: PropTypes.string,
    scripts: PropTypes.number,
    sprites: PropTypes.number
};

module.exports = ModInfo;
