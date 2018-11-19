const connect = require('react-redux').connect;

const previewActions = require('../../redux/preview.js');
const AddToStudioModal = require('../../components/modal/addtostudio/container.jsx');

// Build consolidated curatedStudios object from all studio info.
// We add flags to indicate whether the project is currently in the studio,
// and the status of requests to join/leave studios.
const consolidateStudiosInfo = (curatedStudios, projectStudios, currentStudioIds, studioRequests) => {
    const consolidatedStudios = [];

    projectStudios.forEach(projectStudio => {
        const includesProject = (currentStudioIds.indexOf(projectStudio.id) !== -1);
        const consolidatedStudio =
            Object.assign({}, projectStudio, {includesProject: includesProject});
        consolidatedStudios.push(consolidatedStudio);
    });

    // copy the curated studios that project is not in
    curatedStudios.forEach(curatedStudio => {
        if (!projectStudios.some(projectStudio => (projectStudio.id === curatedStudio.id))) {
            const includesProject = (currentStudioIds.indexOf(curatedStudio.id) !== -1);
            const consolidatedStudio =
                Object.assign({}, curatedStudio, {includesProject: includesProject});
            consolidatedStudios.push(consolidatedStudio);
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

const mapStateToProps = state => ({
    studios: consolidateStudiosInfo(state.preview.curatedStudios,
        state.preview.projectStudios, state.preview.currentStudioIds,
        state.preview.status.studioRequests)
});

const mapDispatchToProps = () => ({});

const ConnectedAddToStudioModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddToStudioModal);

module.exports = ConnectedAddToStudioModal;
