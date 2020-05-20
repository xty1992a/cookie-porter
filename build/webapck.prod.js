process.env.NODE_ENV = "production";

const webpack = require("webpack");
const base = require("./webpack.base");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { root } = require("./utils");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(base, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: root("src/icon.png"),
          to: root("dist/icon.png"),
        },
        {
          from: root("src/manifest.json"),
          to: root("dist/manifest.json"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: root("src/popup/index.html"),
      filename: root("dist/popup.html"),
      inject: true,
      chunks: ["popup"],
    }),
  ],
});
