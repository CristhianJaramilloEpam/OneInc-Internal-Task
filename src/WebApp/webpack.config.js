const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";
const stylesHandler = MiniCssExtractPlugin.loader;

const Dotenv = require('dotenv-webpack');

module.exports = () => {
  return {
    entry: "./src/index.tsx",
    output: {
      filename: "[name].js",
      chunkFilename: "[contenthash]/[name].js",
      path: path.resolve(__dirname, "dist"),
    },
    mode: isProduction ? "production" : "development",
    devServer: {
      open: true,
      host: "localhost",
      https: false,
      port: 7080,
      devMiddleware: {},
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }

        // Add body parser middleware to parse JSON request bodies
        devServer.app.use(require("express").json());

        return middlewares;
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
        filename: "index.html",
        inject: "body",
      }),
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[contenthash]/[name].css",
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/i,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [stylesHandler, "css-loader"],
        },
        {
          test: /\.less$/i,
          use: [stylesHandler, "css-loader", "less-loader"],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: "asset",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    },
  };
};
