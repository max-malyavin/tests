const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssAndScss = {
  test: /\.(css|scss)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    // "style-loader",
    "css-loader",
    "sass-loader",
  ],
};

const fonts = {
  test: /\.(woff|woff2|ttf|eot)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "fonts/",
      },
    },
  ],
};

const images = {
  test: /\.(jpe?g|jpg|png|svg|gif)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "images/",
      },
    },
  ],
};

const js = {
  test: /\.(ts|tsx|js?|jsx?)$/,
  exclude: /node_modules/,
  use: ["babel-loader"],
};

module.exports = {
  images,
  fonts,
  cssAndScss,
  js,
};
