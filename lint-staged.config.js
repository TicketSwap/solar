module.exports = {
  linters: {
    '**/*.js': ['jest --findRelatedTests'],
    '**/*.+(js|jsx|json|yml|yaml|css|scss|ts|tsx|md|mdx|graphql)': [
      'prettier --write',
      'git add',
    ],
  },
}
