const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

module.exports = ({ config, mode }) => {
  // TypeScript
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [["react-app", { flow: false, typescript: true }]]
    }
  });
  config.resolve.extensions.push(".ts", ".tsx");

  // @storybook/addon-docs
  config.module.rules.push({
    test: /\.mdx$/,
    use: [
      { loader: "babel-loader" },
      {
        loader: "@mdx-js/loader",
        options: {
          compilers: [createCompiler({})]
        }
      }
    ]
  });

  return config;
};
