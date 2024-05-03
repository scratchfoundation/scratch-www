module.exports = {
    root: true,
    extends: ['scratch', 'scratch/es6', 'scratch/react'],
    env: {
        browser: true
    },
    globals: {
        process: true
    },
    plugins: ['json', 'react-hooks'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        'camelcase': [2, {
            properties: 'never', // This is from the base `scratch` config
            allow: ['^UNSAFE_'] // Allow until migrated to new lifecycle methods
        }],
        'react-hooks/rules-of-hooks': 'error',
        'react/forbid-prop-types': 'warn'
    }
};
