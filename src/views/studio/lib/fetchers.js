const ITEM_LIMIT = 4;

const infoFetcher = studioId => fetch(`${process.env.API_HOST}/studios/${studioId}`)
    .then(d => d.json());

const projectFetcher = (studioId, offset) =>
    fetch(`${process.env.API_HOST}/studios/${studioId}/projects?limit=${ITEM_LIMIT}&offset=${offset}`)
        .then(d => d.json())
        .then(d => ({items: d, moreToLoad: d.length === ITEM_LIMIT}));

const curatorFetcher = (studioId, offset) =>
    fetch(`${process.env.API_HOST}/studios/${studioId}/curators?limit=${ITEM_LIMIT}&offset=${offset}`)
        .then(d => d.json())
        .then(d => ({items: d, moreToLoad: d.length === ITEM_LIMIT}));

const managerFetcher = (studioId, offset) =>
    fetch(`${process.env.API_HOST}/studios/${studioId}/managers?limit=${ITEM_LIMIT}&offset=${offset}`)
        .then(d => d.json())
        .then(d => ({items: d, moreToLoad: d.length === ITEM_LIMIT}));

const activityFetcher = studioId =>
    fetch(`${process.env.API_HOST}/studios/${studioId}/activity`)
        .then(d => d.json())
        .then(d => ({items: d, moreToLoad: false})); // No pagination on the activity feed

export {
    activityFetcher,
    infoFetcher,
    projectFetcher,
    curatorFetcher,
    managerFetcher
};
