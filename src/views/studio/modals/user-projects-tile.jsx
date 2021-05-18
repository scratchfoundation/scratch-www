/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const UserProjectsTile = ({id, title, image, inStudio, onAdd, onRemove}) => {
    const [submitting, setSubmitting] = useState(false);
    const [added, setAdded] = useState(inStudio);
    const [error, setError] = useState(null);
    const toggle = () => {
        setSubmitting(true);
        setError(null);
        (added ? onRemove(id) : onAdd(id))
            .then(() => {
                setAdded(!added);
                setSubmitting(false);
            })
            .catch(e => {
                setError(e);
                setSubmitting(false);
            });
    };
    return (
        <div
            role="button"
            tabIndex="0"
            className={classNames('studio-project-tile', {
                'mod-clickable': true,
                'mod-mutating': submitting
            })}
            onClick={toggle}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    toggle();
                    e.preventDefault();
                }
            }}
        >
            <img
                className="studio-project-image"
                src={image}
            />
            <div className="studio-project-bottom">
                <div className="studio-project-title">{title}</div>
                <div className={`studio-tile-dynamic-${added ? 'remove' : 'add'}`}>
                    {added ? '✔' : '＋'}
                </div>
                {error && <div>{error}</div>}
            </div>
        </div>
    );
};

UserProjectsTile.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    inStudio: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default UserProjectsTile;
