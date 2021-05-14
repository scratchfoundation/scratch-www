import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import StudioOpenToAll from './studio-open-to-all.jsx';
import {FormattedMessage} from 'react-intl';

import {projects} from './lib/redux-modules';
import {selectCanAddProjects, selectCanEditOpenToAll} from '../../redux/studio-permissions';
import Debug from './debug.jsx';
import StudioProjectAdder from './studio-project-adder.jsx';
import StudioProjectTile from './studio-project-tile.jsx';
import {loadProjects} from './lib/studio-project-actions.js';
import classNames from 'classnames';
import CommentingStatus from '../../components/commenting-status/commenting-status.jsx';
import {selectMuteStatus} from '../../redux/session.js';
import {formatRelativeTime} from '../../lib/format-time.js';

const StudioProjects = ({
    canAddProjects, canEditOpenToAll, items, error, loading, moreToLoad, onLoadMore, muteExpiresAtMs
}) => {
    useEffect(() => {
        if (items.length === 0) onLoadMore();
    }, []);
    
    return (
        <div className="studio-projects">
            <div className="studio-header-container">
                <h2><FormattedMessage id="studio.projectsHeader" /></h2>
                {canEditOpenToAll && <StudioOpenToAll />}
            </div>
            {muteExpiresAtMs > Date.now() &&
                <CommentingStatus>
                    <p>
                        <FormattedMessage
                            id="studios.mutedCurators"
                            values={{
                                inDuration: formatRelativeTime(muteExpiresAtMs, window._locale)
                            }}
                        />
                        <FormattedMessage id="studios.mutedPaused" />
                    </p>
                </CommentingStatus>
            }
            {canAddProjects && <StudioProjectAdder />}
            {error && <Debug
                label="Error"
                data={error}
            />}
            <div className="studio-projects-grid">
                {items.length === 0 && !loading ? (
                    <div className="studio-empty">
                        {canAddProjects ? (
                            <React.Fragment>
                                <img
                                    width="388"
                                    height="265"
                                    className="studio-empty-img"
                                    src="/images/studios/projects-empty-can-add.png"
                                />
                                <div className="studio-empty-msg">
                                    <div><FormattedMessage id="studio.projectsEmptyCanAdd1" /></div>
                                    <div><FormattedMessage id="studio.projectsEmptyCanAdd2" /></div>
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img
                                    width="186"
                                    height="138"
                                    className="studio-empty-img"
                                    src="/images/studios/projects-empty.png"
                                />
                                <div className="studio-empty-msg">
                                    <div><FormattedMessage id="studio.projectsEmpty1" /></div>
                                    <div><FormattedMessage id="studio.projectsEmpty2" /></div>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                ) : (
                    <React.Fragment>
                        {items.map(item =>
                            (<StudioProjectTile
                                fetching={loading}
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                avatar={item.avatar['90x90']}
                                username={item.username}
                                addedBy={item.actor_id}
                            />)
                        )}
                        {moreToLoad &&
                            <div className="studio-projects-load-more">
                                <button
                                    className={classNames('button', {
                                        'mod-mutating': loading
                                    })}
                                    onClick={onLoadMore}
                                >
                                    <FormattedMessage id="general.loadMore" />
                                </button>
                            </div>
                        }
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

StudioProjects.propTypes = {
    canAddProjects: PropTypes.bool,
    canEditOpenToAll: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
        avatar: PropTypes.shape({
            '90x90': PropTypes.string
        }),
        id: PropTypes.id,
        title: PropTypes.string,
        username: PropTypes.string
    })),
    loading: PropTypes.bool,
    error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    moreToLoad: PropTypes.bool,
    muteExpiresAtMs: PropTypes.number,
    onLoadMore: PropTypes.func
};

export default connect(
    state => ({
        ...projects.selector(state),
        canAddProjects: selectCanAddProjects(state),
        canEditOpenToAll: selectCanEditOpenToAll(state),
        muteExpiresAtMs: (selectMuteStatus(state).muteExpiresAt * 1000 || 0)
    }),
    {
        onLoadMore: loadProjects
    }
)(StudioProjects);
