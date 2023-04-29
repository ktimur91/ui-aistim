module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier/skip-formatting'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        useTabs: false,
        printWidth: 120,
        tabWidth: 2,
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        jsxBracketSameLine: false
      }
    ]
  }
}
