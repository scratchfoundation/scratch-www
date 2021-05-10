// TODO move this to studio-activity-actions, include pagination
const activityFetcher = studioId =>
    fetch(`${process.env.API_HOST}/studios/${studioId}/activity`)
        .then(response => response.json())
        .then(data => ({items: data, moreToLoad: false})); // No pagination on the activity feed

export {
    activityFetcher
};
