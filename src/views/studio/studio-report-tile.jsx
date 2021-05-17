import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const StudioReportTile = props =>
    (
        <label>
            <div
                className={classNames(
                    'studio-report-tile',
                    {'studio-report-selected': props.selected}
                )}
            >
                <div
                    className={classNames(
                        'studio-report-tile-header',
                        {'studio-report-header-selected': props.selected}
                    )}
                >
                    <input
                        checked={props.selected}
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
    selected: PropTypes.bool,
    value: PropTypes.string
};

export default StudioReportTile;
