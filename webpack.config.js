const path = require('path');

module.exports = {
  entry: './src/init.js',
  output: {filename: 'reactInspector.min.js', path: path.resolve(__dirname, 'build'),},
  mode: 'production',
  devtool: 'source-map',
};