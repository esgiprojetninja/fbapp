var path = require('path');
var webpack = require('webpack');


module.exports = {
  devtool: 'eval',
  entry: [
    //'http://localhost:3000',
    './resources/assets/js/lib/main.js'
  ],
  output: {
    path: path.join(__dirname, 'public/js/dist'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'public/js/lib')
    }]
  }
};
