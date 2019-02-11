import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import nodeResolve from 'rollup-plugin-node-resolve'
import progress from 'rollup-plugin-progress'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import replace from 'rollup-plugin-replace'
import visualizer from 'rollup-plugin-visualizer'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/solar.es.js',
      name: '@ticketswap/solar',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        'styled-components': 'styled',
        'react-spring': 'ReactSpring',
        downshift: 'Downshift',
      },
      format: 'es',
    },
  ],
  plugins: [
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
}
