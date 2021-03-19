const ITEM_LIMIT = 4;

const projectFetcher = (studioId, offset) =>
    fetch(`${process.env.API_HOST}/studios/${studioId}/projects?limit=${ITEM_LIMIT}&offset=${offset}`)
        .then(response => response.json())
        .then(data => ({items: data, moreToLoad: data.length === ITEM_LIMIT}));

const curatorFetcher = (studioId, offset) =>
    fetch(`${process.env.API_HOST}/studios/${studioId}/curators?limit=${ITEM_LIMIT}&offset=${offset}`)
        .then(response => response.json())
        .then(data => ({items: data, moreToLoad: data.length === ITEM_LIMIT}));

const managerFetcher = (studioId, offset) =>
    fetch(`${process.env.API_HOST}/studios/${studioId}/managers?limit=${ITEM_LIMIT}&offset=${offset}`)
        .then(response => response.json())
        .then(data => ({items: data, moreToLoad: data.length === ITEM_LIMIT}));

const activityFetcher = studioId =>
    fetch(`${process.env.API_HOST}/studios/${studioId}/activity`)
        .then(response => response.json())
        .then(data => ({items: data, moreToLoad: false})); // No pagination on the activity feed

export {
    activityFetcher,
    projectFetcher,
    curatorFetcher,
    managerFetcher
};
