import storage from '../../../src/lib/storage';

describe('unit test lib/storage.js', () => {
    test('storage construction', () => {
        expect(storage).toBeDefined(); // also implies the import succeeded
        expect(storage.addWebSource).toBeDefined(); // method on ScratchStorage
        expect(storage.setProjectToken).toBeDefined(); // method added by GUI
    });
});
