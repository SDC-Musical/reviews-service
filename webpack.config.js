const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env) => ({
  entry: './server/server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'bundle-reviews-service.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.API_URL': JSON.stringify(`${env.API_URL}`) }),
  ],
});
