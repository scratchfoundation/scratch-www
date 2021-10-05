const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');


require('./annual-report-example.scss');

const AnnualReportExample = props => (
    <div className={classNames('annual-report-example', props.className)}>
      {props.className === 'regular' &&
        <div className="half">
          <img className="large" src={props.large_image} />
        </div>
      }
      <div className="half">
        <h5>{props.title}</h5>
        <p>{props.paragraph}</p>
      </div>
      {props.className === 'reverse' &&
        <div className="half">
          <img className="large" src={props.large_image} />
        </div>
      }
      {props.className === 'full-width' &&
        <div className="half">
          <img className="large" src={props.large_image} />
        </div>
      }
    </div>
);

AnnualReportExample.propTypes = {
    title: PropTypes.string,
    paragraph: PropTypes.string,
    large_image: PropTypes.string,
    className: PropTypes.string
};

module.exports = AnnualReportExample;
