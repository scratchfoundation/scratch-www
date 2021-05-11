import InfiniteList from '../../../src/redux/infinite-list';

const module = InfiniteList('test-key');
let initialState;
describe('Infinite List redux module', () => {
    beforeEach(() => {
        initialState = module.reducer(undefined, {}); // eslint-disable-line no-undefined
    });

    describe('reducer', () => {
        test('module contains a reducer', () => {
            expect(typeof module.reducer).toBe('function');
        });
        
        test('initial state', () => {
            expect(initialState).toMatchObject({
                loading: true,
                error: null,
                items: [],
                moreToLoad: false
            });
        });

        describe('LOADING', () => {
            let action;
            beforeEach(() => {
                action = module.actions.loading();
                initialState.loading = false;
                initialState.items = [1, 2, 3];
                initialState.error = new Error();
            });
            test('sets the loading state', () => {
                const newState = module.reducer(initialState, action);
                expect(newState.loading).toBe(true);
            });
            test('maintains any existing data', () => {
                const newState = module.reducer(initialState, action);
                expect(newState.items).toBe(initialState.items);
            });
            test('clears any existing error', () => {
                const newState = module.reducer(initialState, action);
                expect(newState.error).toBe(null);
            });
        });

        describe('APPEND', () => {
            let action;
            beforeEach(() => {
                action = module.actions.append([4, 5, 6], true);
            });
            test('appends the new items', () => {
                initialState.items = [1, 2, 3];
                const newState = module.reducer(initialState, action);
                expect(newState.items).toEqual([1, 2, 3, 4, 5, 6]);
            });
            test('sets the moreToLoad state', () => {
                initialState.moreToLoad = false;
                const newState = module.reducer(initialState, action);
                expect(newState.moreToLoad).toEqual(true);
            });
            test('clears any existing error and loading state', () => {
                initialState.error = new Error();
                initialState.loading = true;
                const newState = module.reducer(initialState, action);
                expect(newState.error).toBe(null);
                expect(newState.error).toBe(null);
            });
        });

        describe('REPLACE', () => {
            let action;
            beforeEach(() => {
                action = module.actions.replace(2, 55);
            });
            test('replaces the given index with the new item', () => {
                initialState.items = [8, 9, 10, 11];
                const newState = module.reducer(initialState, action);
                expect(newState.items).toEqual([8, 9, 55, 11]);
            });
        });

        describe('REMOVE', () => {
            let action;
            beforeEach(() => {
                action = module.actions.remove(2);
            });
            test('removes the given index', () => {
                initialState.items = [8, 9, 10, 11];
                const newState = module.reducer(initialState, action);
                expect(newState.items).toEqual([8, 9, 11]);
            });
        });

        describe('CREATE', () => {
            let action;
            beforeEach(() => {
                action = module.actions.create(7);
            });
            test('prepends the given item', () => {
                initialState.items = [8, 9, 10, 11];
                const newState = module.reducer(initialState, action);
                expect(newState.items).toEqual([7, 8, 9, 10, 11]);
            });
        });

        describe('ERROR', () => {
            let action;
            let error = new Error();
            beforeEach(() => {
                action = module.actions.error(error);
            });
            test('sets the error state', () => {
                const newState = module.reducer(initialState, action);
                expect(newState.error).toBe(error);
            });
            test('resets loading to false', () => {
                initialState.loading = true;
                const newState = module.reducer(initialState, action);
                expect(newState.loading).toBe(false);
            });
            test('maintains any existing data', () => {
                initialState.items = [1, 2, 3];
                const newState = module.reducer(initialState, action);
                expect(newState.items).toEqual([1, 2, 3]);
            });
        });
    });

    describe('action creators', () => {
        test('module contains actions creators', () => {
            // The actual action creators are tested above in the reducer tests
            for (let key in module.actions) {
                expect(typeof module.actions[key]).toBe('function');
            }
        });
    });

    describe('selector', () => {
        test('will return the slice of state defined by the key', () => {
            const state = {
                [module.key]: module.reducer(undefined, {}) // eslint-disable-line no-undefined
            };
            expect(module.selector(state)).toBe(initialState);
        });
    });
});
