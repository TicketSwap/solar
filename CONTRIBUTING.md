# Welcome to the Solar contributing guide

In this guide you will get an overview of some of the ways you can contribute to Solar.

## Verifying your changes

All changes made to a component should be reflected in storybook by running `yarn storybook`. Make sure to update the storybook files accordingly.

## Testing your build

When you're happy with your changes you can preview them by running the following command:

```
yarn dev-pack
```

This will create the `dist/ticketswap-solar-0.0.0-development.tgz` file.
After unpacking this file you will be able to use it in a project of your choice to validate the build by copying it to the node_module folder.

## Creating the PR

1. Create a new branch
2. Stage your changes
3. Run `yarn commit` to make sure you are using semantic commits.
4. Push the changes to github
5. Create the PR
