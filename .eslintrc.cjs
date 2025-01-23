require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue-pug/vue3-recommended',
    '@vue/eslint-config-typescript',
  ],
  plugins: [
    '@stylistic/js',
    'import-newlines',
  ],
  parserOptions: { ecmaVersion: 2020 },
  ignorePatterns: [
    'dist',
    '/scripts/*',
    '**/lang/*',
    '**/schemas/*',
    '**/sdk-apps/*',
    '.eslintrc.*',
    '*.d.ts',
    '*.svg',
    '*.config.ts',
  ],
  rules: {
    // === ESLint ===
    // Version 9.10.0
    // Possible Problems
    'array-callback-return': ['error'],
    'no-duplicate-imports': ['error'],
    'no-self-compare': ['error'],
    'no-inner-declarations': ['error'],

    // Suggestions
    'arrow-body-style': ['error', 'as-needed'],
    'curly': ['error'],
    'default-case': ['error'],
    'default-case-last': ['error'],
    'dot-notation': ['error'],
    'eqeqeq': ['error'],
    'init-declarations': ['error'],
    'max-depth': ['error', 3],
    'max-nested-callbacks': ['error', 3],
    'max-params': ['error', 3],
    'no-confusing-arrow': ['error'],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty-function': ['error'],
    'no-implicit-coercion': ['error'],
    'no-lone-blocks': ['error'],
    'no-lonely-if': ['error'],
    'no-loop-func': ['error'],
    'no-multi-assign': ['error'],
    'no-multi-str': ['error'],
    'no-nested-ternary': ['error'],
    'no-param-reassign': ['error'],
    'no-plusplus': ['error'],
    'no-return-assign': ['error'],
    'no-unneeded-ternary': ['error'],
    'no-useless-computed-key': ['error'],
    'no-useless-concat': ['error'],
    'no-useless-rename': ['error'],
    'no-useless-return': ['error'],
    'no-var': ['error'],
    'prefer-arrow-callback': ['error'],
    'prefer-const': ['error'],
    'prefer-template': ['error'],
    'quote-props': ['error', 'as-needed'],
    'require-await': ['error'],

    /**
     * Layout and Formatting
     * https://eslint.style/rules?
     */
    '@stylistic/js/array-bracket-newline': ['error', 'consistent'],
    '@stylistic/js/array-element-newline': ['error', 'consistent'],
    '@stylistic/js/arrow-parens': ['error', 'as-needed'],
    '@stylistic/js/block-spacing': ['error'],
    '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/js/dot-location': ['error', 'property'],
    '@stylistic/js/function-call-argument-newline': ['error', 'consistent'],
    '@stylistic/js/func-call-spacing': ['error'],
    '@stylistic/js/implicit-arrow-linebreak': ['error', 'beside'],
    '@stylistic/js/indent': ['error', 2, { ignoreComments: true, SwitchCase: 1 }],
    '@stylistic/js/max-len': ['error', { code: 150 }],
    '@stylistic/js/multiline-comment-style': ['error', 'starred-block'],
    '@stylistic/js/newline-per-chained-call': ['error'],
    '@stylistic/js/no-extra-semi': ['error'],
    '@stylistic/js/nonblock-statement-body-position': ['error'],
    '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1 }],
    '@stylistic/js/object-curly-newline': ['error', { multiline: true }],
    '@stylistic/js/object-curly-spacing': ['error', 'always'],
    '@stylistic/js/object-property-newline': ['error'],
    '@stylistic/js/one-var-declaration-per-line': ['error', 'always'],
    '@stylistic/js/operator-linebreak': ['error', 'before'],
    '@stylistic/js/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
      { blankLine: 'always', prev: '*', next: ['if', 'switch', 'function'] },
      { blankLine: 'always', prev: ['if', 'switch', 'function'], next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
    ],
    '@stylistic/js/quotes': ['error', 'single'],
    '@stylistic/js/semi': ['error', 'always'],
    '@stylistic/js/semi-style': ['error'],

    /**
     * Import break line rule
     * This rule related to object-curly-newline config above
     */
    'import-newlines/enforce': ['error', { 'items': 3 }],

    // === Vue configs ===
    // Essential
    'vue/multi-word-component-names': 'off',

    // Strongly Recommend
    'vue/attribute-hyphenation': ['error'],
    'vue/first-attribute-linebreak': ['error'],
    'vue/max-attributes-per-line': ['error', { singleline: { max: 1 } }],
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],

    // Recommend
    'vue/attributes-order': ['error'],
    'vue/component-tags-order': ['error', { 'order': ['template', 'script'] }],
    'vue/no-v-html': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/require-default-prop': 'off',

    // === Typescript configs ===
    // '@typescript-eslint/no-explicit-any': 'error', => un comment this rule if you want to prevent any type
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
