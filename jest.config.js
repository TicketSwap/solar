module.exports = {
  ...require('./test/jest-common'),
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageThreshold: {
    global: {
      statements: 30,
      branches: 30,
      functions: 30,
      lines: 30,
    },
  },
  projects: ['./test/jest.lint.js', './test/jest.client.js'],
}
