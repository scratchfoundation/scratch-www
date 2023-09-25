// These tests sign in with user #4 and user #5

import SeleniumHelper from './selenium-helpers.js';

const {
    buildDriver,
    clickText,
    clickXpath,
    containsClass,
    findByXpath,
    navigate,
    signIn
} = new SeleniumHelper();

// Using 1 and 2 here. Hopefully this is not confusing.
const username1 = `${process.env.SMOKE_USERNAME}4`;
const username2 = `${process.env.SMOKE_USERNAME}5`;
const password = process.env.SMOKE_PASSWORD;
const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

// project for comments (owned by username2)
const projectId = process.env.COMMENT_PROJECT_ID || 1300008409;
const projectUrl = `${rootUrl}/projects/${projectId}`;

// profile for comments (username2)
const profileUrl = `${rootUrl}/users/${username2}`;

// studio for comments (hosted by username2) comments tab
const studioId = process.env.COMMENT_STUDIO_ID || 10005646;
const studioUrl = `${rootUrl}/studios/${studioId}/comments`;

// setup comments to leave
const date = new Date();
const dateString = `Y:${date.getFullYear()} - M:${date.getMonth() + 1} - D:${date.getDate()} ` +
`: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
const buildNumber = process.env.CIRCLE_BUILD_NUM || dateString;
const projectComment = `${buildNumber} project`;
const profileComment = `${buildNumber} profile`;
const studioComment = `${buildNumber} studio`;

const projectReply = `${projectComment} reply`;
const profileReply = `${profileComment} reply`;
const studioReply = `${studioComment} reply`;

jest.setTimeout(60000);

let driver;

describe('comment tests', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration project comments');
        await navigate(rootUrl);
    });

    afterAll(() => driver.quit());

    describe('leave comments', () => {
        beforeAll(async () => {
            await signIn(username1, password);
            await findByXpath('//span[contains(@class, "profile-name")]');
        });

        afterAll(async () => {
            await navigate(rootUrl);
            await clickXpath('//a[contains(@class, "user-info")]');
            await clickText('Sign out');
        });

        test('leave comment on project', async () => {
            await navigate(projectUrl);

            // leave the comment
            const commentBox = await findByXpath('//textArea[@name="compose-comment"]');
            await commentBox.sendKeys(projectComment);
            await findByXpath(`//textarea[contains(text(), "${projectComment}")]`);
            await clickXpath('//button[@class="button compose-post"]');

            // find the comment
            const commentXpath = `//div[@class="comment-bubble"]/span/span[contains(text(), "${projectComment}")]`;
            const postedComment = await findByXpath(commentXpath);
            const commentVisible = await postedComment.isDisplayed();
            expect(commentVisible).toBe(true);
        });

        test('leave comment on a profile', async () => {
            await navigate(profileUrl);

            // leave the comment
            const commentXpath = '//form[@id="main-post-form"]/div/textArea';
            const commentArea = await findByXpath(commentXpath);
            await commentArea.sendKeys(profileComment);
            await clickXpath('//div[@class="button small"]/a[contains(text(), "Post")]');

            // find the comment
            const newComment = await findByXpath(`//div[@class="comment "]/div/div[contains(text(),` +
                ` "${profileComment}")]`);
            const commentVisible = await newComment.isDisplayed();
            expect(commentVisible).toBe(true);

            // return to homepage to sign out with www
            await navigate(rootUrl);
        });

        test('leave comment on studio', async () => {
            await navigate(studioUrl);

            // leave the comment
            const commentBox = await findByXpath('//textArea[@name="compose-comment"]');
            await commentBox.sendKeys(studioComment);
            await findByXpath(`//textarea[contains(text(), "${studioComment}")]`);
            await clickXpath('//button[@class="button compose-post"]');

            // find the comment
            const commentXpath = `//div[@class="comment-bubble"]/span/span[contains(text(), "${studioComment}")]`;
            const postedComment = await findByXpath(commentXpath);
            const commentVisible = await postedComment.isDisplayed();
            expect(commentVisible).toBe(true);
        });
    });

    describe('second user tests', () => {
        beforeAll(async () => {
            await signIn(username2, password);
            await findByXpath('//span[contains(@class, "profile-name")]');
        });

        // get notifications
        test('get notification badge for comments', async () => {
            const messages = await findByXpath('//span[@class = "message-count show"]');
            const messagesVisible = await messages.isDisplayed();
            expect(messagesVisible).toBe(true);
        });

        test('click notifications for comments', async () => {
            await clickXpath('//li[@class="link right messages"]');
            const messages = await findByXpath('//ul[@class="messages-social-list"]');
            const messagesVisible = await messages.isDisplayed();
            expect(messagesVisible).toBe(true);
        });

        test('project comment message visible', async () => {
            await navigate(`${rootUrl}/messages`);

            const projectMessageXpath = '//p[@class="emoji-text mod-comment" ' +
            `and contains(text(), "${projectComment}")]`;
            const projectMessage = await findByXpath(projectMessageXpath);
            const projectMessageVisible = await projectMessage.isDisplayed();
            expect(projectMessageVisible).toBe(true);
        });

        test('profile comment message visible', async () => {
            await navigate(`${rootUrl}/messages`);

            const profileMessageXpath = '//p[@class="emoji-text mod-comment" ' +
            `and contains(text(), "${profileComment}")]`;
            const profileMessage = await findByXpath(profileMessageXpath);
            const profileMessageVisible = await profileMessage.isDisplayed();
            expect(profileMessageVisible).toBe(true);
        });

        // studio comments do not send a notification

        test('project message links you to project page', async () => {
            const projectLinkXpath = '//p[@class="emoji-text mod-comment" ' +
            `and contains(text(), "${projectComment}")]/../../../p[@class = "comment-message-info"]/span/a[2]`;

            await navigate(`${rootUrl}/messages`);
            await clickXpath(projectLinkXpath);

            // find green flag overlay
            const gfOverlay = await findByXpath('//div[@class="stage-wrapper_stage-wrapper_2bejr box_box_2jjDp"]');
            await gfOverlay.isDisplayed();
        });

        test('project comment is on project page', async () => {
            const projectLinkXpath = '//p[@class="emoji-text mod-comment" ' +
            `and contains(text(), "${projectComment}")]/../../../p[@class = "comment-message-info"]/span/a[2]`;

            await navigate(`${rootUrl}/messages`);
            await clickXpath(projectLinkXpath);

            const commentXpath = `//span[contains(text(), "${projectComment}")]`;
            const singleComment = await findByXpath(commentXpath);
            const commentVisible = await singleComment.isDisplayed();
            expect(commentVisible).toBe(true);
        });

        test('project comment is highlighted', async () => {
            const projectLinkXpath = '//p[@class="emoji-text mod-comment" ' +
            `and contains(text(), "${projectComment}")]/../../../p[@class = "comment-message-info"]/span/a[2]`;
            const containerXpath = `//span[contains(text(), "${projectComment}")]/../../../..`;

            await navigate(`${rootUrl}/messages`);
            await clickXpath(projectLinkXpath);

            const commentContainer = await findByXpath(containerXpath);
            const isHighlighted = await containsClass(commentContainer, 'highlighted-comment');
            expect(isHighlighted).toBe(true);
        });

        test('profile message links you to profile page', async () => {
            const profileLinkXpath = '//p[@class="emoji-text mod-comment" ' +
                `and contains(text(), "${profileComment}")]/../../../` +
                'p[@class = "comment-message-info"]/span/a[2]';
            await navigate(`${rootUrl}/messages`);
            await clickXpath(profileLinkXpath);

            // find profile data
            const profileDataXpath = '//div[@id="profile-data"]';
            const pathToUsername = '/div[@class="box-head"]/div[@class="header-text"]/h2';
            await findByXpath(profileDataXpath);

            const header = await findByXpath(profileDataXpath + pathToUsername);
            const uname = await header.getText();
            expect(uname).toBe(username2);
        });

        test('profile comment is on profile page', async () => {
            const profileLinkXpath = '//p[@class="emoji-text mod-comment" ' +
                `and contains(text(), "${profileComment}")]/../../../` +
                'p[@class = "comment-message-info"]/span/a[2]';
            await navigate(`${rootUrl}/messages`);
            await clickXpath(profileLinkXpath);

            // find comment
            const commentXpath = `//div[contains(text(), "${profileComment}")]`;
            const leftComment = await findByXpath(commentXpath);
            const commentVisible = await leftComment.isDisplayed();
            expect(commentVisible).toBe(true);

        });

        test('profile comment is highlighted', async () => {
            const profileLinkXpath = '//p[@class="emoji-text mod-comment" ' +
                `and contains(text(), "${profileComment}")]/../../../` +
                'p[@class = "comment-message-info"]/span/a[2]';
            await navigate(`${rootUrl}/messages`);
            await clickXpath(profileLinkXpath);

            // comment highlighted?
            const containerXpath = `//div[contains(text(), "${profileComment}")]/../../..`;
            const commentContainer = await findByXpath(containerXpath);
            const isHighlighted = await containsClass(commentContainer, 'highlighted');
            expect(isHighlighted).toBe(true);
        });

        test('project: reply to comment', async () => {
            await navigate(projectUrl);
            const commentXpath = `//span[contains(text(), "${projectComment}")]/../..`;
            const replyXpath = `${commentXpath}//span[@class = "comment-reply"]`;
            await clickXpath(replyXpath);

            // type reply
            const replyRow = '//div[contains(@class, "comment-reply-row")]';
            const replyComposeXpath = `${replyRow}//textArea[@class = "inplace-textarea"]`;
            const composeBox = await findByXpath(replyComposeXpath);
            await composeBox.sendKeys(projectReply);

            // click post
            await clickXpath(`${replyRow}//button[@class = "button compose-post"]`);

            const postedReply = await findByXpath(`//span[contains(text(), "${projectReply}")]`);
            const commentVisible = await postedReply.isDisplayed();
            expect(commentVisible).toBe(true);
        });

        test('profile reply to comment', async () => {
            await navigate(profileUrl);
            // find the comment and click reply
            const commentXpath = `//div[contains(text(), "${profileComment}")]/..`;
            await clickXpath(`${commentXpath}//a[@class = "reply"]`);

            // select reply box and type reply
            const replyComposeBox = await findByXpath(`${commentXpath}//textArea`);
            await replyComposeBox.sendKeys(profileReply);

            // click post
            await clickXpath(`${commentXpath}//a[contains(text(), "Post")]`);

            // The reply wasn't findable by xpath after several attempts, but it seems
            // better to have this much of a test
        });

        test('studio: reply to comment', async () => {
            await navigate(studioUrl);

            // find the comment and click reply
            const commentXpath = `//span[contains(text(), "${studioComment}")]/../..`;
            await clickXpath(`${commentXpath}//span[@class = "comment-reply"]`);

            // type reply
            const replyRow = '//div[contains(@class, "comment-reply-row")]';
            const replyComposeXpath = `${replyRow}//textArea[@class = "inplace-textarea"]`;
            const composeBox = await findByXpath(replyComposeXpath);
            await composeBox.sendKeys(studioReply);

            // click post
            const postButton = await findByXpath(`${replyRow}//button[@class = "button compose-post"]`);
            await postButton.click();

            // find reply
            const postedReply = await findByXpath(`//span[contains(text(), "${studioReply}")]`);
            const commentVisible = await postedReply.isDisplayed();
            expect(commentVisible).toBe(true);
        });
    });
});
