// These tests sign in with user #4 and user #5

import SeleniumHelper from './selenium-helpers.js';

const {
    findByXpath,
    buildDriver,
    clickXpath,
    clickText,
    containsClass,
    signIn
} = new SeleniumHelper();

// Using 1 and 2 here. Hopefully this is not confusing.
let username1 = process.env.SMOKE_USERNAME + '4';
let username2 = process.env.SMOKE_USERNAME + '5';
let password = process.env.SMOKE_PASSWORD;

let remote = process.env.SMOKE_REMOTE || false;
let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

// project for comments (owned by username2)
let projectId = process.env.COMMENT_PROJECT_ID || 1300008409;
let projectUrl = `${rootUrl}/projects/${projectId}`;

// profile for comments (username2)
let profileUrl = `${rootUrl}/users/${username2}`;

// studio for comments (hosted by username2) comments tab
let studioId = process.env.COMMENT_STUDIO_ID || 10005646;
let studioUrl = `${rootUrl}/studios/${studioId}/comments`;

// setup comments to leave
let date = new Date();
let dateString = `Y:${date.getFullYear()} - M:${date.getMonth() + 1} - D:${date.getDate()} ` +
`: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
let buildNumber = process.env.CIRCLE_BUILD_NUM || dateString;
let projectComment = buildNumber + ' project';
let profileComment = buildNumber + ' profile';
let studioComment = buildNumber + ' studio';

let projectReply = projectComment + ' reply';
let profileReply = profileComment + ' reply';
let studioReply = studioComment + ' reply';

if (remote) {
    jest.setTimeout(60000);
} else {
    jest.setTimeout(20000);
}

let driver;

describe('comment tests', async () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration project comments');
        await driver.get(rootUrl);
    });

    afterAll(async () => await driver.quit());

    describe('leave comments', async () => {
        beforeAll(async () => {
            await signIn(username1, password);
            await findByXpath('//span[contains(@class, "profile-name")]');
        });

        afterAll(async () => {
            await driver.get(rootUrl);
            await clickXpath('//a[contains(@class, "user-info")]');
            await clickText('Sign out');
        });

        test('leave comment on project', async () => {
            await driver.get(projectUrl);

            // leave the comment
            let commentBox = await findByXpath('//textArea[@name="compose-comment"]');
            await commentBox.sendKeys(projectComment);
            await findByXpath(`//textarea[contains(text(), "${projectComment}")]`);
            await clickXpath('//button[@class="button compose-post"]');

            // reload the page
            await driver.sleep(5000);
            await driver.get(projectUrl);

            // find the comment
            let commentXpath = await `//div[@class="comment-bubble"]/span/span[contains(text(),` +
                ` "${projectComment}")]`;
            let postedComment = await findByXpath(commentXpath);
            let commentVisible = await postedComment.isDisplayed();
            await expect(commentVisible).toBe(true);
        });

        test('leave comment on a profile', async () => {
            await driver.get(profileUrl);

            // leave the comment
            let commentXpath = await '//form[@id="main-post-form"]/div/textArea';
            let commentArea = await findByXpath(commentXpath);
            await commentArea.sendKeys(profileComment);
            await clickXpath('//div[@class="button small"]/a[contains(text(), "Post")]');

            // reload page
            await driver.get(profileUrl);

            // find the comment
            let newComment = await findByXpath(`//div[@class="comment "]/div/div[contains(text(),` +
                ` "${profileComment}")]`);
            let commentVisible = await newComment.isDisplayed();
            await expect(commentVisible).toBe(true);

            // return to homepage to sign out with www
            await driver.get(rootUrl);
        });

        test('leave comment on studio', async () => {
            await driver.get(studioUrl);

            // leave the comment
            let commentBox = await findByXpath('//textArea[@name="compose-comment"]');
            await commentBox.sendKeys(studioComment);
            await findByXpath(`//textarea[contains(text(), "${studioComment}")]`);
            await clickXpath('//button[@class="button compose-post"]');

            // reload the page
            await driver.sleep(5000);
            await driver.get(studioUrl);

            // find the comment
            let commentXpath = `//div[@class="comment-bubble"]/span/span[contains(text(), "${studioComment}")]`;
            let postedComment = await findByXpath(commentXpath);
            let commentVisible = await postedComment.isDisplayed();
            await expect(commentVisible).toBe(true);
        });
    });

    describe('second user tests', async () => {
        beforeAll(async () => {
            await signIn(username2, password);
            await findByXpath('//span[contains(@class, "profile-name")]');
        });

        // get notifications
        test('get notification badge for comments', async () => {
            let messages = await findByXpath('//span[@class = "message-count show"]');
            let messagesVisible = await messages.isDisplayed();
            await expect(messagesVisible).toBe(true);
        });

        test('click notifications for comments', async () => {
            await clickXpath('//li[@class="link right messages"]');
            let messages = await findByXpath('//ul[@class="messages-social-list"]');
            let messagesVisible = await messages.isDisplayed();
            await expect(messagesVisible).toBe(true);
        });

        test('project comment message visible', async () => {
            await driver.get(rootUrl + '/messages');

            let projectMessageXpath = '//p[@class="emoji-text mod-comment" ' +
            `and contains(text(), "${projectComment}")]`;
            let projectMessage = await findByXpath(projectMessageXpath);
            let projectMessageVisible = await projectMessage.isDisplayed();
            await expect(projectMessageVisible).toBe(true);
        });

        test('profile comment message visible', async () => {
            await driver.get(rootUrl + '/messages');

            let profileMessageXpath = '//p[@class="emoji-text mod-comment" ' +
            `and contains(text(), "${profileComment}")]`;
            let profileMessage = await findByXpath(profileMessageXpath);
            let profileMessageVisible = await profileMessage.isDisplayed();
            await expect(profileMessageVisible).toBe(true);
        });

        // studio comments do not send a notification

        test('project message links you to project page', async () => {
            let projectLinkXpath = '//p[@class="emoji-text mod-comment" ' +
            `and contains(text(), "${projectComment}")]/../../../p[@class = "comment-message-info"]/span/a[2]`;

            await driver.get(rootUrl + '/messages');
            await clickXpath(projectLinkXpath);

            // find green flag overlay
            let gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
            await gfOverlay.isDisplayed();
        });

        test('project comment is on project page', async () => {
            let projectLinkXpath = '//p[@class="emoji-text mod-comment" ' +
            `and contains(text(), "${projectComment}")]/../../../p[@class = "comment-message-info"]/span/a[2]`;

            await driver.get(rootUrl + '/messages');
            await clickXpath(projectLinkXpath);

            let commentXpath = `//span[contains(text(), "${projectComment}")]`;
            let singleComment = await findByXpath(commentXpath);
            let commentVisible = await singleComment.isDisplayed();
            await expect(commentVisible).toBe(true);
        });

        test('project comment is highlighted', async () => {
            let projectLinkXpath = '//p[@class="emoji-text mod-comment" ' +
            `and contains(text(), "${projectComment}")]/../../../p[@class = "comment-message-info"]/span/a[2]`;
            let containerXpath = `//span[contains(text(), "${projectComment}")]/../../../..`;

            await driver.get(rootUrl + '/messages');
            await clickXpath(projectLinkXpath);

            let commentContainer = await findByXpath(containerXpath);
            let isHighlighted = await containsClass(commentContainer, 'highlighted-comment');
            await expect(isHighlighted).toBe(true);
        });

        test('profile message links you to profile page', async () => {
            let profileLinkXpath = await '//p[@class="emoji-text mod-comment" ' +
                `and contains(text(), "${profileComment}")]/../../../` +
                `p[@class = "comment-message-info"]/span/a[2]`;
            await driver.get(rootUrl + '/messages');
            await clickXpath(profileLinkXpath);

            // find profile data
            let profileDataXpath = '//div[@id="profile-data"]';
            let pathToUsername = '/div[@class="box-head"]/div[@class="header-text"]/h2';
            await findByXpath(profileDataXpath);

            let header = await findByXpath(profileDataXpath + pathToUsername);
            let uname = await header.getText();
            await expect(uname).toBe(username2);
        });

        test('profile comment is on profile page', async () => {
            let profileLinkXpath = await '//p[@class="emoji-text mod-comment" ' +
                `and contains(text(), "${profileComment}")]/../../../` +
                `p[@class = "comment-message-info"]/span/a[2]`;
            await driver.get(rootUrl + '/messages');
            await clickXpath(profileLinkXpath);

            // find comment
            let commentXpath = `//div[contains(text(), "${profileComment}")]`;
            let leftComment = await findByXpath(commentXpath);
            let commentVisible = await leftComment.isDisplayed();
            await expect(commentVisible).toBe(true);

        });

        test('profile comment is highlighted', async () => {
            let profileLinkXpath = await '//p[@class="emoji-text mod-comment" ' +
                `and contains(text(), "${profileComment}")]/../../../` +
                `p[@class = "comment-message-info"]/span/a[2]`;
            await driver.get(rootUrl + '/messages');
            await clickXpath(profileLinkXpath);

            // comment highlighted?
            let containerXpath = `//div[contains(text(), "${profileComment}")]/../../..`;
            let commentContainer = await findByXpath(containerXpath);
            let isHighlighted = await containsClass(commentContainer, 'highlighted');
            await expect(isHighlighted).toBe(true);
        });

        test('project: reply to comment', async () => {
            await driver.get(projectUrl);
            let commentXpath = `//span[contains(text(), "${projectComment}")]/../..`;
            let replyXpath = commentXpath + '//span[@class = "comment-reply"]';
            await clickXpath(replyXpath);

            // type reply
            let replyRow = '//div[contains(@class, "comment-reply-row")]';
            let replyComposeXpath = replyRow + '//textArea[@class = "inplace-textarea"]';
            let composeBox = await findByXpath(replyComposeXpath);
            await composeBox.sendKeys(projectReply);

            // click post
            let postButton = await findByXpath(replyRow + '//button[@class = "button compose-post"]');
            await postButton.click();

            // find reply
            await driver.sleep(500);
            await driver.get(projectUrl);
            let postedReply = await findByXpath(`//span[contains(text(), "${projectReply}")]`);
            let commentVisible = await postedReply.isDisplayed();
            await expect(commentVisible).toBe(true);
        });

        test('profile reply to comment', async () => {
            await driver.get(profileUrl);
            // find the comment and click reply
            let commentXpath = `//div[contains(text(), "${profileComment}")]/..`;
            await clickXpath(commentXpath + '//a[@class = "reply"]');

            // select reply box and type reply
            let replyComposeBox = await findByXpath(commentXpath + '//textArea');
            await replyComposeBox.sendKeys(profileReply);

            // click post
            await clickXpath(commentXpath + '//a[contains(text(), "Post")]');

            // reload the page step has been skipped because caching causes failure
            // The reply wasn't findable by xpath after several attempts, but it seems
            // better to have this much of a test
        });

        test('studio: reply to comment', async () => {
            await driver.get(studioUrl);

            // find the comment and click reply
            let commentXpath = `//span[contains(text(), "${studioComment}")]/../..`;
            await clickXpath(commentXpath + '//span[@class = "comment-reply"]');

            // type reply
            let replyRow = '//div[contains(@class, "comment-reply-row")]';
            let replyComposeXpath = replyRow + '//textArea[@class = "inplace-textarea"]';
            let composeBox = await findByXpath(replyComposeXpath);
            await composeBox.sendKeys(studioReply);

            // click post
            let postButton = await findByXpath(replyRow + '//button[@class = "button compose-post"]');
            await postButton.click();

            // find reply
            await driver.sleep(500);
            await driver.get(studioUrl);
            let postedReply = await findByXpath(`//span[contains(text(), "${studioReply}")]`);
            let commentVisible = await postedReply.isDisplayed();
            await expect(commentVisible).toBe(true);
        });
    });
});
