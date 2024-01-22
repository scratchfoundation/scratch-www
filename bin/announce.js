// this will announce that a deploy successfully finished into slack

const https = require('https');

const environment = process.env.SCRATCH_ENV || 'unknown environment';

const branch = process.env.CIRCLE_BRANCH || 'unknown branch';

const urlEng = process.env.SLACK_WEBHOOK_ENGINEERING;
const urlMod = process.env.SLACK_WEBHOOK_MODS;
const urlNotifications = process.env.SLACK_WEBHOOK_CIRCLECI_NOTIFICATIONS;

const announcement = {text: `scratch-www has deployed branch ${branch} to ${environment}.`};

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const postMessage = (url, message, channelName) => {
    const data = JSON.stringify(message);
    const req = https.request(url, options, res => {
        console.log(`statusCode: ${res.statusCode}`); // eslint-disable-line no-console
        if (res.statusCode === 200) {
            process.stdout.write(`announced to ${channelName}\n${JSON.stringify(message)}\n`);
        } else {
            process.stdout.write(`FAILED to announce to slack`);
        }
    });

    req.on('error', error => {
        console.error(error); // eslint-disable-line no-console
    });

    req.write(data);
    req.end();
};

postMessage(urlNotifications, announcement, '#circleci-notifications');

if (environment === 'production'){
    postMessage(urlEng, announcement, '#engineering');
    postMessage(urlMod, announcement, '#scratch-mods');
}
