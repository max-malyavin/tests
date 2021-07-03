const CircularDependencyPlugin = require("circular-dependency-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === "development";

const plugins = [
  new CleanWebpackPlugin(),
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    cwd: process.cwd(),
  }),
  new MiniCssExtractPlugin({
    filename: !isDev ? "styles/[name].[fullhash].css" : "styles/[name].css",
    chunkFilename: "[id].css",
  }),
  new HtmlWebpackPlugin({
    minify: {
      collapseWhitespace: !isDev,
      removeComments: true,
      removeAttributeQuotes: true,
    },
    inject: "body",
    template: "index.html",
    favicon: "assets/favicon.ico",
  }),
  new webpack.ProvidePlugin({
    React: "react",
  }),
  // new BundleAnalyzerPlugin(),
];

module.exports = {
  plugins,
};
