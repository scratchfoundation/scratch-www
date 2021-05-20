import { false } from 'tap';

const {selectUserId, selectIsAdmin, selectIsSocial,
    selectIsLoggedIn, selectUsername, selectIsMuted} = require('./session');

// Fine-grain selector helpers - not exported, use the higher level selectors below
const isCreator = state => selectUserId(state) === state.studio.owner;
const isCurator = state => state.studio.curator;
const isManager = state => state.studio.manager || isCreator(state);

// Action-based permissions selectors
const selectCanEditInfo = state => !selectIsMuted(state) && (selectIsAdmin(state) || isManager(state));
const selectCanAddProjects = state =>
    !selectIsMuted(state) &&
    (isManager(state) ||
    isCurator(state) ||
    (selectIsSocial(state) && state.studio.openToAll));

// This isn't "canComment" since they could be muted, but comment composer handles that
const selectShowCommentComposer = state => selectIsSocial(state);

const selectCanReportComment = state => selectIsSocial(state);
const selectCanRestoreComment = state => selectIsAdmin(state);
// On the project page, project owners can delete comments with a confirmation,
// and admins can delete comments without a confirmation. For now, only admins
// can delete studio comments, so the following two are the same.
const selectCanDeleteComment = state => selectIsAdmin(state);
const selectCanDeleteCommentWithoutConfirm = state => selectIsAdmin(state);

const selectCanFollowStudio = state => selectIsLoggedIn(state);

// Matching existing behavior, only admin/creator is allowed to toggle comments.
const selectCanEditCommentsAllowed = state => !selectIsMuted(state) && (selectIsAdmin(state) || isCreator(state));
const selectCanEditOpenToAll = state => !selectIsMuted(state) && isManager(state);

const selectShowCuratorInvite = state => !selectIsMuted(state) && !!state.studio.invited;
const selectCanInviteCurators = state => !selectIsMuted(state) && isManager(state);
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
    !selectIsMuted(state) && (selectIsAdmin(state) || isManager(state)) && managerId !== state.studio.owner;
const selectCanPromoteCurators = state => !selectIsMuted(state) && isManager(state);

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

const selectShowEditMuteError = state => selectIsMuted(state) && (isManager(state) || selectIsAdmin(state));
const selectShowProjectMuteError = state => selectIsMuted(state) &&
    (selectIsAdmin(state) ||
    isManager(state) ||
    isCurator(state) ||
    (selectIsSocial(state) && state.studio.openToAll));
const selectShowCuratorMuteError = state => selectIsMuted(state) && (isManager(state) || selectIsAdmin(state));

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
    selectCanRemoveProject,
    selectShowEditMuteError,
    selectShowProjectMuteError,
    selectShowCuratorMuteError
};
