module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'airbnb-base',
        'plugin:prettier/recommended',
        './.eslintrc-auto-import.json',
    ],
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
        'class-methods-use-this': 'off',
        // Fix incorrect eslint hint
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        // Reactivity transform
        'vue/no-setup-props-destructure': 'off',
    },
};
