const path = require('path');

const webConfig = {
    entry: "./src/index.ts",
    mode: "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },
    output: {
        filename: "web-bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        writeToDisk: true,
        contentBase: __dirname,
        compress: true,
        port: 8080,
        hot: true,
        overlay: true
    }
};

module.exports = [
    webConfig
]