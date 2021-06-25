/* eslint-disable react/jsx-no-bind */
import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AlertContext from '../../../components/alert/alert-context.js';
import {errorToMessageId} from '../studio-project-adder.jsx';

const UserProjectsTile = ({id, title, image, inStudio, onAdd, onRemove}) => {
    const [submitting, setSubmitting] = useState(false);
    const [added, setAdded] = useState(inStudio);
    const {errorAlert} = useContext(AlertContext);
    const toggle = () => {
        setSubmitting(true);
        const adding = !added; // for clarity, the current action is opposite of previous state
        (adding ? onAdd(id) : onRemove(id))
            .then(() => {
                setAdded(adding);
                setSubmitting(false);
            })
            .catch(e => {
                // if adding, use the same error messages as the add-by-url component
                // otherwise use a single generic message for remove errors
                const errorId = adding ? errorToMessageId(e) :
                    'studio.alertProjectRemoveError';
                setSubmitting(false);
                errorAlert({id: errorId}, null);
            });
    };
    return (
        <div
            role="button"
            tabIndex="0"
            className={classNames('studio-project-tile', {
                'studio-tile-added': added,
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
                    <img
                        className="studio-project-add-remove-image"
                        src={added ?
                            '/svgs/studio/check-icon-white.svg' :
                            '/svgs/studio/plus-icon-white.svg'
                        }
                    />
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
