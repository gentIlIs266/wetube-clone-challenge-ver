const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("url");

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
    },
    resolve: {
        fallback: {
            "zlib": false,
            "querystring": false,
            "path": false,
            "crypto": false,
            "stream": false,
            "http": false,
            "url": false,
            "buffer": false,
            "util": false,
            /*
            "zlib": require.resolve("browserify-zlib"),
            "querystring": require.resolve("querystring-es3"),
            "path": require.resolve("path-browserify")
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "http": require.resolve("stream-http"),
            "url": require.resolve("url/"),
            "buffer": require.resolve("buffer/"),
            "util": require.resolve("util/"),
            */
        }
    }
}