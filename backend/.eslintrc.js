module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                '.eslintrc.{js,cjs}',
            ],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        quotes: 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        indent: 'off',
        "linebreak-style": 0,
        // ... other rules ...
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true, // Allow imports from devDependencies
            },
        ],
        'import/order': [
            'error',
            {
                groups: [['builtin', 'external'], 'internal'],
                'newlines-between': 'no',
            },
        ],
    },
};
