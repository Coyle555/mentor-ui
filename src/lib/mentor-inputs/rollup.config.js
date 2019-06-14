const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const less = require('rollup-plugin-less');
const commonjs = require('rollup-plugin-commonjs');

/*
  The only way I've gotten the build to work with named imports 
  is by using an array of all the packages being used on the 
  'external' key of the config object - Adam
*/
const PACKAGES = Object.keys(
  require(`./package.json`).dependencies
);

module.exports = {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    globals: {
      react: 'React'
    }
  },
  plugins: [ 
    resolve(),
    less({ insert: true }), 
    babel({
      exclude: 'node_modules/**' 
    }),
    commonjs({
      include: 'node_modules/' 
    })    
  ],
  external: PACKAGES
}
