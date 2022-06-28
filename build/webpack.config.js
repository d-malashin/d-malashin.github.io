const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== "production";
require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: isDevelopment && "source-map",
  devServer: {
    port: 3000,
    open: true,
    static: path.join(__dirname, "../src"),
  },
  module: {
    rules: [
      { test: /\.handlebars$/, loader: "handlebars-loader" },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              // autoprefixer: {
              //   browsers: ["last 2 versions"],
              // },
              sourceMap: isDevelopment,
              // plugins: () => [autoprefixer, cssnano],
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset",
        use: 'image-webpack-loader',
      },
    ],
  },
  plugins: [
    /** Since Webpack 4 */  
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {},
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-styles.css",
      chunkFilename: "[id].css",
    }),
    
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: "Denis Malashin | Front-end engineer",
      template: "./src/index.handlebars",
      filename: "index.html",
      minify: !isDevelopment && {
        html5: true,
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: true,
        removeEmptyElements: false,
      },
    }),
  ],
};
