const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webConfig = {
  entry: { demo4: "./src/demos/demo4.ts" },
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "First UK SimulatorCore Demos",
    }),
  ],
  devServer: {
    compress: true,
    port: 8080,
    hot: true,
  },
};

module.exports = [webConfig];
