import {
    Errors,
    loadActivity
} from '../../../src/views/studio/lib/studio-activity-actions';
import {activity} from '../../../src/views/studio/lib/redux-modules';
import {reducers, initialState} from '../../../src/views/studio/studio-redux';
import configureStore from '../../../src/lib/configure-store';

jest.mock('../../../src/lib/api');
import api from '../../../src/lib/api';

let store;

beforeEach(() => {
    api.mockClear();
    store = configureStore(reducers, {
        ...initialState,
        studio: {id: 123123}
    });
});

describe('loadActivity', () => {
    test('it populates the activity list', () => {
        api.mockImplementation((opts, callback) => {
            const body = [{id: 1}, {id: 2}, {id: 3, datetime_created: 'abc'}];
            callback(null, body, {statusCode: 200});
        });
        store.dispatch(loadActivity());
        let items = activity.selector(store.getState()).items;
        expect(api.mock.calls[0][0].uri).toBe('/studios/123123/activity/');
        expect(api.mock.calls[0][0].params.offset).toBeUndefined();
        expect(items.length).toBe(3);
        expect(items[0].id).toBe(1);

        // On next loadActivity request, it should include the last activity items
        // datetime_created as the dateLimit. It should de-duplicate based on id
        api.mockImplementation((opts, callback) => {
            const body = [{id: 3}, {id: 4}, {id: 5, datetime_created: 'def'}];
            callback(null, body, {statusCode: 200});
        });
        store.dispatch(loadActivity());
        expect(api.mock.calls[1][0].params.dateLimit).toBe('abc');
        items = activity.selector(store.getState()).items;
        expect(items.length).toBe(5); // id=3 should get de-duplicated
    });

    test('errors are set on the activity state', () => {
        api.mockImplementation((opts, callback) => {
            callback(null, null, {statusCode: 500});
        });
        store.dispatch(loadActivity());
        expect(activity.selector(store.getState()).error).toBe(Errors.SERVER);
    });
});
