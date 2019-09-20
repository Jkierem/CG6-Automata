const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const fromRoot = (...dirs) => path.resolve(__dirname,...dirs);

const OUTPUT_PATH = fromRoot('build');
const ENTRY_POINT = fromRoot('src/index.js');
const HTML_TEMPLATE_PATH = fromRoot("public/index.html");
const PUBLIC_FOLDER = fromRoot('public')
const SRC_FOLDER = fromRoot("src")
const BUNDLE_NAME = 'bundle.js'

module.exports = {
    entry: ENTRY_POINT,
    output: {
        path: OUTPUT_PATH,
        filename: BUNDLE_NAME
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: HTML_TEMPLATE_PATH,
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            src: SRC_FOLDER
        }
    },
    devServer: {
        contentBase: PUBLIC_FOLDER,
        port: 8000,
        stats: "minimal",
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
