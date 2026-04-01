import json from '@eslint/json';
import {eslintConfigScratch} from 'eslint-config-scratch';
import jest from 'eslint-plugin-jest';
import reactHooks from 'eslint-plugin-react-hooks';

export default eslintConfigScratch.defineConfig(
    // Replaces .eslintignore
    {
        ignores: [
            'build/',
            'intl/',
            'locales/',
            'package-lock.json', // intentionally has empty-string keys; exclude from JSON linting
            'scratch-gui/',
            'static/',
            '**/*.min.js'
        ]
    },

    // Base rules for all JS/JSX files — matches what the old root .eslintrc.js applied
    // to bin/, dev-server/, webpack.config.js, and as the base for test/ and src/
    {
        files: ['**/*.{js,jsx,mjs,cjs}'],
        extends: [
            eslintConfigScratch.legacy.base,
            eslintConfigScratch.legacy.node,
            eslintConfigScratch.legacy.es6
        ],
        languageOptions: {
            parserOptions: {
                // The old config used @babel/eslint-parser which handled JSX automatically.
                // With the default espree parser, JSX must be enabled explicitly.
                ecmaFeatures: {jsx: true}
            }
        },
        rules: {
            // ESLint 9 changed caughtErrors default from 'none' to 'all', so catch clause
            // variables are now checked. Extend the existing varsIgnorePattern convention
            // (_-prefixed = intentionally unused) to catch clause variables.
            'no-unused-vars': ['error', {args: 'after-used', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_'}]
        }
    },

    // src/ files — matches what the old src/.eslintrc.js configured (had root: true).
    // Adds React rules and overrides on top of the base config above.
    {
        files: ['src/**/*.{js,jsx}'],
        extends: [eslintConfigScratch.legacy.react],
        languageOptions: {
            globals: {
                process: 'readonly'
            }
        },
        plugins: {'react-hooks': reactHooks},
        settings: {
            react: {version: 'detect'}
        },
        rules: {
            'camelcase': [2, {
                properties: 'never',
                allow: ['^UNSAFE_'] // allow until migrated to new lifecycle methods
            }],
            // scratch-www uses @babel/preset-react's classic JSX transform (React.createElement),
            // so React must be in scope when JSX is used. legacy.react turns both of these off
            // (assuming the new automatic transform), so re-enable them explicitly:
            // - react-in-jsx-scope: error if React is not imported in a file that uses JSX
            // - jsx-uses-react: mark React as used when JSX is present (suppresses no-unused-vars)
            'react/react-in-jsx-scope': 'error',
            'react/jsx-uses-react': 'error',
            'react/forbid-prop-types': 'warn', // downgrade from legacy.react's [2] to warn
            'react-hooks/rules-of-hooks': 'error'
        }
    },

    // test/ files — matches what the old test/.eslintrc.js configured.
    // Includes legacy.react for jsx-uses-vars (so component imports aren't flagged as unused).
    {
        files: ['test/**/*.{js,jsx}'],
        extends: [
            eslintConfigScratch.legacy.react,
            jest.configs['flat/recommended']
        ],
        settings: {
            react: {version: 'detect'}
        },
        rules: {
            // classic JSX transform: React must be imported and marked as used when JSX is present
            'react/react-in-jsx-scope': 'error',
            'react/jsx-uses-react': 'error',
            'jest/no-done-callback': 'off', // TODO: convert callback-based tests to async/await
            'no-confusing-arrow': ['error', {allowParens: true}]
        }
    },

    // JSON linting
    // Use JSONC (allows // and /* */ comments) for most JSON files.
    {
        ...json.configs.recommended,
        files: ['**/*.json'],
        language: 'json/jsonc'
    },
    // tsconfig.json allows trailing commas in addition to comments (JSON5 syntax).
    {
        ...json.configs.recommended,
        files: ['tsconfig.json', 'tsconfig.*.json'],
        language: 'json/json5'
    }
);
