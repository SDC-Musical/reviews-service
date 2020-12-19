const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve('template'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};