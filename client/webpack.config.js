const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = () => {
  return {
    mode: 'development', // Specifies the mode to use.
    entry: {
      //An object defining the entry points for the application. These are the top-level files that Webpack will include in the bundle.
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js', //name of the output
      path: path.resolve(__dirname, 'dist'), //output directory
    },

    //  Added configured workbox plugins for a service worker and manifest file.
    plugins: [
      new HtmlWebpackPlugin({
        //It simplifies the creation of HTML files to serve our webpack bundles.
        template: './index.html',
        title: 'JATE',
      }),
      new MiniCssExtractPlugin(), //This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.

      new InjectManifest({
        //This plugin injects a list of URLs into a service worker file, generating a list of local assets that should be cached.
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      new WebpackPwaManifest({
        //This plugin generates a 'web app manifest' for Progressive Web Apps (PWA), with auto icon resizing and fingerprinting support.
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'offline text editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], //multiple sizes
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {//: It tells Webpack how to handle different types of modules. The rules array consists of loader objects, which define a test (what kind of files to process) and a use (what loader or loaders to use).
      // added CSS loaders and babel to webpack.
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|svg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ],
            },
          },
        },
      ],
    },
  };
};
