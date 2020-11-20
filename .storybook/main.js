const path = require('path')
const toPath = _path => path.join(process.cwd(), _path)

module.exports = {
  stories: ['../src/**/*.stories.@(ts|js|tsx)'],
  addons: [],
  typescript: {
    check: true, // type-check stories during Storybook build
  },
  webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/styled': toPath('node_modules/@emotion/styled'),
        },
      },
    }
  },
}
