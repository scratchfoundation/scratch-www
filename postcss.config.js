module.exports = {
    plugins: function () {
        return [autoprefixer({browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']})];
    }
}