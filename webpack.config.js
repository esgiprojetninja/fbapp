var path = require('path');
var webpack = require('webpack');

const libRoot = "./resources/assets/js/lib/"

module.exports = {
  devtool: 'eval',
  entry: [
    "babel-polyfill",
    libRoot + "main.js"
  ],
  output: {
      path: path.join(__dirname, 'public/js/dist'),
      filename: 'bundle.min.js',
      publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      query: {
        presets: ["es2015", "react"],
        plugins: ["transform-object-rest-spread"]
      },
      include: path.join(__dirname, 'public/js/lib')
    }]
  }
};
