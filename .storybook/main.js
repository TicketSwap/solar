const path = require('path')
const toPath = _path => path.join(process.cwd(), _path)

module.exports = {
  stories: [
    '../src/**/*.stories.@(ts|js|tsx)',
    '../docs/**/*.stories.@(mdx|tsx)',
  ],

  addons: ['@storybook/addon-essentials'],

  typescript: {
    check: true, // type-check stories during Storybook build
    reactDocgen: 'none',
  },

  webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          '@emotion/styled': toPath('node_modules/@emotion/styled'),
        },
      },
    }
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {
    autodocs: true,
  },
}
