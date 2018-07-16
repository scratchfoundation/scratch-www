const classNames = require('classnames');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');
const render = require('../../../../lib/render.jsx');

const detailsActions = require('../../../../redux/conference-details.js');

const Page = require('../../../../components/page/conference/2018/page.jsx');

require('./details.scss');

class ConferenceDetails extends React.Component {
    componentDidMount () {
        let pathname = window.location.pathname.toLowerCase();
        if (pathname[pathname.length - 1] === '/') {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        const path = pathname.split('/');
        const detailsId = path[path.length - 2];
        this.props.dispatch(detailsActions.startGetDetails(detailsId));
    }
    render () {
        let backUri = '/conference/2018/schedule';
        if (!this.props.conferenceDetails.error && !this.props.conferenceDetails.fetching) {
            backUri = `${backUri}#${this.props.conferenceDetails.Day}`;
        }
        const classes = classNames(
            'inner',
            'details',
            {fetching: this.props.conferenceDetails.fetching}
        );
        return (
            <div className={classes}>
                <div className="back">
                    <a href={backUri}>
                        &larr; Back to Full Schedule
                    </a>
                </div>
                {this.props.conferenceDetails.error ? [
                    <h2 key="not-found">Agenda Item Not Found</h2>
                ] : [
                    <h2 key="details-title">{this.props.conferenceDetails.Title}</h2>,
                    <ul
                        className="logistics"
                        key="details-logistics"
                    >
                        {this.props.conferenceDetails.fetching ? [] : [
                            <li key="presenter">
                                <img
                                    alt="presenter icon"
                                    src="/svgs/conference/schedule/presenter-icon.svg"
                                />
                                {this.props.conferenceDetails.Presenter}
                            </li>,
                            <li key="start">
                                <img
                                    alt="time icon"
                                    src="/svgs/conference/schedule/time-icon.svg"
                                />
                                {this.props.conferenceDetails.Start} &ndash; {this.props.conferenceDetails.End}
                            </li>,
                            <li key="type">
                                <img
                                    alt="event icon"
                                    src="/svgs/conference/schedule/event-icon.svg"
                                />
                                {this.props.conferenceDetails.Type}
                            </li>,
                            <li key="location">
                                <img
                                    alt="location icon"
                                    src="/svgs/conference/schedule/location-icon.svg"
                                />
                                {this.props.conferenceDetails.Location}
                            </li>
                        ]}
                    </ul>,
                    <div
                        className="description"
                        key="details-desc"
                    >
                        <p>
                            {this.props.conferenceDetails.Description}
                        </p>
                    </div>,
                    <div
                        className="back"
                        key="details-back"
                    >
                        {this.props.conferenceDetails.fetching ? [] : [
                            <a
                                href={backUri}
                                key="details-back-uri"
                            >
                                &larr; Back to Full Schedule
                            </a>
                        ]}
                    </div>
                ]}
            </div>
        );
    }
}

ConferenceDetails.propTypes = {
    conferenceDetails: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    dispatch: PropTypes.func
};

const mapStateToProps = state => ({
    conferenceDetails: state.conferenceDetails
});

const ConnectedDetails = connect(mapStateToProps)(ConferenceDetails);

render(
    <Page><ConnectedDetails /></Page>,
    document.getElementById('app'),
    {conferenceDetails: detailsActions.detailsReducer}
);
