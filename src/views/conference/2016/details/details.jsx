import classNames from 'classnames';
import {connect} from 'react-redux';
import React from 'react';
import render from '../../../../lib/render.jsx';

import detailsActions from '../../../../redux/conference-details.js';

import Page from '../../../../components/page/conference/2016/page.jsx';

require('./details.scss');

var ConferenceDetails = React.createClass({
    type: 'ConferenceDetails',
    propTypes: {
        detailsId: React.PropTypes.number,
        conferenceDetails: React.PropTypes.object
    },
    componentDidMount: function () {
        var pathname = window.location.pathname.toLowerCase();
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        var path = pathname.split('/');
        var detailsId = path[path.length - 2];
        this.props.dispatch(detailsActions.startGetDetails(detailsId));
    },
    render: function () {
        var backUri = '/conference/2016/schedule';
        if (!this.props.conferenceDetails.error && !this.props.conferenceDetails.fetching) {
            backUri = backUri + '#' + this.props.conferenceDetails.Day;
        }
        var classes = classNames({
            'inner': true,
            'details': true,
            'fetching': this.props.conferenceDetails.fetching
        });
        return (
            <div className={classes}>
                <div className="back">
                    <a href={backUri}>
                        &larr; Back to Full Schedule
                    </a>
                </div>
                {this.props.conferenceDetails.error ? [
                    <h2>Agenda Item Not Found</h2>
                ] : [
                    <h2>{this.props.conferenceDetails.Title}</h2>,
                    <ul className="logistics">
                        {this.props.conferenceDetails.fetching ? [] : [
                            <li>
                                <img src="/svgs/conference/schedule/presenter-icon.svg" alt="presenter icon" />
                                {this.props.conferenceDetails.Presenter}
                            </li>,
                            <li>
                                <img src="/svgs/conference/schedule/time-icon.svg" alt="time icon" />
                                {this.props.conferenceDetails.Start} &ndash; {this.props.conferenceDetails.End}
                            </li>,
                            <li>
                                <img src="/svgs/conference/schedule/event-icon.svg" alt="event icon" />
                                {this.props.conferenceDetails.Type}
                            </li>,
                            <li>
                                <img src="/svgs/conference/schedule/location-icon.svg" alt="location icon" />
                                {this.props.conferenceDetails.Location}
                            </li>
                        ]}
                    </ul>,
                    <div className="description">
                        <p>
                            {this.props.conferenceDetails.Description}
                        </p>
                    </div>,
                    <div className="back">
                    {this.props.conferenceDetails.fetching ? [] : [
                        <a href={backUri}>
                            &larr; Back to Full Schedule
                        </a>
                    ]}
                    </div>
                ]}
            </div>
        );
    }
});

var mapStateToProps = function (state) {
    return {
        conferenceDetails: state.conferenceDetails
    };
};

var ConnectedDetails = connect(mapStateToProps)(ConferenceDetails);

render(
    <Page><ConnectedDetails /></Page>,
    document.getElementById('app'),
    {conferenceDetails: detailsActions.detailsReducer}
);
