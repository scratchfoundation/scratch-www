module.exports = {
    root: true,
    extends: ['scratch', 'scratch/es6', 'scratch/react'],
    env: {
        browser: true
    },
    globals: {
        process: true
    },
    plugins: ['json'],
    settings: {
        react: {
            version: '16.2' // Prevent 16.3 lifecycle method errors
        }
    }
};
