/* eslint-disable react/jsx-no-bind */
import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import AlertContext from '../../components/alert/alert-context.js';
import {selectCanRemoveProject} from '../../redux/studio-permissions';
import {removeProject} from './lib/studio-project-actions';

import OverflowMenu from '../../components/overflow-menu/overflow-menu.jsx';
import removeIcon from './icons/remove-icon.svg';

const StudioProjectTile = ({
    canRemove, onRemove, // mapState props
    id, title, image, avatar, username // own props
}) => {
    const [submitting, setSubmitting] = useState(false);
    const projectUrl = `/projects/${id}`;
    const userUrl = `/users/${username}`;
    const {errorAlert} = useContext(AlertContext);
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
                    <OverflowMenu>
                        <li>
                            <button
                                className={classNames({
                                    'mod-mutating': submitting
                                })}
                                disabled={submitting}
                                onClick={() => {
                                    setSubmitting(true);
                                    onRemove(id)
                                        .catch(() => {
                                            setSubmitting(false);
                                            errorAlert({id: 'studio.alertProjectRemoveError'});
                                        });
                                }}
                            >
                                <img src={removeIcon} />
                                <FormattedMessage id="studio.remove" />
                            </button></li>
                    </OverflowMenu>
                }
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

const mapStateToProps = (state, ownProps) => ({
    canRemove: selectCanRemoveProject(state, ownProps.username, ownProps.addedBy)
});

const mapDispatchToProps = ({
    onRemove: removeProject
});

export default connect(mapStateToProps, mapDispatchToProps)(StudioProjectTile);
