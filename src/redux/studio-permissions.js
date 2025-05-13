const {selectUserId, selectIsAdmin, selectIsSocial,
    selectIsLoggedIn, selectUsername, selectIsMuted,
    selectHasFetchedSession, selectStudioCommentsGloballyEnabled,
    selectIsStudent } = require('./session');

// Fine-grain selector helpers - not exported, use the higher level selectors below
const isHost = state => selectUserId(state) === state.studio.host;
const isCurator = state => state.studio.curator;
const isManager = state => state.studio.manager || isHost(state);

// Action-based permissions selectors
const selectCanEditInfo = state => !selectIsMuted(state) && (selectIsAdmin(state) || isHost(state));
const selectCanAddProjects = state =>
    !selectIsMuted(state) &&
    (isManager(state) ||
    isCurator(state) ||
    (selectIsSocial(state) && state.studio.openToAll));

// This isn't "canComment" since they could be muted, but comment composer handles that
const selectShowCommentComposer = state => selectIsSocial(state);

const selectCanReportComment = (state, commentUsername) =>
    selectIsLoggedIn(state) && selectUsername(state) !== commentUsername;
const selectCanRestoreComment = state => selectIsAdmin(state);
// On the project page, project owners can delete comments with a confirmation,
// and admins can delete comments without a confirmation.
// On the studio page, studio creators and managers have the ability to delete *their own* comments with confirmation.
// Admins can delete comments without a confirmation.
const selectCanDeleteComment = (state, commentUsername) => {
    if (selectIsAdmin(state)) return true;
    if (isManager(state) && selectUsername(state) === commentUsername) return true;
    return false;
};
const selectCanDeleteCommentWithoutConfirm = state => selectIsAdmin(state);

const selectCanFollowStudio = state => selectIsLoggedIn(state);

// Matching existing behavior, only admin/creator is allowed to toggle comments.
const selectCanEditCommentsAllowed = state => !selectIsMuted(state) && (selectIsAdmin(state) || isHost(state));
const selectCanEditOpenToAll = state => !selectIsMuted(state) && isManager(state);

const selectShowCuratorInvite = state => !selectIsMuted(state) && !!state.studio.invited;
// Students should not be able to create studios, this is to address already existing ones.
// See https://scratchfoundation.atlassian.net/browse/POD-220
const selectCanInviteCurators = state => !selectIsMuted(state) && !selectIsStudent(state) && isManager(state);
const selectCanRemoveCurator = (state, username) => {
    if (selectIsMuted(state)) return false;
    // Admins/managers can remove any curators
    if (isManager(state) || selectIsAdmin(state)) return true;
    // Curators can remove themselves
    if (selectUsername(state) === username) {
        return true;
    }
    return false;
};
const selectCanRemoveManager = (state, managerId) =>
    !selectIsMuted(state) && (selectIsAdmin(state) || isManager(state)) && managerId !== state.studio.host;
const selectCanPromoteCurators = state => !selectIsMuted(state) && (isManager(state) || selectIsAdmin(state));

const selectCanTransfer = (state, managerId) => {
    // Nobody can transfer a class studio.
    // classroomId is loaded only for educator and admin users. Only educators can create class studios,
    // so educators and admins are the only users who otherwise would be able to transfer a class studio.
    if (state.studio.classroomId !== null) return false;
    if (selectIsMuted(state)) return false; // Muted users cannot transfer studios.
    if (state.studio.managers > 1) { // If there is more than one manager,
        if (managerId === state.studio.host) { // and the selected manager is the current host,
            if (isHost(state)) return true; // Owner/host can transfer
            if (selectIsAdmin(state)) return true; // Admin can transfer
        }
    }
    return false;
};

const selectCanRemoveProject = (state, creatorUsername, actorId) => {
    if (selectIsMuted(state)) return false;

    // Admins/managers can remove any projects
    if (isManager(state) || selectIsAdmin(state)) return true;
    // Project owners can always remove their projects
    if (selectUsername(state) === creatorUsername) {
        return true;
    }
    // Curators can remove projects they added
    if (isCurator(state)) {
        return selectUserId(state) === actorId;
    }
    return false;
};

// We should only show the mute errors to muted users who have any permissions related to the content
// TODO these duplicate the behavior embedded in the non-muted parts of the selectors above, it would be good
// to extract this.
const selectShowEditMuteError = state => selectIsMuted(state) && (isHost(state) || selectIsAdmin(state));
const selectShowProjectMuteError = state => selectIsMuted(state) &&
    (selectIsAdmin(state) ||
    isManager(state) ||
    isCurator(state) ||
    (selectIsSocial(state) && state.studio.openToAll));
const selectShowCuratorMuteError = state => selectIsMuted(state) && (isManager(state) || selectIsAdmin(state));
const selectShowCommentsGloballyOffError = state =>
    selectHasFetchedSession(state) && !selectStudioCommentsGloballyEnabled(state);
const selectShowCommentsList = state => selectHasFetchedSession(state) && selectStudioCommentsGloballyEnabled(state);
export {
    selectCanEditInfo,
    selectCanAddProjects,
    selectCanFollowStudio,
    selectShowCommentComposer,
    selectCanDeleteComment,
    selectCanDeleteCommentWithoutConfirm,
    selectCanReportComment,
    selectCanRestoreComment,
    selectCanEditCommentsAllowed,
    selectCanEditOpenToAll,
    selectShowCuratorInvite,
    selectCanInviteCurators,
    selectCanRemoveCurator,
    selectCanRemoveManager,
    selectCanPromoteCurators,
    selectCanTransfer,
    selectCanRemoveProject,
    selectShowCommentsList,
    selectShowCommentsGloballyOffError,
    selectShowEditMuteError,
    selectShowProjectMuteError,
    selectShowCuratorMuteError
};
