import ScratchStorage from 'scratch-storage';

const PROJECT_HOST = process.env.PROJECT_HOST || 'https://projects.scratch.mit.edu';

/**
 * Wrapper for ScratchStorage which adds default web sources.
 * @todo make this more configurable
 */
class Storage extends ScratchStorage {
    constructor () {
        super();
        this.addWebSource(
            [this.AssetType.Project],
            projectAsset => `${PROJECT_HOST}/${projectAsset.assetId}`
        );
    }
}

const storage = new Storage();

export default storage;
