import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";
import CopyPlugin from 'copy-webpack-plugin';
import { InjectManifest } from "workbox-webpack-plugin";
import { readFileSync } from "fs";
import { resolve as _resolve } from 'path';
import * as sass from "sass";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const {DefinePlugin} = webpack;
const MiniCssExtractPluginLoader = MiniCssExtractPlugin.loader;


const allowedChars = /[^a-zA-Z0-9/-]/g;
function getRevision() {
    const rev = readFileSync('.git/HEAD').toString();
    if (rev.indexOf(':') === -1) {
        return rev;
    } else {
        return readFileSync('.git/' + rev.substring(5).replace(allowedChars, "")).toString()
            .replace(allowedChars, "");
    }
}

export default (env, argv) => {
    const production = argv.mode == "production";
    const environment = (env ? env.environment : null) || "local";

    const base = {
        "gh-pages": "/AntischwitzomatClient/",
        "local": "/"
    }[environment];

    const cacheName = production ? getRevision() : "development";

    let scssRules = [
        { loader: "postcss-loader", options: {} },
        {
            loader: "sass-loader", options: {
                implementation: sass,
                sassOptions: {
                    includePaths: ["node_modules"],
                },
            }
        }
    ];

    let cssLoader = production ? MiniCssExtractPluginLoader : "style-loader";

    return {
        target: production ? "browserslist" : "web",
        entry: {
            index: './src/main.js'
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: /index\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                },
                {
                    test: /\.s[ac]ss$/i,
                    oneOf: [
                        {
                            assert: {
                                type: "css"
                            },
                            rules: [
                                {
                                    loader: "css-loader",
                                    options: {
                                        exportType: "string",
                                    }
                                },
                                ...scssRules
                            ]
                        }, {
                            use: [
                                cssLoader,
                                {
                                    loader: "css-loader", options: {

                                    }
                                },
                                ...scssRules
                            ]
                        }
                    ]
                },
                {
                    test: /\.m?js/,
                    resolve: {
                      fullySpecified: false
                    }
                  }
            ],
        },
        resolve: {
            extensions: ['.js']
        },
        output: {
            path: _resolve(__dirname, 'dist'),
            filename: '[contenthash].bundle.js',
            publicPath: base,
            globalObject: "self"
        },
        plugins: [
            new HtmlWebpackPlugin({
                base: base,
                title: "Antischwitzomat",
                template: 'src/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            }),
            new CleanWebpackPlugin(),
            
            new CopyPlugin({
                patterns: [
                    { from: './favicons', to: 'favicons' },
                    { from: './site.webmanifest', to: './' },
                ],
            }),
            new InjectManifest({
                swSrc: "./src/worker.js"
            }),
            new DefinePlugin({
                __ENVIRONMENT: `"${environment}"`,
                __CACHENAME: `"${cacheName}"`,
                __BASEURL: `'${base}'`
            }),
        ],
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
        mode: "development",
        devServer: {
            compress: true,
            port: 9000,
            historyApiFallback: {
                index: "/"
            },
            client: {
                overlay: {
                    warnings: false,
                    errors: true
                }
            }
        }
    };
}
