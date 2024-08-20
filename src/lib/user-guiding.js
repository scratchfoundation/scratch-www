const api = require('./api');

const USER_GUIDING_ID = process.env.USER_GUIDING_ID;
const SCRIPT_ID = 'UserGuiding';

const CONDITIONS = {condition_list: [
    'IsLoggedIn',
    'NotAdmin',
    'NotMuted'
]};

const getUserGuidingSnippet = () => (
    `
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
    `
);

const identifyUser = userId => {
    window.userGuiding.identify(userId.toString());
};

const launchSurvey = surveyId => {
    window.userGuiding.launchSurvey(surveyId);
};

const probabilityPicker = data => {
    let generatedValue = Math.random();

    for (const tmp of data) {
        if (tmp.probability < generatedValue) {
            generatedValue -= tmp.probability;
        } else {
            return tmp.prompt;
        }
    }
};

const activateUserGuiding = (userId, callback) => {
    if (USER_GUIDING_ID && !document.getElementById(SCRIPT_ID)) {
        const userGuidingScript = document.createElement('script');
        userGuidingScript.id = SCRIPT_ID;
        userGuidingScript.innerHTML = getUserGuidingSnippet();
        document.head.insertBefore(userGuidingScript, document.head.firstChild);

        window.userGuidingSettings = {
            disablePageViewAutoCapture: true
        };

        window.userGuidingLayer.push({
            event: 'onload',
            fn: () => identifyUser(userId)
        });

        window.userGuidingLayer.push({
            event: 'onIdentificationComplete',
            fn: callback
        });
    } else if (window.userGuiding) {
        callback();
    }
};

const displayUserGuiding = (userId, permissions, guideId, callback) => (
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

        const {result} = JSON.stringify(body);
        if (result) {
            activateUserGuiding(userId, callback);
        }
    })
);

const loadCompetenceSurvey = (userId, permissions) => {
    const COMPETENCE_SURVEY_ID = 3045;

    displayUserGuiding(
        userId,
        permissions,
        COMPETENCE_SURVEY_ID,
        () => launchSurvey(COMPETENCE_SURVEY_ID)
    );
};

const loadAutonomySurvey = (userId, permissions) => {
    const AUTONOMY_SURVEY_ID = 3048;

    displayUserGuiding(
        userId,
        permissions,
        AUTONOMY_SURVEY_ID,
        () => launchSurvey(AUTONOMY_SURVEY_ID)
    );
};

const loadRelationshipsSurvey = (userId, permissions) => {
    const RELATIONSHIP_SURVEY_ID = 3049;

    displayUserGuiding(
        userId,
        permissions,
        RELATIONSHIP_SURVEY_ID,
        () => launchSurvey(RELATIONSHIP_SURVEY_ID)
    );
};

const loadJoySurvey = (userId, permissions) => {
    const JOY_SURVEY_ID = 3050;

    displayUserGuiding(
        userId,
        permissions,
        JOY_SURVEY_ID,
        () => launchSurvey(JOY_SURVEY_ID)
    );
};

const loadRandomPrompt = (userId, permissions, data) => {
    const prompt = probabilityPicker(data);

    prompt(userId, permissions);
};

module.exports = {
    loadCompetenceSurvey,
    loadAutonomySurvey,
    loadRelationshipsSurvey,
    loadJoySurvey,
    loadRandomPrompt
};
