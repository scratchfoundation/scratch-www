// If you need to update links, make sure to check these files, too:
// - webpack.config.js
// - bin/get-localized-urls
// - src/routes.json
// - JSON and Markdown files in general
// Please add a link here only if it's useful for more than a short time and for more than one page or component.

const externalLinks = /** @type {const} */ {
    allAboutCookies: {
        manageCookies: 'https://www.allaboutcookies.org/manage-cookies'
    },
    apple: {
        checkMacVersion: 'https://support.apple.com/en-us/HT201260'
    },
    cartoonNetwork: {
        homepage: 'https://www.cartoonnetwork.com/'
    },
    creativeCommons: {
        ccBySa2: 'https://creativecommons.org/licenses/by-sa/2.0/deed.en'
    },
    edutopia: {
        creativeLearningApproach: 'https://www.edutopia.org/kindergarten-creativity-collaboration-lifelong-learning'
    },
    epam: {
        homepage: 'https://www.epam.com/'
    },
    google: {
        analyticsOptOut: 'https://tools.google.com/dlpage/gaoptout',
        blockly: 'https://developers.google.com/blockly',
        csFirst: 'https://g.co/csfirst',
        homepage: 'https://www.google.com/',
        partnerPrivacy: 'https://www.google.com/policies/privacy/partners',
        privacyPolicy: 'https://policies.google.com/privacy'
    },
    hgse: {
        creativeComputingCurriculum: 'https://creativecomputing.gse.harvard.edu/guide/',
        creativeComputingLab: 'https://creativecomputing.gse.harvard.edu/',
        scratchEd: 'https://scratched.gse.harvard.edu/',
        teachingWithScratchGroup: 'https://www.facebook.com/groups/TeachingwithScratch'
    },
    intel: {
        homepage: 'https://www.intel.com/content/www/us/en/homepage.html'
    },
    lego: {
        foundation: 'https://www.legofoundation.com/'
    },
    llk: {
        book: 'https://mitpress.mit.edu/books/lifelong-kindergarten',
        codingAtACrossroads: 'https://cacm.acm.org/magazines/2020/11/248219-coding-at-a-crossroads/fulltext',
        homepage: 'https://www.media.mit.edu/groups/lifelong-kindergarten/overview/',
        letsTeachKidsToCode: 'https://www.ted.com/talks/mitch_resnick_let_s_teach_kids_to_code'
    },
    microbit: {
        homepage: 'https://microbit.org/'
    },
    microsoft: {
        checkWindowsVersion: 'https://support.microsoft.com/en-us/help/13443/windows-which-operating-system'
    },
    mit: {
        accessibility: 'https://accessibility.mit.edu/',
        mediaLab: 'https://media.mit.edu/',
        odl: 'https://odl.mit.edu/'
    },
    noStarchPress: {
        homepage: 'https://www.nostarch.com/'
    },
    // If you start to add a link to 'https://scratch.mit.edu/...',
    // consider whether it should use a relative URL.
    scratch: {
        blog: 'https://medium.com/scratchteam-blog',
        bugsForum: 'https://scratch.mit.edu/discuss/3/',
        communityGuide: 'https://resources.scratch.mit.edu/www/guides/en/scratch-community-guide.pdf',
        day: 'https://day.scratch.mit.edu/',
        facebook: 'https://www.facebook.com/scratchteam',
        gettingStartedGuide_Scratch2: 'https://cdn.scratch.mit.edu/scratchr2/static/__edf64cc2d5d5da51528c169e65053195__//pdfs/help/Getting-Started-Guide-Scratch2.pdf',
        googlePlay: 'https://play.google.com/store/apps/details?id=org.scratch',
        guideForTranslators: 'https://github.com/scratchfoundation/scratch-l10n/wiki/Guide-for-Scratch-Translators',
        helpEmail: 'help@scratch.mit.edu',
        instagram: 'https://www.instagram.com/mitscratchteam/',
        legoEv3Video: 'https://scratch.wistia.com/medias/0huu6wfiki',
        legoWeDo2Video: 'https://scratch.wistia.com/medias/4im7iizv47',
        sip: 'https://sip.scratch.mit.edu/',
        scratchAtHome: 'https://sip.scratch.mit.edu/scratchathome/',
        sourceCode: 'https://github.com/scratchfoundation/',
        sourceCode_14: 'https://github.com/scratchfoundation/Scratch_1.4',
        sourceCode_20: 'https://github.com/scratchfoundation/scratch-flash',
        sourceCodeBlocks: 'https://github.com/scratchfoundation/scratch-blocks',
        sourceCodeEditor: 'https://github.com/scratchfoundation/scratch-editor',
        sourceCodeWeb: 'https://github.com/scratchfoundation/scratch-www',
        teacherAccountsGuide: 'https://resources.scratch.mit.edu/www/guides/en/scratch-teacher-accounts-guide.pdf',
        teacherAccountsVideo: 'https://www.youtube.com/embed/7Hl9GxA1zwQ',
        teacherTipsSignup: 'https://eepurl.com/cws7_f',
        translateEditor: 'https://app.transifex.com/llk/scratch-editor/',
        translateEmail: 'translate@scratch.mit.edu',
        twitter: 'https://twitter.com/scratch',
        youTube: 'https://www.youtube.com/@ScratchTeam'
    },
    scratchApp: {
        downloadMSI: 'https://scratchfoundation.github.io/scratch-msi/',
        downloadMacDirect: 'https://downloads.scratch.mit.edu/desktop/Scratch.dmg',
        downloadMacStore: 'https://apps.apple.com/us/app/scratch-desktop/id1446785996?mt=12',
        downloadWindowsDirect: 'https://downloads.scratch.mit.edu/desktop/Scratch%20Setup.exe',
        downloadWindowsStore: 'https://www.microsoft.com/store/apps/9pfgj25jl6x3?cid=storebadge&ocid=badge'
    },
    scratchFoundation: {
        annualReport: 'https://www.scratchfoundation.org/annualreport',
        careers: 'https://www.scratchfoundation.org/careers',
        donate: 'https://www.scratchfoundation.org/donate',
        dsa: 'https://www.scratchfoundation.org/dsa/',
        educatorResources: 'https://www.scratchfoundation.org/learn/learning-library?audiences=Educators%20and%20Facilitators',
        events: 'https://www.scratchfoundation.org/get-involved/events-calendar',
        forEducators: 'https://www.scratchfoundation.org/learn/for-educators',
        forFamilies: 'https://www.scratchfoundation.org/learn/for-families',
        helpCenter: 'https://mitscratch.freshdesk.com/en/support/home',
        homepage: 'https://www.scratchfoundation.org/',
        impact: 'https://www.scratchfoundation.org/impact',
        scratchConference: 'https://www.scratchfoundation.org/scratch-conference',
        shop: 'https://scratch-foundation.myshopify.com/',
        supporters: 'https://www.scratchfoundation.org/supporters'
    },
    scratchLink: {
        downloadMacDirect: 'https://downloads.scratch.mit.edu/link/mac.zip',
        downloadMacStore: 'https://itunes.apple.com/us/app/scratch-link/id1408863490',
        downloadWindowsDirect: 'https://downloads.scratch.mit.edu/link/windows.zip',
        downloadWindowsStore: 'https://www.microsoft.com/store/productId/9N48XLLCZH0X'
    },
    scratchWiki: {
        translators: 'https://en.scratch-wiki.info/wiki/Translators'
    },
    siegelFamilyEndowment: {
        homepage: 'https://www.siegelendowment.org/'
    },
    scratchJr: {
        homepage: 'https://www.scratchjr.org/',
        sourceCode: 'https://github.com/scratchfoundation/scratchjr'
    },
    wistia: {
        privacyPolicy: 'https://wistia.com/privacy'
    }
};

module.exports = externalLinks;
