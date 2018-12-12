const EXTENSION_INFO = require('./extensions.js').default;

module.exports = {
    // Keys match the projectVersion key from project serialization
    3: {
        extensions: project =>
            (project.extensions || []).map(ext => EXTENSION_INFO[ext])
                .filter(ext => !!ext), // Only include extensions in the info lib
        spriteCount: project =>
            project.targets.length - 1, // don't count stage
        scriptCount: project => project.targets
            .map(target => Object.values(target.blocks))
            .reduce((accumulator, currentVal) => accumulator.concat(currentVal), [])
            .filter(block => block.topLevel).length,
        usernameBlock: project => project.targets
            .map(target => Object.values(target.blocks))
            .reduce((accumulator, currentVal) => accumulator.concat(currentVal), [])
            .some(block => block.opcode === 'sensing_username'),
        cloudData: project => {
            const stage = project.targets[0];
            return Object.values(stage.variables)
                .some(variable => variable.length === 3); // 3 entries if cloud var
        }
    },
    2: {
        extensions: () => [], // Showing extension chip not implemented for scratch2 projects
        spriteCount: project => project.info.spriteCount,
        scriptCount: project => project.info.scriptCount,
        usernameBlock: project =>
            // Block traversing is complicated in scratch2 projects...
            // This check should work even if you have sprites named getUserName, etc.
            JSON.stringify(project).indexOf('["getUserName"]') !== -1,
        cloudData: project => project.info.hasCloudData
    }
};
