const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webConfig = {
  entry: { 
    demo1: "./src/demos/demo1.ts",
    demo2: "./src/demos/demo2.ts"
  },
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
    writeToDisk: true,
    contentBase: path.resolve(__dirname, "public"),
    compress: true,
    port: 8080,
    hot: true,
    overlay: true,
  },
};

module.exports = [webConfig];
