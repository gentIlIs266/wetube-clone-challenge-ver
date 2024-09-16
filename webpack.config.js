const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: "./src/client/js/index.js",
        createVideo: "./src/client/js/createVideo.js",
        masthead: "./src/client/js/masthead.js",
        user: "./src/client/js/user.js",
        userJoin: "./src/client/scss/components/user-join.scss",
        userLogin: "./src/client/scss/components/user-login.scss",
        createVideo: "./src/client/scss/components/create-video.scss",
    },
    mode: "development",
    watch: true,
    plugins: [new MiniCssExtractPlugin({
        filename: "css/[name].css",
    })],
    output: {
        clean: true,
        filename: "js/[name].js",
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