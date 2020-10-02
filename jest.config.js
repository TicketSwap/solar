module.exports = {
  ...require('./test/jest-common'),
  collectCoverageFrom: [
    '**/src/**/*.(js|jsx|ts|tsx)',
    '!**/*.test.(js|jsx|ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      statements: 25,
      branches: 25,
      functions: 20,
      lines: 25,
    },
  },
  projects: ['./test/jest.lint.js', './test/jest.client.js'],
}
