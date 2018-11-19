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
            projectAsset => {
                const [projectId, revision] = projectAsset.assetId.split('.');
                return revision ?
                    `${PROJECT_HOST}/internalapi/project/${projectId}/get/${revision}` :
                    `${PROJECT_HOST}/internalapi/project/${projectId}/get/`;
            }
        );
    }
}

const storage = new Storage();

export default storage;
