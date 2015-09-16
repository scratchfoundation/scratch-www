module.exports = {
    getInitialState: function () {
        return {
            session: window._session
        };
    },
    updateSession: function () {
        this.setState({'session': window._session});
    },
    componentWillMount: function () {
        window.addEventListener('session', this.updateSession);
    }
};
