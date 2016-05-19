var classNames = require('classnames');
var connect = require('react-redux').connect;
var React = require('react');
var render = require('../../../lib/render.jsx');

var detailsActions = require('../../../redux/conference-details.js');

var Page = require('../../../components/page/conference/page.jsx');

require('./details.scss');

var ConferenceDetails = React.createClass({
    type: 'ConferenceDetails',
    propTypes: {
        detailsId: React.PropTypes.number,
        details: React.PropTypes.object
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
        var backUri = '/conference/schedule';
        if (!this.props.details.error && !this.props.details.fetching) {
            backUri = backUri + '#' + this.props.details.Day;
        }
        var classes = classNames({
            'inner': true,
            'details': true,
            'fetching': this.props.details.fetching
        });
        return (
            <div className={classes}>
                <div className="back">
                    <a href={backUri}>
                        &larr; Back to Full Schedule
                    </a>
                </div>
                {this.props.details.error ? [
                    <h2>Agenda Item Not Found</h2>
                ] : [
                    <h2>{this.props.details.Title}</h2>,
                    <ul className="logistics">
                        <li>
                            <img src="/svgs/conference/schedule/presenter-icon.svg" alt="presenter icon" />
                            {this.props.details.Presenter}
                        </li>
                        <li>
                            <img src="/svgs/conference/schedule/time-icon.svg" alt="time icon" />
                            {this.props.details.Start} &ndash; {this.props.details.End}
                        </li>
                        <li>
                            <img src="/svgs/conference/schedule/event-icon.svg" alt="event icon" />
                            {this.props.details.Type}
                        </li>
                        <li>
                            <img src="/svgs/conference/schedule/location-icon.svg" alt="location icon" />
                            {this.props.details.Location}
                        </li>
                    </ul>,
                    <div className="description">
                        {this.props.details.Description}
                    </div>,
                    <div className="back">
                    {this.props.details.fetching ? [] : [
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
        details: state.details,
        fetching: state.fetching,
        error: state.error
    };
};

var ConnectedDetails = connect(mapStateToProps)(ConferenceDetails);

render(<Page><ConnectedDetails /></Page>, document.getElementById('app'));
