const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { root } = require("./utils");

module.exports = {
  entry: {
    "content-script": root("src/content-script.js"),
    popup: root("src/popup/index.js"),
  },

  output: {
    path: root("dist"),
    publicPath: "/",
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "vue-style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          "vue-style-loader",
          "css-loader",
          // "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        exclude: [root("src/icons")],
        options: {
          limit: 10000,
          name: root("dist/fonts/[name].[hash:7].[ext]"),
        },
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
