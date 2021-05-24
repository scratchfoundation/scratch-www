/* eslint-disable react/jsx-no-bind */
import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AlertContext from '../../../components/alert/alert-context.js';

const UserProjectsTile = ({id, title, image, inStudio, onAdd, onRemove}) => {
    const [submitting, setSubmitting] = useState(false);
    const [added, setAdded] = useState(inStudio);
    const {errorAlert} = useContext(AlertContext);
    const toggle = () => {
        setSubmitting(true);
        (added ? onRemove(id) : onAdd(id))
            .then(() => {
                setAdded(!added);
                setSubmitting(false);
            })
            .catch(() => {
                setSubmitting(false);
                errorAlert({
                    id: added ? 'studio.alertProjectRemoveError' :
                        'studio.alertProjectAddError'
                }, null);
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
