/* eslint-disable react/jsx-no-bind */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

import {selectClassroomId} from '../../../redux/studio';
import {addProject, removeProject} from '../lib/studio-project-actions';
import {userProjects} from '../lib/redux-modules';
import {Filters, loadUserProjects, clearUserProjects} from '../lib/user-projects-actions';

import Modal from '../../../components/modal/base/modal.jsx';
import ModalTitle from '../../../components/modal/base/modal-title.jsx';
import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';
import SubNavigation from '../../../components/subnavigation/subnavigation.jsx';
import UserProjectsTile from './user-projects-tile.jsx';

import './user-projects-modal.scss';
import {selectIsEducator} from '../../../redux/session';
import AlertProvider from '../../../components/alert/alert-provider.jsx';
import Alert from '../../../components/alert/alert.jsx';

const UserProjectsModal = ({
    items, error, loading, moreToLoad, showStudentsFilter,
    onLoadMore, onClear, onAdd, onRemove, onRequestClose
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
                <button
                    className={classNames({active: filter === Filters.SHARED})}
                    onClick={() => setFilter(Filters.SHARED)}
                >
                    <FormattedMessage id="studio.sharedFilter" />
                </button>
                <button
                    className={classNames({active: filter === Filters.FAVORITED})}
                    onClick={() => setFilter(Filters.FAVORITED)}
                >
                    <FormattedMessage id="studio.favoritedFilter" />
                </button>
                <button
                    className={classNames({active: filter === Filters.RECENT})}
                    onClick={() => setFilter(Filters.RECENT)}
                >
                    <FormattedMessage id="studio.recentFilter" />
                </button>
                {showStudentsFilter &&
                    <button
                        className={classNames({active: filter === Filters.STUDENTS})}
                        onClick={() => setFilter(Filters.STUDENTS)}
                    >
                        <FormattedMessage id="studio.studentsFilter" />
                    </button>
                }
            </SubNavigation>
            <ModalInnerContent className="user-projects-modal-content">
                <AlertProvider>
                    {error && <div>Error loading {filter}: {error}</div>}
                    <Alert className="studio-alert" />
                    {items.length > 0 ? (
                        <React.Fragment>
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
                            </div>
                            {moreToLoad &&
                                <div className="studio-projects-load-more">
                                    <button
                                        className={classNames('button', {
                                            'mod-mutating': loading
                                        })}
                                        onClick={() => onLoadMore(filter)}
                                    >
                                        <FormattedMessage id="general.loadMore" />
                                    </button>
                                </div>
                            }
                        </React.Fragment>
                    ) :
                        <div>
                            <img
                                src="/svgs/studio/add-to-studio-empty.svg"
                            />
                            <div>
                                {filter === Filters.SHARED &&
                                    <FormattedMessage id="studio.addProjects.noSharedYet" />}
                                {filter === Filters.FAVORITED &&
                                    <FormattedMessage id="studio.addProjects.noFavoritedYet" />}
                                {filter === Filters.RECENT &&
                                    <FormattedMessage id="studio.addProjects.noRecentYet" />}
                                {filter === Filters.STUDENTS &&
                                    <FormattedMessage id="studio.addProjects.noStudentsYet" />}
                            </div>
                        </div>
                    }
                </AlertProvider>
            </ModalInnerContent>
            <div className="studio-projects-done-row">
                <button
                    className="button"
                    onClick={onRequestClose}
                >
                    <FormattedMessage id="general.done" />
                </button>
            </div>
        </Modal>
    );
};

UserProjectsModal.propTypes = {
    showStudentsFilter: PropTypes.bool,
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
    ...userProjects.selector(state),
    showStudentsFilter: selectIsEducator(state) && selectClassroomId(state)
});

const mapDispatchToProps = ({
    onLoadMore: loadUserProjects,
    onClear: clearUserProjects,
    onAdd: addProject,
    onRemove: removeProject
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProjectsModal);
