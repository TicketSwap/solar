import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import externals from 'rollup-plugin-node-externals'
import { terser } from 'rollup-plugin-terser'

function prepareCJS(input, output, cjsOutput) {
  return {
    input: input,
    plugins: [
      externals({ deps: true }),
      nodeResolve({
        extensions: ['.ts', '.tsx', '.js'],
      }),
      commonjs(),
      babel({
        configFile: path.resolve(__dirname, 'babel.config.js'),
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
        extensions: ['.ts', '.tsx', '.js'],
      }),
    ],
    output: [
      {
        file: cjsOutput,
        format: 'cjs',
        exports: 'named',
      },
      {
        dir: output,
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: output === 'dist/icons' ? 'src/icons' : 'src',
      },
    ],
    external: [/@babel\/runtime/],
  }
}

function prepareCJSMinified(input) {
  return {
    input,
    output: {
      file: input.replace('.cjs', '.min.cjs'),
      format: 'cjs',
    },
    plugins: [
      terser({
        mangle: {
          toplevel: true,
        },
        compress: {
          toplevel: true,
          global_defs: {
            '@__DEV__': 'false',
          },
        },
      }),
    ],
  }
}

export default [
  prepareCJS('./src/index.ts', 'dist', 'dist/main.cjs'),
  prepareCJS('./src/icons/index.tsx', 'dist/icons', 'dist/icons/icons.cjs'),
  prepareCJSMinified('dist/main.cjs'),
]
