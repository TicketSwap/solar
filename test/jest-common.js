// common project configuration used by the other configs

const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/docs/', '/dist/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
}
