const path = require('path');
// const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'javascripts/client': ['@babel/polyfill', './src/client/app.jsx'],
    // server: './src/server/app.js',
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.join(__dirname, '/public/'),
    publicPath: '/',
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
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           importLoaders: 1,
      //           sourceMap: true,
      //         },
      //       },
      //     ],
      //   }),
      // },
      // {
      //   test: /\.(sass|scss)$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           importLoaders: 2,
      //           sourceMap: true,
      //           // localIndentName: "[name]__[local]__[hash:base64:5]"
      //         },
      //       },
      //       'sass-loader',
      //     ],
      //   }),
      // },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/client/index.html',
      filename: './index.html',
    }),
    new ExtractTextPlugin({
      filename: 'stylesheets/style.css',
      allChunks: true,
    }),
  ],
};
