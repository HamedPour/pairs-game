const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  output: {
    path: __dirname + "/docs/",
    filename: "./js/main.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      server: { baseDir: ["docs"] },
      files: ["./docs/*"],
      notify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      favicon: "favicon.ico",
      template: "src/index.html",
    }),
  ],
  watch: true,
  devtool: "source-map",
};
