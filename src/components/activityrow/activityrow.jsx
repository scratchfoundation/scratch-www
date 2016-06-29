var React = require('react'); //eslint-disable-line

require('./activityrow.scss');

var ActivityRow = function (props) {
    return (
        <li key={props.item.pk} className="activity-row">
            <a href={props.url}>
                <img src={props.item.actor.thumbnail_url} width="34" height="34" alt="" />
                <p dangerouslySetInnerHTML={{__html: props.html}}></p>
                <p>
                    <span className="stamp">{props.date}</span>
                </p>
            </a>
        </li>
    );
};

module.exports = ActivityRow;
