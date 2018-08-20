const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const scheduleActions = require('../../../../redux/conference-schedule.js');

const FlexRow = require('../../../../components/flex-row/flex-row.jsx');
const SubNavigation = require('../../../../components/subnavigation/subnavigation.jsx');
const TitleBanner = require('../../../../components/title-banner/title-banner.jsx');

const render = require('../../../../lib/render.jsx');
const Page = require('../../../../components/page/conference/2018/page.jsx');


require('./schedule.scss');

class ConferenceSchedule extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleScheduleChange',
            'renderChunkItems'
        ]);
    }
    componentDidMount () {
        const day = window.location.hash.substr(1) || 'thursday';
        this.handleScheduleChange(day);
    }
    handleScheduleChange (day) {
        window.history.replaceState(history.state, '', `#${day}`);
        this.props.dispatch(scheduleActions.startGetSchedule(day));
    }
    renderChunkItems (timeSlot) {
        return timeSlot.map(item => {
            if (item.Presenter) {
                return (
                    <a
                        className="item-url"
                        href={item.uri}
                    >
                        <div
                            className="agenda-item"
                            key={item.rowid}
                        >
                            <h3>{item.Title}</h3>
                            <FlexRow>
                                <p>
                                    <img
                                        alt="time icon"
                                        src="/svgs/conference/schedule/time-icon.svg"
                                    />
                                    {item.Start} &ndash; {item.End}
                                </p>
                                <p>
                                    <img
                                        alt="location icon"
                                        src="/svgs/conference/schedule/location-icon.svg"
                                    />
                                    {item.Location}
                                </p>
                            </FlexRow>
                            <FlexRow>
                                <p>
                                    <img
                                        alt="presenter icon"
                                        src="/svgs/conference/schedule/presenter-icon.svg"
                                    />
                                    {item.Presenter}
                                </p>
                                <p>
                                    <img
                                        alt="event icon"
                                        src="/svgs/conference/schedule/event-icon.svg"
                                    />
                                    {item.Type}
                                </p>
                            </FlexRow>
                        </div>
                    </a>
                );
            }
            return (
                <div
                    className="agenda-item no-click"
                    key={item.rowid}
                >
                    <h3>{item.Title}</h3>
                    <FlexRow>
                        <p>
                            <img
                                alt="time icon"
                                src="/svgs/conference/schedule/time-icon.svg"
                            />
                            {item.Start} &ndash; {item.End}
                        </p>
                        <p>
                            <img
                                alt="location icon"
                                src="/svgs/conference/schedule/location-icon.svg"
                            />
                            {item.Location}
                        </p>
                    </FlexRow>
                </div>
            );
        });
    }
    render () {
        const tabClasses = {
            thursday: classNames({
                selected: (this.props.conferenceSchedule.day === 'thursday')
            }),
            friday: classNames({
                selected: (this.props.conferenceSchedule.day === 'friday')
            }),
            saturday: classNames({
                last: true,
                selected: (this.props.conferenceSchedule.day === 'saturday')
            })
        };
        const handleScheduleMethods = {
            thursday: () => {
                this.handleScheduleChange('thursday');
            },
            friday: () => {
                this.handleScheduleChange('friday');
            },
            saturday: () => {
                this.handleScheduleChange('saturday');
            }
        };

        return (
            <div className="schedule">
                <TitleBanner className="mod-conference">
                    <h1>
                        Schedule
                    </h1>
                </TitleBanner>
                <SubNavigation>
                    <li
                        className={tabClasses.thursday}
                        onClick={handleScheduleMethods.thursday}
                    >
                        <img
                            alt="July 26th Icon"
                            src="/svgs/conference/expect/july26-icon.svg"
                        />
                        <span>Thursday</span>
                    </li>
                    <li
                        className={tabClasses.friday}
                        onClick={handleScheduleMethods.friday}
                    >
                        <img
                            alt="July 27th Icon"
                            src="/svgs/conference/expect/july27-icon.svg"
                        />
                        <span>Friday</span>
                    </li>
                    <li
                        className={tabClasses.saturday}
                        onClick={handleScheduleMethods.saturday}
                    >
                        <img
                            alt="July 28th Icon"
                            src="/svgs/conference/expect/july28-icon.svg"
                        />
                        <span>Saturday</span>
                    </li>
                </SubNavigation>
                <div className="inner">
                    {this.props.conferenceSchedule.timeSlots.map(timeSlot => ([
                        <h2
                            className="breaking-title"
                            key={timeSlot.info.name}
                        >
                            <span>{timeSlot.info.name} – {timeSlot.info.time}</span>
                        </h2>,
                        this.renderChunkItems(timeSlot.items)
                    ]))}
                </div>
            </div>
        );
    }
}

ConferenceSchedule.propTypes = {
    conferenceSchedule: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    dispatch: PropTypes.func
};

const mapStateToProps = state => ({
    conferenceSchedule: state.conferenceSchedule
});

const ConnectedSchedule = connect(mapStateToProps)(ConferenceSchedule);

render(
    <Page><ConnectedSchedule /></Page>,
    document.getElementById('app'),
    {conferenceSchedule: scheduleActions.scheduleReducer}
);
