import InfiniteList from '../../../redux/infinite-list';

const projects = InfiniteList('projects');
const curators = InfiniteList('curators');
const managers = InfiniteList('managers');
const activity = InfiniteList('activity');

export {
    projects, curators, managers, activity
};
