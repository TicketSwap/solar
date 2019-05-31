module.exports = {
  ...require('./jest-common'),
  displayName: 'dom',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    'jest-dom/extend-expect',
    '@testing-library/react/cleanup-after-each',
    require.resolve('./setup-tests.js'),
  ],
}
