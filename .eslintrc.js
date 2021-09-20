module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2, maxEOF: 0 }],
  },
}
