const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        watchVideo: "./src/client/js/watch-video.js",
        createVideo: "./src/client/js/create-video.js",
        masthead: "./src/client/js/masthead.js",
        userJoin: "./src/client/js/user-join.js",
        userLogin: "./src/client/js/user-login.js",
        appDrawer: "./src/client/js/appDrawer.js",
        home: "./src/client/js/home.js"
    },
    mode: "development",
    target: "web",
    watch: true,
    plugins: [new MiniCssExtractPlugin({
        filename: "css/[name].bundle.css",
    })],
    output: {
        clean: true,
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, "assets"),
    },
    resolve: {
        fallback: {
            "fs": false,
            "path": false,
            "zlib": false,
            "stream": false,
            "crypto": false,
            "util": false,
            "buffer": false,
            "https": false,
            "http": false,
            "url": false,
            "vm": false,
            "os": false,
            "querystring": false,
            "module": false,
            "@swc/core": false,
            "worker_threads": false,
            "esbuild": false,
            "uglify-js": false,
            "constants": false,
            "assert": false,
            "child_process": false,
            "inspector": false,
        },
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
                },
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
                ],
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
        ],
    },
}