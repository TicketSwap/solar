import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import nodeResolve from 'rollup-plugin-node-resolve'
import progress from 'rollup-plugin-progress'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import replace from 'rollup-plugin-replace'
import visualizer from 'rollup-plugin-visualizer'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    typescript(),
    peerDepsExternal(),
    babel({
      exclude: 'node_modules/**',
    }),
    progress(),
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),
    visualizer(),
    filesize(),
  ],
  external: id =>
    !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
}
