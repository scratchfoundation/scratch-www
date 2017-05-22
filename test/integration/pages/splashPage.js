module.exports = {
    url: function () {
        return this.api.launchUrl;
    },
    elements: {
        createLink: {
            selector: 'div#navigation li.create a'
        },
        exploreLink: {
            selector: 'div#navigation li.explore a'
        },
        discussLink: {
            selector: 'div#navigation li.discuss a'
        },
        aboutLink: {
            selector: 'div#navigation li.about a'
        },
        helpLink: {
            selector: 'div#navigation li.help a'
        }
    }
};
