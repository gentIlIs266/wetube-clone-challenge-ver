const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        createVideo: "./src/client/js/create-video.js",
        index: "./src/client/js/index.js",
        masthead: "./src/client/js/masthead.js",
        userJoin: "./src/client/js/user-join.js",
        userLogin: "./src/client/js/user-login.js",
        appDrawer: "./src/client/js/appDrawer.js",
    },
    mode: "development",
    target: "node",
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "/assets/css/",
                        },
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "[name][ext]",
                    outputPath: "fonts/",
                    publicPath: "/fonts/",
                },
            },
        ]
    },
}