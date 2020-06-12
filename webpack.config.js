const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webConfig = {
  entry: {
    demo1: "./src/demos/demo1.ts",
  },
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/dist"),
  },
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
