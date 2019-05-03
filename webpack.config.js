const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

console.log("== mode: ", process.env.NODE_ENV);

const config = {
  entry: "./src/js/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),

    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: "[name].[contenthash].js",

    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: "[name].[contenthash].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      { test: /\.[tj]sx?$/, loader: "babel-loader" },
      { test: /\.s?css$/, use: ["style-loader", "css-loader", "sass-loader"] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./templates/index.html")
    })
  ]
};

const devConfig = {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    port: 8080,
    host: "0.0.0.0",
    disableHostCheck: true
  }
};

const prodConfig = {
  plugins: (function() {
    const plugins = [new CleanWebpackPlugin()];

    if (process.env.NODE_ENV === "analyzer") {
      plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
  })()
};

module.exports = () =>
  merge(
    config,
    process.env.NODE_ENV === "development" ? devConfig : prodConfig
  );
