const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const gc = process.env.gconstr == 1;
const entry = gc ? "./gconstructor/constructor.ts" : "./wires.ts";
const output = gc ? "gconstructor" : "html";
console.log(gc);
const config = {
    entry: entry,
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, output),
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
        // new CopyWebpackPlugin([
        //     {
        //         from: "./html/**/*",
        //         to: "./"
        //     }
        // ])
    ]
}
module.exports = config;