const fs = require('fs')

const distRoot = `${__dirname}/../dist`

const packageJson = require('../package.json')

// The root package.json is marked as private to prevent publishing
// from happening in the root of the project. This sets the package back to
// public so it can be published from the "dist" directory.
packageJson.private = false

// Remove package.json items that we don't need to publish
delete packageJson.scripts
delete packageJson.prettier
delete packageJson.engines

// The root package.json points to the CJS/ESM source in "dist", to support
// on-going package development (e.g. running tests, supporting npm link, etc.).
// When publishing from "dist" however, we need to update the package.json
// to point to the files within the same directory.
const distPackageJson =
  JSON.stringify(
    packageJson,
    (_key, value) => {
      if (typeof value === 'string' && value.startsWith('./dist/')) {
        const parts = value.split('/')
        parts.splice(1, 1) // remove dist
        return parts.join('/')
      }
      return value
    },
    2
  ) + '\n'

// Save the modified package.json to "dist"
fs.writeFileSync(`${distRoot}/package.json`, distPackageJson)
fs.copyFileSync(`${__dirname}/../README.md`, `${distRoot}/README.md`)

// Create individual bundle package.json files, storing them in their
// associated dist directory.
fs.writeFileSync(
  `${distRoot}/icons/package.json`,
  JSON.stringify(
    {
      name: '@ticketswap/solar/icons',
      main: 'icons.cjs',
      module: 'index.js',
      types: 'index.d.ts',
      sideEffects: false,
    },
    null,
    2
  ) + '\n'
)
