import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import nodeResolve from 'rollup-plugin-node-resolve'
import progress from 'rollup-plugin-progress'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import replace from 'rollup-plugin-replace'
import visualizer from 'rollup-plugin-visualizer'
import minify from 'rollup-plugin-babel-minify'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/solar.js',
      format: 'umd',
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
      sourcemap: isProduction ? false : 'inline',
    },
    {
      file: 'dist/solar.es.js',
      format: 'es',
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
      sourcemap: isProduction ? false : 'inline',
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
    isProduction && minify(),
    visualizer(),
    filesize(),
  ],
}
