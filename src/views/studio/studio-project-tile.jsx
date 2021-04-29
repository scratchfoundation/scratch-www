/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {selectCanRemoveProjects} from '../../redux/studio-permissions';
import {removeProject} from './lib/studio-project-actions';

const StudioProjectTile = ({
    canRemove, onRemove, // mapState props
    id, title, image, avatar, username // own props
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const projectUrl = `/projects/${id}`;
    const userUrl = `/users/${username}`;
    return (
        <div className="studio-project-tile">
            <a href={projectUrl}>
                <img
                    className="studio-project-image"
                    src={image}
                />
            </a>
            <div className="studio-project-bottom">
                <a href={userUrl}>
                    <img
                        className="studio-project-avatar"
                        src={avatar}
                    />
                </a>
                <div className="studio-project-info">
                    <a
                        href={projectUrl}
                        className="studio-project-title"
                    >{title}</a>
                    <a
                        href={userUrl}
                        className="studio-project-username"
                    >{username}</a>
                </div>
                {canRemove &&
                    <button
                        className={classNames('studio-project-remove', {
                            'mod-mutating': submitting
                        })}
                        disabled={submitting}
                        onClick={() => {
                            setSubmitting(true);
                            setError(null);
                            onRemove(id)
                                .catch(e => {
                                    setError(e);
                                    setSubmitting(false);
                                });
                        }}
                    >✕</button>
                }
                {error && <div>{error}</div>}
            </div>
        </div>
    );
};

StudioProjectTile.propTypes = {
    canRemove: PropTypes.bool,
    onRemove: PropTypes.func,
    id: PropTypes.number,
    title: PropTypes.string,
    username: PropTypes.string,
    image: PropTypes.string,
    avatar: PropTypes.string
};

const mapStateToProps = state => ({
    canRemove: selectCanRemoveProjects(state)
});

const mapDispatchToProps = ({
    onRemove: removeProject
});

export default connect(mapStateToProps, mapDispatchToProps)(StudioProjectTile);
