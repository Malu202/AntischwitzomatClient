const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const { DefinePlugin } = require("webpack");

const path = require('path');

module.exports = (env, argv) => {
    const production = argv.mode == "production";
    const isGithubPages = env && env.githubpages;

    const environment = isGithubPages ? "'gh-pages'" : "'local'";

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
                },
                {
                    test: /favicons(\\|\/).+\.(svg|png|ico|xml|json)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'favicons/[name].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.(webmanifest)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                            },
                        },
                    ],
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
                publicPath: base
            }),
            new DefinePlugin({
                __ENVIRONMENT: environment,
                __BASEURL: `'${base}'`
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
