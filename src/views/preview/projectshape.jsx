const PropTypes = require('prop-types');

const {
    number,
    string,
    shape
} = PropTypes;

export const projectShape = shape({
    id: number,
    instructions: string,
    title: string,
    description: string,
    author: shape({
        id: number,
        username: string
    }),
    image: string,
    history: shape({
        created: string,
        modified: string,
        shared: string
    }),
    stats: shape({
        views: number,
        loves: number,
        favorites: number,
        comments: number,
        remixes: number
    }),
    remix: shape({
        parent: number,
        root: number
    })
});
