module.exports = {};

module.exports.projectUrl = projectId => {
    if (projectId) {
        return `https://scratch.mit.edu/projects/${projectId}`;
    }
    return '';
};

module.exports.embedHtml = projectId => {
    if (projectId) {
        return `<iframe src="https://scratch.mit.edu/projects/${projectId}/embed" ` +
            'allowtransparency="true" width="485" height="402" ' +
            'frameborder="0" scrolling="no" allowfullscreen></iframe>';
    }
    return '';
};
