module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['plugin:vue/vue3-recommended', 'airbnb-base', 'plugin:prettier/recommended', './auto-imports.json'],
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint'],
    globals: {
        ScrollToOptions: 'readonly',
        // vue macros
        defineEmits: 'readonly',
        defineProps: 'readonly',
    },
    rules: {
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'consistent-return': 'off',
        'array-callback-return': 'off',
        'no-use-before-define': 'off',
        'no-restricted-syntax': 'off',
        'max-classes-per-file': 'off',
    },
};
