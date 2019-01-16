const connect = require('react-redux').connect;

const previewActions = require('../../redux/preview.js');
const AddToStudioModal = require('../../components/modal/addtostudio/container.jsx');

// user can add project to studio if studio is open to all, or user is a curator of studio
const canAdd = (studio, userIsCurator) => (
    studio.open_to_all || userIsCurator
);

// user can remove project from studio if user owns project or is admin or user is a curator of studio
const canRemove = (userOwnsProject, isAdmin, userIsCurator) => (
    userOwnsProject || isAdmin || userIsCurator
);

// include a given studio in the list to show in add to studio modal.
// only include it if user has the ability to remove the project from this studio.
const showStudio = (studio, currentStudioIds, userIsCurator, userOwnsProject, isAdmin) => {
    const includesProject = (currentStudioIds.indexOf(studio.id) !== -1);
    const canAddToThisStudio = canAdd(studio, userIsCurator);
    const canRemoveFromThisStudio = canRemove(userOwnsProject, isAdmin, userIsCurator);
    if (canRemoveFromThisStudio) { // power to remove matches set of studios we want to show
        // include the current status of whether the project is in the studio,
        // and what privileges the user has to change that.
        const consolidatedStudio = Object.assign({}, studio, {
            includesProject: includesProject,
            canAdd: canAddToThisStudio,
            canRemove: canRemoveFromThisStudio
        });
        return consolidatedStudio;
    }
    return null;
};

// Build consolidated curatedStudios object from all studio info.
// We add flags to indicate whether the project is currently in the studio,
// and the status of requests to join/leave studios.
const consolidateStudiosInfo = (userOwnsProject, isAdmin, curatedStudios, projectStudios,
    currentStudioIds, studioRequests) => {

    const consolidatedStudios = [];

    // for each studio the project is in, include it if user can add or remove project from it.
    projectStudios.forEach(projectStudio => {
        const userIsCurator = curatedStudios.some(curatedStudio => (curatedStudio.id === projectStudio.id));
        const studioToShow = showStudio(projectStudio, currentStudioIds, userIsCurator, userOwnsProject, isAdmin);
        if (studioToShow) {
            consolidatedStudios.push(studioToShow);
        }
    });

    // for each curated studio, if it was not already added to consolidatedStudios above, add it now.
    curatedStudios.forEach(curatedStudio => {
        if (!projectStudios.some(projectStudio => (projectStudio.id === curatedStudio.id))) {
            const studioToShow = showStudio(curatedStudio, currentStudioIds, true, userOwnsProject, isAdmin);
            if (studioToShow) {
                consolidatedStudios.push(studioToShow);
            }
        }
    });

    // set studio state to hasRequestOutstanding==true if it's being fetched,
    // false if it's not
    consolidatedStudios.forEach(consolidatedStudio => {
        const id = consolidatedStudio.id;
        consolidatedStudio.hasRequestOutstanding =
            ((id in studioRequests) &&
            (studioRequests[id] === previewActions.Status.FETCHING));
    });

    return consolidatedStudios;
};

const mapStateToProps = (state, ownProps) => ({
    studios: consolidateStudiosInfo(ownProps.userOwnsProject, ownProps.isAdmin,
        state.preview.curatedStudios, state.preview.projectStudios,
        state.preview.currentStudioIds, state.preview.status.studioRequests)
});

const mapDispatchToProps = () => ({});

const ConnectedAddToStudioModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddToStudioModal);

module.exports = ConnectedAddToStudioModal;
