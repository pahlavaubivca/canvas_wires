const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const config = {
    entry: "./index.ts",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "output"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                loader: "ts-loader",
                exclude: [
                    /node_modules/
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".html", ".json", ".css"],
        alias: {
            index: path.resolve(__dirname, "index")
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: "./html/**/*",
                to: "./"
            }
        ])
    ]
}
module.exports = config;