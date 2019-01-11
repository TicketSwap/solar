module.exports = {
  ...require('./test/jest-common'),
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageThreshold: {
    global: {
      statements: 35,
      branches: 35,
      functions: 35,
      lines: 35,
    },
  },
  projects: ['./test/jest.lint.js', './test/jest.client.js'],
}
