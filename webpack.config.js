const path = require("path");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // css-minimizer-webpack-plugin or optimize-css-assets-webpack-plugin
const TerserPlugin = require("terser-webpack-plugin");

const { images, fonts, cssAndScss, js } = require("./webpack/./webpack.rules.js");
const { plugins } = require("./webpack/./webpack.plugins.js");

const isDev = process.env.NODE_ENV === "development";

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (!isDev) {
    config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()];
  }
  return config;
};

module.exports = {
  context: path.join(__dirname, "src"),
  mode: isDev ? "production" : "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
    },
    fallback: {
      crypto: false,
      "crypto-browserify": require.resolve("crypto-browserify"),
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: "./index.js",
  plugins,
  optimization: optimization(),
  performance: { hints: false, maxEntrypointSize: 512000, maxAssetSize: 512000 },
  module: {
    rules: [images, fonts, cssAndScss, js],
  },
  devServer: {
    compress: true,
    port: 4200,
    hot: true,
    open: true,
    historyApiFallback: {
      index: "./index.html",
    },
    headers: {
      //  "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      //   "/api": { target: "http://localhost:5000" },
    },
    liveReload: true,
  },
  devtool: isDev ? "source-map" : false,
  output: {
    filename: !isDev ? "js/[name].[fullhash].bundle.js" : "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
