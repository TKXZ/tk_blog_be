module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
