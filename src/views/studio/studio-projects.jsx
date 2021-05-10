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

const StudioProjects = ({
    canAddProjects, canEditOpenToAll, items, error, loading, moreToLoad, onLoadMore
}) => {
    useEffect(() => {
        if (items.length === 0) onLoadMore();
    }, []);
    
    return (
        <div className="studio-projects">
            <h2><FormattedMessage id="studio.projectsHeader" /></h2>
            {canEditOpenToAll && <StudioOpenToAll />}
            {canAddProjects && <StudioProjectAdder />}
            {error && <Debug
                label="Error"
                data={error}
            />}
            <div className="studio-projects-grid">
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
                <div className="studio-projects-load-more">
                    {loading ? <small>Loading...</small> : (
                        moreToLoad ?
                            <button onClick={onLoadMore}>
                                <FormattedMessage id="general.loadMore" />
                            </button> :
                            <small>No more to load</small>
                    )}
                </div>
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
    onLoadMore: PropTypes.func
};

export default connect(
    state => ({
        ...projects.selector(state),
        canAddProjects: selectCanAddProjects(state),
        canEditOpenToAll: selectCanEditOpenToAll(state)
    }),
    {
        onLoadMore: loadProjects
    }
)(StudioProjects);
