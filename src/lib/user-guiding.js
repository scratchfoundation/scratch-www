const api = require('./api');
const sample = require('lodash.sample');

const USER_GUIDING_ID = process.env.USER_GUIDING_ID;
const AUTONOMY_SURVEY_ID = 3677;
const RELATIONSHIP_SURVEY_ID = 3678;
const JOY_SURVEY_ID = 3679;
const COMPETENCE_SURVEY_ID = 3676;
const EDITOR_INTERACTION_SURVEY_IDS = [COMPETENCE_SURVEY_ID, JOY_SURVEY_ID];

const CONDITIONS = {condition_list: [
    'IsLoggedIn',
    'NotAdmin',
    'NotMuted'
]};

const USER_GUIDING_SNIPPET = `
    (function(g, u, i, d, e, s) {
        g[e] = g[e] || [];
        var f = u.getElementsByTagName(i)[0];
        var k = u.createElement(i);
        k.async = true;
        k.src = 'https://static.userguiding.com/media/user-guiding-' + s + '-embedded.js';
        f.parentNode.insertBefore(k, f);
        if (g[d]) return;
        var ug = g[d] = {
            q: []
        };
        ug.c = function(n) {
            return function() {
                ug.q.push([n, arguments])
            };
        };
        var m = ['previewGuide', 'finishPreview', 'track', 'identify', 'hideChecklist', 'launchChecklist'];
        for (var j = 0; j < m.length; j += 1) {
            ug[m[j]] = ug.c(m[j]);
        }
    })(window, document, 'script', 'userGuiding', 'userGuidingLayer', '${USER_GUIDING_ID}');
`;

const activateUserGuiding = (userId, callback) => {
    if (window.userGuiding) {
        callback();
        return;
    }

    const userGuidingScript = document.createElement('script');
    userGuidingScript.innerHTML = USER_GUIDING_SNIPPET;
    document.head.insertBefore(userGuidingScript, document.head.firstChild);

    window.userGuidingSettings = {disablePageViewAutoCapture: true};

    window.userGuidingLayer.push({
        event: 'onload',
        fn: () => window.userGuiding.identify(userId.toString())
    });

    window.userGuidingLayer.push({
        event: 'onIdentificationComplete',
        fn: callback
    });
};

const attemptDisplayUserGuidingSurvey = (userId, permissions, guideId, callback) => {
    if (!USER_GUIDING_ID || !process.env.SORTING_HAT_HOST) {
        return;
    }

    api({
        uri: '/user_guiding',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-USERID': userId,
            'X-PERMISSIONS': JSON.stringify(permissions),
            'X-CONDITIONS': JSON.stringify(CONDITIONS),
            'X-QUESTION-NUMBER': guideId
        },
        host: process.env.SORTING_HAT_HOST
    }, (err, body, res) => {
        if (err || res.statusCode !== 200) {
            return;
        }

        if (body?.result === 'true') {
            activateUserGuiding(userId, callback);
        }
    });
};

const onCommented = (userId, permissions) => {
    attemptDisplayUserGuidingSurvey(
        userId,
        permissions,
        AUTONOMY_SURVEY_ID,
        () => window.userGuiding.launchSurvey(AUTONOMY_SURVEY_ID)
    );
};

const onProjectShared = (userId, permissions) => {
    attemptDisplayUserGuidingSurvey(
        userId,
        permissions,
        RELATIONSHIP_SURVEY_ID,
        () => window.userGuiding.launchSurvey(RELATIONSHIP_SURVEY_ID)
    );
};

const onProjectLoaded = (userId, permissions) => {
    const surveyId = sample(EDITOR_INTERACTION_SURVEY_IDS);

    attemptDisplayUserGuidingSurvey(
        userId,
        permissions,
        surveyId,
        () => window.userGuiding.launchSurvey(surveyId)
    );
};

module.exports = {
    onProjectLoaded,
    onCommented,
    onProjectShared
};
