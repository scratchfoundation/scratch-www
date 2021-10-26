// Generate a list of PRs since hte last time we merged to master

const fs = require('fs');

const logParser = require('git-log-parser');

const bodyPrefixesToIgnore = [
    '[Master] release/',
    'Master release/',
    '[Develop] release/',
    'Develop release/',
    'chore(deps):'
];


const gitLogMergesSince = (out, since, until = 'HEAD') => {
    const logStream = logParser.parse({
        since, until
    }, ['--merges']);
    logStream.on('data', commit => {
        const body = commit.body.trim();
        if (!body) return;
        if (bodyPrefixesToIgnore.some(prefix => body.startsWith(prefix))) return;
        const firstLine = body.split('\n')[0];
        const outputText = `* ${firstLine}\n`;
        out.write(outputText);
        process.stdout.write(outputText);
    });
};

const main = () => {
    if (process.argv.length !== 3) {
        // eslint-disable-next-line no-console
        console.error('Usage: node create-changelog.js OUTFILE.md');
        process.exit(1);
    }
    const outName = process.argv[2];
    const outFile = fs.createWriteStream(outName);
    // for now, assume we're in a release branch and comparing against master
    // for debugging, try: gitLogMergesSince(outFile, 'HEAD@{1 year ago}');
    gitLogMergesSince(outFile, 'master');
};

main();
