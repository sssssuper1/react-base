const webpack = require('webpack');
const paths = require('./paths');

module.exports = {
  entry: {
    react: ['react', 'react-dom']
  },
  mode: 'production',
  output: {
    filename: '[name].dll.[hash:6].js',
    path: paths.vendor,
    library: '[name]_vendor',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_vendor',
      path: paths.manifest,
    }),
  ]
}