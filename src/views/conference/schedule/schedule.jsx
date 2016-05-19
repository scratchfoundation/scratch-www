var classNames = require('classnames');
var connect = require('react-redux').connect;
var React = require('react');
var render = require('../../../lib/render.jsx');

var scheduleActions = require('../../../redux/conference-schedule.js');

var FlexRow = require('../../../components/flex-row/flex-row.jsx');
var Page = require('../../../components/page/conference/page.jsx');
var SubNavigation = require('../../../components/subnavigation/subnavigation.jsx');
var TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./schedule.scss');

var ConferenceSchedule = React.createClass({
    type: 'ConferenceSchedule',
    propTypes: {
        day: React.PropTypes.string,
        schedule: React.PropTypes.array
    },
    componentDidMount: function () {
        var day = window.location.hash.substr(1) || 'thursday';
        this.handleScheduleChange(day);
    },
    handleScheduleChange: function (day) {
        this.props.dispatch(scheduleActions.startGetSchedule(day));
    },
    renderChunkItems: function (chunk) {
        return chunk.map(function (item) {
            if (item.Presenter) {
                return (
                    <a href={item.uri} className="item-url">
                        <div key={item.rowid} className="agenda-item">
                            <h3>{item.Title}</h3>
                            <FlexRow>
                                <p>
                                    <img src="/svgs/conference/schedule/time-icon.svg" alt="time icon" />
                                    {item.Start} &ndash; {item.End}
                                </p>
                                <p>
                                    <img src="/svgs/conference/schedule/location-icon.svg" alt="location icon" />
                                    {item.Location}
                                </p>
                            </FlexRow>
                            <FlexRow>
                                <p>
                                    <img src="/svgs/conference/schedule/presenter-icon.svg" alt="presenter icon" />
                                    {item.Presenter}
                                </p>
                                <p>
                                    <img src="/svgs/conference/schedule/event-icon.svg" alt="event icon" />
                                    {item.Type}
                                </p>
                            </FlexRow>
                        </div>
                    </a>
                );
            } else {
                return (
                    <div key={item.rowid} className="agenda-item no-click">
                        <h3>{item.Title}</h3>
                        <FlexRow>
                            <p>{item.Start} &ndash; {item.End}</p>
                            <p>{item.Location}</p>
                        </FlexRow>
                    </div>
                );
            }
        });
    },
    render: function () {
        var tabClasses = {
            'thursday': classNames({
                'selected': (this.props.day === 'thursday')
            }),
            'friday': classNames({
                'selected': (this.props.day === 'friday')
            }),
            'saturday': classNames({
                'last': true,
                'selected': (this.props.day === 'saturday')
            })
        };
        return (
            <div className="schedule">
                <TitleBanner>
                    <h1>
                        Schedule
                    </h1>
                </TitleBanner>
                <SubNavigation>
                    <li className={tabClasses.thursday}
                        onClick={this.handleScheduleChange.bind(this, 'thursday')}>
                        <img src="/svgs/conference/expect/aug4-icon.svg" alt="August 4th Icon" />
                        <span>Thursday</span>
                    </li>
                    <li className={tabClasses.friday}
                        onClick={this.handleScheduleChange.bind(this, 'friday')}>
                        <img src="/svgs/conference/expect/aug5-icon.svg" alt="August 5th Icon" />
                        <span>Friday</span>
                    </li>
                    <li className={tabClasses.saturday}
                        onClick={this.handleScheduleChange.bind(this, 'saturday')}>
                        <img src="/svgs/conference/expect/aug6-icon.svg" alt="August 6th Icon" />
                        <span>Saturday</span>
                    </li>
                </SubNavigation>
                <div className="inner">
                    {this.props.schedule.map(function (chunk) {
                        return ([
                            <h2 key={chunk.info.name} className="breaking-title">
                                <span>{chunk.info.name} – {chunk.info.time}</span>
                            </h2>,
                            this.renderChunkItems(chunk.items)
                        ]);
                    }.bind(this))}
                </div>
            </div>
        );
    }
});

var mapStateToProps = function (state) {
    return {
        day: state.day,
        schedule: state.schedule,
        fetching: state.fetching,
        error: state.error
    };
};

var ConnectedSchedule = connect(mapStateToProps)(ConferenceSchedule);

render(<Page><ConnectedSchedule /></Page>, document.getElementById('app'));
