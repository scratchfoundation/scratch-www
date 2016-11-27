module.exports = {
    before : function (client) {
        this.splash = client.page.splashPage();
        this.splash.navigate();
    },
    'When you click Create, you should be redirected to the URL for the editor': function () {
        var expectedHref = '/projects/editor/?tip_bar=home';
        this.splash.assert.title('Scratch - Imagine, Program, Share')
            .assert.visible('@createLink')
            .assert.attributeEquals('@createLink', 'href', this.client.launchUrl + expectedHref);
    },
    'Explore should take you to the Explore page': function () {
        var expectedHref = '/explore/projects/all';
        this.splash.assert.visible('@exploreLink')
            .assert.attributeEquals('@exploreLink', 'href', this.client.launchUrl + expectedHref);
    },
    'Discuss should take you to the Forums': function () {
        var expectedHref = '/discuss';
        this.splash.assert.visible('@discussLink')
            .assert.attributeEquals('@discussLink', 'href', this.client.launchUrl + expectedHref);
    },
    after : function (client) {
        client.end();
    }
};
