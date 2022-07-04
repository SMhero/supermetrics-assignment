import HtmlWebpackPlugin from "html-webpack-plugin";
import DotenvWebpack from "dotenv-webpack";
import webpack from "webpack";
import dotenv from "dotenv";

import path from "path";

const sourcePath = path.join(__dirname, "src");

const devtool =
  process.env.NODE === "development"
    ? "source-map"
    : "eval-cheap-module-source-map";
const mode = process.env.NODE === "development" ? "development" : "production";
const performance = {
  hints: process.env.NODE_ENV === "production" ? "warning" : false,
};

const env = dotenv.config().parsed;

const envKeys = Object.keys(env as {}).reduce(
  (prev, next) =>
    (prev[`process.env.${next}`] = env ? JSON.stringify(env[next]) : ""),
  {}
);

module.exports = {
  devtool,
  entry: path.join(sourcePath, "index"),
  mode: mode,
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [sourcePath, "node_modules"],
  },
  performance,
  module: {
    rules: [
      {
        include: [sourcePath],
        test: /\.(j|t)sx?$/,
        use: ["babel-loader"],
      },
      {
        include: [sourcePath],
        test: /\.p?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                exportLocalsConvention: "dashes",
                localIdentName: "[path][name]__[local]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
        ],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        use: ["file-loader?name=img/[name].[ext]"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/index.html"),
    }),
    new DotenvWebpack(),
    new webpack.DefinePlugin(envKeys),
  ],
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 3000,
    static: path.join(__dirname, "dist"),
  },
};
