process.env.NODE_ENV = "development";

const base = require("./webpack.base");
const merge = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { root } = require("./utils");

module.exports = merge(base, {
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
    new HtmlWebpackPlugin({
      template: root("src/popup/index.html"),
      filename: root("popup.html"),
      inject: true,
      chunks: ["popup"],
    }),
  ],

  devServer: {
    clientLogLevel: "warning",
    port: 8080,
    quiet: true,
    disableHostCheck: true,
    publicPath: "/",
    contentBase: require("path").resolve(__dirname, ".."),
  },
});
