import InfiniteList from '../../../redux/infinite-list';

const projects = InfiniteList('projects');
const curators = InfiniteList('curators');
const managers = InfiniteList('managers');
const activity = InfiniteList('activity');

const userProjects = InfiniteList('user-projects');

export {
    projects, curators, managers, activity, userProjects
};
