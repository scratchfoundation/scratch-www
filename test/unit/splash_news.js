var configureMockStore = require('redux-mock-store');
var thunk = require('redux-thunk');

var actions = require('../../src/redux/splash/news.js');

var nock = require('nock');
var tap = require('tap');

var mockStore = configureMockStore(thunk);

var window = { //eslint-disable-line
    env: {
        API_HOST: process.env.API_HOST
    },
    location: ''
};

tap.test('splashGetNews', function (t) {
    nock(process.env.API_HOST)
        .get('/news')
        .query({limit: 3})
        .reply(200, {body: [{didSucceed: 'yes'}]});

    var expectedActions = [
        {type: actions.Types.SET_STATUS, status: actions.Status.FETCHING},
        {type: actions.Types.SET_STATE, news: [{didSucceed: 'yes'}]}
    ];

    var store = mockStore({status: actions.Status.NOT_FETCHED, news: []});

    return store.dispatch(actions.getNews())
        .then(function (){
            t.equal(store.getActions(), expectedActions);
            t.end();
        });
});
