import classNames from 'classnames';
import {connect} from 'react-redux';
import React from 'react';
import render from '../../../../lib/render.jsx';

import {startGetSchedule, scheduleReducer} from '../../../../redux/conference-schedule.js';

import FlexRow from '../../../../components/flex-row/flex-row.jsx';
import Page from '../../../../components/page/conference/2016/page.jsx';
import SubNavigation from '../../../../components/subnavigation/subnavigation.jsx';
import TitleBanner from '../../../../components/title-banner/title-banner.jsx';

require('./schedule.scss');

var ConferenceSchedule = React.createClass({
    type: 'ConferenceSchedule',
    propTypes: {
        conferenceSchedule: React.PropTypes.object
    },
    componentDidMount: function () {
        var day = window.location.hash.substr(1) || 'thursday';
        this.handleScheduleChange(day);
    },
    handleScheduleChange: function (day) {
        window.history.replaceState(history.state, '', '#' + day);
        this.props.dispatch(startGetSchedule(day));
    },
    renderChunkItems: function (timeSlot) {
        return timeSlot.map(function (item) {
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
                'selected': (this.props.conferenceSchedule.day === 'thursday')
            }),
            'friday': classNames({
                'selected': (this.props.conferenceSchedule.day === 'friday')
            }),
            'saturday': classNames({
                'last': true,
                'selected': (this.props.conferenceSchedule.day === 'saturday')
            })
        };
        return (
            <div className="schedule">
                <TitleBanner className="mod-conference">
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
                    {this.props.conferenceSchedule.timeSlots.map(function (timeSlot) {
                        return ([
                            <h2 key={timeSlot.info.name} className="breaking-title">
                                <span>{timeSlot.info.name} – {timeSlot.info.time}</span>
                            </h2>,
                            this.renderChunkItems(timeSlot.items)
                        ]);
                    }.bind(this))}
                </div>
            </div>
        );
    }
});

var mapStateToProps = function (state) {
    return {
        conferenceSchedule: state.conferenceSchedule
    };
};

var ConnectedSchedule = connect(mapStateToProps)(ConferenceSchedule);

render(
    <Page><ConnectedSchedule /></Page>,
    document.getElementById('app'),
    {conferenceSchedule: scheduleReducer}
);
