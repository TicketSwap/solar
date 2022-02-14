module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never'],
    'body-max-line-length': [2, 'always', Infinity],
  },
}
