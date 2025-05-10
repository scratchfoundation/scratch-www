module.exports = (opts, callback) => {
    const url = new URL(`http://dummy.local${opts.uri}`);
    const offset = parseInt(url.searchParams.get('offset'), 10) || 0;
    const limit = parseInt(url.searchParams.get('limit'), 10) || 16;

    const dummyProjects = Array.from({length: limit}).map((_, i) => ({
        id: offset + i,
        title: `Project ${offset + i + 1}`,
        username: `user${offset + i}`,
        thumbnail: `https://picsum.photos/seed/id${offset + i}/200/300`
    }));

    console.log('[api-dev] Returning', dummyProjects);

    setTimeout(() => callback(null, {results: dummyProjects}), 300);
};
