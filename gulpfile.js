const elixir = require('laravel-elixir');
var path = require('path');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

elixir((mix) => {
    mix.sass([
        "app.scss",
        "main.scss"
    ])
   .webpack(
       './lib/app.js',
       './public/js/dist'
   );
});

const libRoot = "./resources/assets/js/lib/"

Elixir.webpack.mergeConfig({
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
});
