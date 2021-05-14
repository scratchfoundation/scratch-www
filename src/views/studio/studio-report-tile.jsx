import React from 'react';
import PropTypes from 'prop-types';

const StudioReportTile = props =>
    (
        <label>
            <div className="studio-report-tile">
                <div className="studio-report-tile-header">
                    <input
                        type="radio"
                        name="studio-report"
                        value={props.value}
                        onChange={props.handleChange}
                    />
                    {props.heading}
                </div>
                {props.text &&
                    <div className="studio-report-tile-text">
                        {props.text}
                    </div>
                }
                {props.image &&
                    <div className="studio-report-tile-image-container">
                        <img
                            src={props.image}
                            className="studio-report-tile-image"
                        />
                    </div>
                }
            </div>
        </label>
    );

StudioReportTile.propTypes = {
    heading: PropTypes.string,
    text: PropTypes.string,
    handleChange: PropTypes.func,
    image: PropTypes.string,
    value: PropTypes.string
};

export default StudioReportTile;
