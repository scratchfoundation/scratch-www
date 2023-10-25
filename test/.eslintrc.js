module.exports = {
    extends: ['scratch/react', 'scratch/es6', 'plugin:jest/recommended'],
    env: {
        jest: true
    },
    rules: {
        'jest/no-done-callback': 'off', // TODO: convert callback-based tests to async/await
        'no-confusing-arrow': [
            'error',
            {
                allowParens: true
            }
        ],
    }
};
