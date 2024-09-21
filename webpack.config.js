const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        createVideo: "./src/client/js/create-video.js",
        index: "./src/client/js/index.js",
        masthead: "./src/client/js/masthead.js",
        userJoin: "./src/client/js/user-join.js",
        userLogin: "./src/client/js/user-login.js",
    },
    mode: "development",
    watch: true,
    plugins: [new MiniCssExtractPlugin({
        filename: "css/[name].bundle.css",
    })],
    output: {
        clean: true,
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, "assets"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
}