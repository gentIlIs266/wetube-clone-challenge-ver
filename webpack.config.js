var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var root = path.resolve(__dirname, "src", "client", "js") + "/";
module.exports = {
    entry: {
        channel: root + "channel.js",
        myStudio: root + "my-studio.js",
        videoEdit: root + "video-edit.js",
        watchVideo: root + "watch-video.js",
        createVideo: root + "create-video.js",
        masthead: root + "masthead.js",
        userJoin: root + "user-join.js",
        userLogin: root + "user-login.js",
        appDrawer: root + "appDrawer.js",
        home: root + "home.js"
    },
    mode: "development",
    target: "web",
    watch: true,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/bundled.[name].css",
        }),
    ],
    output: {
        clean: true,
        filename: "js/bundled.[name].js",
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
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource",
                generator: {
                    filename: "[name][ext]",
                    outputPath: "fonts/",
                    publicPath: "assets/fonts/",
                },
            },
        ],
    },
    /*
    resolve: {
        fallback: {
            "fs": false,
            "path": false,
            "stream": false,
            "zlib": false,
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
    */
}