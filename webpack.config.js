const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const path = require('path');

module.exports = (env, argv) => {
    const production = argv.mode == "production";
    const isGithubPages = env && env.githubpages;

    const base = isGithubPages ? "/AntischwitzomatClient/" : "/";
    return {
        entry: {
            main: './src/main.js'
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: "css-loader", options: {} },
                        { loader: "postcss-loader", options: {} },
                        {
                            loader: "sass-loader", options: {
                                implementation: require('sass'), sassOptions: {
                                    includePaths: ["node_modules"],
                                },
                            }
                        }
                    ]
                }
            ],
        },
        resolve: {
            extensions: ['.js'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[contenthash].bundle.js',
            publicPath: base
        },
        plugins: [
            new HtmlWebpackPlugin({
                base: base, title: "Antischwitzomat",
                template: 'src/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css',
            }),
            new CleanWebpackPlugin(),
            new ServiceWorkerWebpackPlugin({
                entry: path.join(__dirname, 'src/worker.js'),
            })
        ],
        mode: "development",
        devServer: {
            compress: true,
            port: 9000,
            historyApiFallback: {
                index: "/"
            }
        }
    };
}