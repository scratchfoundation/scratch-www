let _store = null;

const setStore = store => {
    _store = store;
};

const getStore = () => _store;

module.exports = {
    setStore,
    getStore
};
