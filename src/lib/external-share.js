module.exports = {};

module.exports.embedHtml = projectId => {
    return (
        '<iframe allowtransparency="true" width="485" height="402" ' +
        `src="//scratch.mit.edu/projects/${projectId}/embed?autostart=false" ` +
        'frameborder="0" allowfullscreen></iframe>'
    );
};

module.exports.twitterIntentLink = projectId => {
    const baseUrl = 'https://twitter.com/intent/tweet?';
    const escapedScratchUrl = `https%3A%2F%2Fscratch.mit.edu%2Fprojects%2F${projectId}`;
    const escapedTweetText = 'Check%20out%20what%20you%20can%20make%20on%20Scratch%3A';
    const escapedHashtags = 'creativecode';
    return `${baseUrl}url=${escapedScratchUrl}&text=${escapedTweetText}&hashtags=${escapedHashtags}`;
};

module.exports.facebookIntentLink = projectId => {
    const baseUrl = 'https://www.facebook.com/sharer.php?';
    const escapedScratchUrl = `https%3A%2F%2Fscratch.mit.edu%2Fprojects%2F${projectId}`;
    return `${baseUrl}u=${escapedScratchUrl}`;
};

// needs fb app id
module.exports.facebookIntentDialog = (scratchFBAppId, projectId) => {
    const baseUrl = 'https://www.facebook.com/dialog/share?';
    const escapedScratchUrl = `https%3A%2F%2Fscratch.mit.edu%2Fprojects%2F${projectId}`;
    const escapedHashtag = '%23creativecode';
    return `${baseUrl}app_id=${scratchFBAppId}href=${escapedScratchUrl}&hashtag=${escapedHashtag}`;
};

module.exports.googleClassroomIntentLink = projectId => {
    const baseUrl = 'https://classroom.google.com/share?';
    const escapedScratchUrl = `https%3A%2F%2Fscratch.mit.edu%2Fprojects%2F${projectId}`;
    return (`${baseUrl}url=${escapedScratchUrl}`);
};
