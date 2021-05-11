/* eslint-disable react/jsx-no-bind */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import {addProject, removeProject} from '../lib/studio-project-actions';
import {userProjects} from '../lib/redux-modules';
import {Filters, loadUserProjects, clearUserProjects} from '../lib/user-projects-actions';

import Modal from '../../../components/modal/base/modal.jsx';
import ModalTitle from '../../../components/modal/base/modal-title.jsx';
import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';
import SubNavigation from '../../../components/subnavigation/subnavigation.jsx';
import UserProjectsTile from './user-projects-tile.jsx';

import './user-projects-modal.scss';

const UserProjectsModal = ({
    items, error, loading, moreToLoad, onLoadMore, onClear,
    onAdd, onRemove, onRequestClose
}) => {
    const [filter, setFilter] = useState(Filters.SHARED);

    useEffect(() => {
        onClear();
        onLoadMore(filter);
    }, [filter]);
    
    return (
        <Modal
            isOpen
            className="user-projects-modal"
            onRequestClose={onRequestClose}
        >
            <ModalTitle
                className="user-projects-modal-title modal-header"
                title="Add to Studio"
            />
            <SubNavigation
                align="left"
                className="user-projects-modal-nav"
            >
                <li
                    className={classNames({active: filter === Filters.SHARED})}
                    onClick={() => setFilter(Filters.SHARED)}
                >
                    <FormattedMessage id="studio.sharedFilter" />
                </li>
                <li
                    className={classNames({active: filter === Filters.FAVORITED})}
                    onClick={() => setFilter(Filters.FAVORITED)}
                >
                    <FormattedMessage id="studio.favoritedFilter" />
                </li>
                <li
                    className={classNames({active: filter === Filters.RECENT})}
                    onClick={() => setFilter(Filters.RECENT)}
                >
                    <FormattedMessage id="studio.recentFilter" />
                </li>
            </SubNavigation>
            <ModalInnerContent className="user-projects-modal-content">
                {error && <div>Error loading {filter}: {error}</div>}
                <div className="user-projects-modal-grid">
                    {items.map(project => (
                        <UserProjectsTile
                            key={project.id}
                            id={project.id}
                            title={project.title}
                            image={project.image}
                            inStudio={project.inStudio}
                            onAdd={onAdd}
                            onRemove={onRemove}
                        />
                    ))}
                    <div className="studio-projects-load-more">
                        {loading ? <small>Loading...</small> : (
                            moreToLoad ?
                                <button onClick={() => onLoadMore(filter)}>
                                    <FormattedMessage id="general.loadMore" />
                                </button> :
                                <small>No more to load</small>
                        )}
                    </div>
                </div>
            </ModalInnerContent>
        </Modal>
    );
};

UserProjectsModal.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.id,
        image: PropTypes.string,
        title: PropTypes.string,
        inStudio: PropTypes.bool
    })),
    loading: PropTypes.bool,
    error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    moreToLoad: PropTypes.bool,
    onLoadMore: PropTypes.func,
    onClear: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onRequestClose: PropTypes.func
};

const mapStateToProps = state => ({
    ...userProjects.selector(state)
});

const mapDispatchToProps = ({
    onLoadMore: loadUserProjects,
    onClear: clearUserProjects,
    onAdd: addProject,
    onRemove: removeProject
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProjectsModal);
